import React from 'react';
import { motion } from 'framer-motion';

export const FadeIn = ({
    children,
    delay = 0,
    duration = 0.6,
    className = "",
    direction = "up"
}) => {
    const directions = {
        up: { y: 24 },
        down: { y: -24 },
        left: { x: 24 },
        right: { x: -24 },
        none: {}
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration, 
                delay, 
                ease: [0.4, 0, 0.2, 1] // Smooth cubic bezier
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
