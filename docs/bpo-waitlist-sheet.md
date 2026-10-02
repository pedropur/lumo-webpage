# Lumo BPO waitlist: Google Sheet storage

Signups from the `/bpo` form are appended as rows to the Google Sheet
[Lumo BPO - Lista de espera](https://docs.google.com/spreadsheets/d/16m0ip4E1Eleg85EO7a0R0YJGVtBOehzpELljUNo6168/edit)
(id `16m0ip4E1Eleg85EO7a0R0YJGVtBOehzpELljUNo6168`) through a Google Apps Script web app. No server and no API credentials are involved: the
site POSTs to the web app URL, and the script (running as the sheet owner) writes the row.

Until `PUBLIC_BPO_WAITLIST_ENDPOINT` is set, the form falls back to EmailJS, so no signup is lost.
The fallback is also used if the sheet request fails.

## Columns

`submitted_at`, `from_name`, `from_email`, `whatsapp`, `company`, `volume`, `message`

These match the headers already in row 1 of the sheet's first tab. The script never edits row 1; it appends
each signup to the first empty row below. Cells are written as plain text (so `+5511...` stays a phone number
and nothing is treated as a formula).

## Setup (one time, about 5 minutes)

1. Sign in to the Google account that owns the sheet and open it:
   https://docs.google.com/spreadsheets/d/16m0ip4E1Eleg85EO7a0R0YJGVtBOehzpELljUNo6168/edit
2. In the sheet menu, open **Extensões > Apps Script** (English UI: **Extensions > Apps Script**).
3. Delete the default `myFunction` code and paste the script below. Save (Ctrl/Cmd+S).
4. Click **Deploy > New deployment** (pt-BR: **Implantar > Nova implantação**). Click the gear icon next to "Select type" and choose **Web app**.
   - Description: `Lumo BPO waitlist`
   - **Execute as: Me**
   - **Who has access: Anyone**
5. Click **Deploy** and authorize when asked (choose your account; if Google shows
   "Google hasn't verified this app", click **Advanced > Go to ... (unsafe)**, which is expected for your own script).
6. Copy the **Web app URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).
7. Check it works: open the URL in a browser. You should see `{"ok":true,"service":"lumo-bpo-waitlist"}`.
8. In Vercel, open the `lumo-webpage` project > **Settings > Environment Variables** and add:
   - Name: `PUBLIC_BPO_WAITLIST_ENDPOINT`
   - Value: the Web app URL
   - Environments: Production (and Preview if you want to test there)
9. **Redeploy** (Deployments > latest > Redeploy). The variable is read at build time, so the
   page only uses the sheet after a new build.
10. Submit a test signup on `/bpo`. A new row appears under the headers in the sheet's first tab.
    Delete the test row afterwards.

### Changing the script later

Editing the script does not change the live web app. After a change use
**Deploy > Manage deployments > pencil icon > Version: New version > Deploy**.
The URL stays the same.

### Security notes

- The web app URL is public (it ships in the page's JavaScript). Anyone who finds it can append rows,
  but cannot read the sheet. The script validates required fields and truncates long values.
- Do not share the sheet publicly. It contains personal data (LGPD).

## Script

```javascript
const SPREADSHEET_ID = '16m0ip4E1Eleg85EO7a0R0YJGVtBOehzpELljUNo6168';
const COLUMNS = ['submitted_at', 'from_name', 'from_email', 'whatsapp', 'company', 'volume', 'message'];
const REQUIRED = ['from_name', 'from_email', 'whatsapp', 'company', 'volume'];
const MAX_LENGTH = 2000;

function doGet() {
  return jsonResponse({ ok: true, service: 'lumo-bpo-waitlist' });
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '');
  } catch (err) {
    return jsonResponse({ ok: false, error: 'invalid_json' });
  }

  const row = COLUMNS.map((key) => String((data && data[key]) == null ? '' : data[key]).trim().slice(0, MAX_LENGTH));
  if (!row[0]) row[0] = new Date().toISOString();

  const missing = REQUIRED.filter((key) => !row[COLUMNS.indexOf(key)]);
  if (missing.length) {
    return jsonResponse({ ok: false, error: 'missing_fields: ' + missing.join(',') });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, COLUMNS.length).setNumberFormat('@').setValues([COLUMNS]);
    }
    const target = sheet.getRange(sheet.getLastRow() + 1, 1, 1, COLUMNS.length);
    target.setNumberFormat('@');
    target.setValues([row]);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
  return jsonResponse({ ok: true });
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
```

## How the site talks to it

`src/components/bpo/WaitlistCta.astro` POSTs a JSON body (sent as `text/plain` to avoid a CORS preflight,
which Apps Script does not answer) and expects `{"ok":true}` back. The endpoint comes from
`PUBLIC_BPO_WAITLIST_ENDPOINT` via `src/config/bpo.ts`. If the response is missing, not `ok`, or slower than 12 s,
the signup is sent through EmailJS instead (a rare double record is possible, never a lost one).
