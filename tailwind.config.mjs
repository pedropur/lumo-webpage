/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                lumo: {
                    brand: '#FFC82C', // Primary brand color from logo
                    navy: '#0A0F1C', // Deep navy / near-black
                    'navy-light': '#1A1F2E',
                    dark: '#000000',
                    'dark-surface': '#0A0A0A',
                    'dark-elevated': '#141414',
                    gray: {
                        50: '#FAFAFA',
                        100: '#F5F5F5',
                        200: '#E5E5E5',
                        300: '#D4D4D4',
                        400: '#A3A3A3',
                        500: '#737373',
                        600: '#525252',
                        700: '#404040',
                        800: '#262626',
                        900: '#171717',
                        950: '#0A0A0A',
                    },
                    text: {
                        primary: '#FFFFFF',
                        secondary: '#A3A3A3',
                        muted: '#737373',
                    }
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            spacing: {
                'section': '6rem',
                'section-md': '8rem',
                'section-lg': '10rem',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            boxShadow: {
                'glow-sm': '0 0 20px rgba(255, 200, 44, 0.1)',
                'glow': '0 0 40px rgba(255, 200, 44, 0.15)',
                'glow-lg': '0 0 60px rgba(255, 200, 44, 0.2)',
            },
        },
    },
    plugins: [],
}
