/**
 * Global Portfolio Configuration
 * 
 * IMPORTANT FOR MULTI-DEVICE SYNC:
 * Set `gistId` below to your GitHub Gist ID so that ALL visitors and other devices
 * automatically load your live portfolio updates!
 */
const PORTFOLIO_CONFIG = {
    // Paste your GitHub Gist ID here (e.g. 'e5a359875c03455d4176c87007d94a4b')
    gistId: 'e5a359875c03455d4176c87007d94a4b',

    // The primary JSON filename stored in the Gist
    filename: 'portfolio-data.json',

    // Default GitHub and LeetCode usernames
    githubUsername: 'karnesh19zexx',
    leetcodeUsername: 'KarneshKumar',

    // Auto-refresh interval for stats (in milliseconds)
    refreshInterval: 60000
};

// Check if an override exists in localStorage (e.g. set in Admin panel on this browser)
try {
    if (typeof window !== 'undefined' && window.localStorage) {
        const savedGistId = localStorage.getItem('gistId');
        if (savedGistId && savedGistId.trim() !== '') {
            PORTFOLIO_CONFIG.gistId = savedGistId.trim();
        }
    }
} catch (e) {
    console.warn('Config localStorage read warning:', e);
}
