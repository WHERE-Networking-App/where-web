'use client';

import { useEffect, useState } from "react";

export default function SplashScreen() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFadeOut(true), 2200)
        const hideTimer = setTimeout(() => setVisible(false), 2500)

        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(hideTimer)
        }
    }, []);

    if(!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <img src="/logo.png" alt="Logo" width={100} height={100} className="mb-6 animate-pulse" />
            <div className="relative animate-pulse">
                <span className="text-5xl font-black text-black dark:text-white tracking-tighter ">
                    WHERE
                </span>
                <span className="absolute -right-6 -top-1 rounded bg-black px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-black">
                    AI
                </span>
            </div>
        </div>
    );
}
