"use client";

import React from 'react';
import SupportCenter from '@/components/supportcenter'; // Ensure correct import path
import styles from '@/styles/BackgroundAnimation.module.css';
import FallingLetters from '@/components/fallingletters'; // Import your falling letters component

const HelpPage: React.FC = () => {
    return (
        <div className={styles.animatedBackground}>
            {/* <FallingLetters /> */}
            <SupportCenter />
        </div>
    );
};

export default HelpPage;
