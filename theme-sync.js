/**
 * Theme Sync - Shared across all pages
 * Reads theme from kanaTrainer_v9 localStorage and applies it immediately
 */
(function() {
    'use strict';
    
    const STATE_KEY = 'kanaTrainer_v9';
    
    // Apply theme immediately (before DOM loads to prevent flash)
    function applyTheme() {
        try {
            const raw = localStorage.getItem(STATE_KEY);
            if (raw) {
                const state = JSON.parse(raw);
                const theme = state.theme || 'pastel';
                document.documentElement.setAttribute('data-theme', theme);
                
                // Update meta theme-color
                const metaTheme = document.querySelector('meta[name="theme-color"]');
                if (metaTheme) {
                    metaTheme.setAttribute('content', theme === 'hc' ? '#0f1626' : '#ffffff');
                }
            }
        } catch (e) {
            console.warn('Theme sync: Could not load theme from localStorage', e);
        }
    }
    
    // Apply lite mode
    function applyLiteMode() {
        try {
            const raw = localStorage.getItem(STATE_KEY);
            if (raw) {
                const state = JSON.parse(raw);
                if (state.lite) {
                    document.documentElement.setAttribute('data-lite', '1');
                } else {
                    document.documentElement.removeAttribute('data-lite');
                }
            }
        } catch (e) {
            console.warn('Theme sync: Could not load lite mode from localStorage', e);
        }
    }
    
    // Run immediately
    applyTheme();
    
    // Also run when DOM is ready (in case meta tag wasn't there yet)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            applyTheme();
            applyLiteMode();
        });
    } else {
        applyLiteMode();
    }
    
    // Listen for storage changes from other tabs
    window.addEventListener('storage', (e) => {
        if (e.key === STATE_KEY) {
            applyTheme();
            applyLiteMode();
        }
    });
})();
