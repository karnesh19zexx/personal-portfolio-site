// Portfolio Data Management
const DEFAULT_DATA = {
    profile: {
        name: "Karnesh Kumar S",
        tagline: "A passionate developer building amazing digital experiences.",
        college: "Rajalakshmi Institute of Technology, Chennai",
        year: "2nd Year CSE",
        status: "Available for projects",
        github: "karnesh19zexx",
        leetcode: "KarneshKumar",
        email: "karnesh@example.com",
        about: "A passionate computer science student exploring the world of technology and building innovative solutions. Currently focused on web development, competitive programming, and machine learning."
    },
    social: [
        { name: "GitHub", url: "https://github.com/karnesh19zexx", icon: "github" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/karnesh-kumar-s-4abb6430b/", icon: "linkedin" },
        { name: "Twitter", url: "https://x.com/karnesh1919", icon: "twitter" },
        { name: "LeetCode", url: "https://leetcode.com/u/KarneshKumar/", icon: "leetcode" }
    ],
    skills: {
        "Programming Languages": ["Python", "JavaScript", "TypeScript", "Java", "C++", "C"],
        "Frontend": ["React", "Vue.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
        "Backend": ["Node.js", "Express", "Python", "FastAPI", "PostgreSQL", "MongoDB"],
        "Tools & DevOps": ["Git", "Docker", "AWS", "Linux", "VS Code", "Figma"]
    },
    projects: [
        {
            "title": "Ledger Equity",
            "description": "LedgerEquity - Transparent micro-donations for education equity on blockchain. Low-fee platform for donating MATIC directly to verified schools, NGOs, and students.",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            "tags": [
                "blockchain",
                "web3",
                "education",
                "donation",
                "polygon",
                "supabase",
                "react"
            ],
            "demo": "https://ledger-equity-4fxa.vercel.app/",
            "github": "https://github.com/karnesh19zexx/ledger-equity"
        }
    ],
    updates: [
        {
            "date": "2026-02-05",
            "title": "Crypto donation platform - LEDGER EQUITY",
            "content": "LedgerEquity – Transparent Blockchain Micro-Donations for Education Equity\n\nOne-liner:\n\nDirect, low-fee MATIC donations from donor wallets to verified schools, NGOs and students for books, fees, uniforms, devices and more – everything traceable on Polygon.\n\nCore mission & SDG alignment\nSupports SDG 4 (Quality Education) by closing funding gaps in underserved regions through 100% on-chain transparency, near-zero fees and direct wallet-to-wallet transfers.\n\nKey Features:\n\nWallet connection (MetaMask) + Polygon Mumbai testnet\nRecipient need submission form (title, rich-text description via react-quill, amount in MATIC, wallet address, category, region, optional phone/org, multiple file uploads)\nFiles stored on Pinata/IPFS\nData saved to Supabase (pendingNeeds table)\nLight modern UI with clean cards and responsive layout\nBasic donation flow (click Donate → separate page with need info + amount input + tx confirmation)\nReal-time funding progress display (planned full sync via event listener)\n\nTech Stack\n\nFrontend: React 18 + Vite\nAuth & Database: Supabase (Auth + Postgres)\nBlockchain: ethers.js v6 + Polygon Mumbai + custom Solidity contract\nFile storage: Pinata/IPFS\nUI: Custom light CSS (no Tailwind)\nRich text: react-quill"
        },
        {
            "date": "2026-03-07",
            "title": "Portfolio Launch",
            "content": "🚀 Just launched my personal portfolio website! 🎨\n✨ Features:\n- Glassmorphism UI design\n- Live GitHub stats & contribution graph\n- LeetCode problem-solving stats with charts\n- Skills organized by category\n- Projects showcase\n- Life updates section\n- Private admin panel to manage everything\n\n🛠 Tools & Technologies:\n- HTML5\n- CSS3 (Custom properties, animations)\n- JavaScript (Vanilla)\n- Chart.js (for visualizations)\n- LocalStorage (for data persistence)\n- GitHub API & LeetCode API\n📱 Fully responsive for all devices"
        }
    ],
    tasks: [],
    schedule: []
};

// Load data from localStorage ONLY - don't merge with defaults on first load
function loadData() {
    const saved = localStorage.getItem('portfolioData');
    console.log('Raw localStorage:', saved ? 'Found data' : 'No data'); // Debug
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.log('Parse error, using defaults');
            return DEFAULT_DATA;
        }
    }
    console.log('Using default data');
    return DEFAULT_DATA;
}

// GitHub Gist fetch function
async function fetchFromGist() {
    // Check URL parameter first, then localStorage
    const urlParams = new URLSearchParams(window.location.search);
    let gistId = urlParams.get('gist') || localStorage.getItem('gistId');
    
    if (!gistId) {
        // Default Gist ID - embedded for public access
        gistId = 'e5a359875c03455d4176c87007d94a4b';
    }

    // Save Gist ID for future use
    localStorage.setItem('gistId', gistId);

    try {
        const response = await fetch(`https://api.github.com/gists/${gistId}`);
        if (response.ok) {
            const gistData = await response.json();
            const filename = Object.keys(gistData.files)[0];
            const content = gistData.files[filename].content;
            const data = JSON.parse(content);
            console.log('Loaded from Gist!');
            return data;
        }
    } catch (e) {
        console.log('Gist fetch error:', e);
    }
    return null;
}

// Listen for storage changes (sync between tabs)
window.addEventListener('storage', function (e) {
    if (e.key === 'portfolioData') {
        portfolioData = loadData();
        renderProfile();
        renderSkills();
        renderProjects();
        renderUpdates();
    }
});

// Save data to localStorage
function saveData(data) {
    localStorage.setItem('portfolioData', JSON.stringify(data));
    console.log('Data saved:', data); // Debug
}

// Initialize data
let portfolioData = loadData();

// GitHub API Integration
async function fetchGitHubStats(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();

        document.getElementById('github-repos').textContent = data.public_repos || 0;
        document.getElementById('github-followers').textContent = data.followers || 0;
        document.getElementById('github-following').textContent = data.following || 0;

        return data;
    } catch (error) {
        console.error('GitHub API Error:', error);
        document.getElementById('github-repos').textContent = '--';
        document.getElementById('github-followers').textContent = '--';
        document.getElementById('github-following').textContent = '--';
        return null;
    }
}

// Fetch GitHub contributions
async function fetchGitHubContributions(username) {
    try {
        const response = await fetch(`https://github-contributions-api.jogruber.workers.dev/${username}`);
        const data = await response.json();

        const grid = document.getElementById('contributions-grid');
        grid.innerHTML = '';

        data.contributions.forEach(week => {
            const weekDiv = document.createElement('div');
            weekDiv.className = 'contribution-week';

            week.contributionDays.forEach(day => {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'contribution-day';

                if (day.contributionCount > 0) {
                    if (day.contributionCount >= 8) dayDiv.classList.add('level-4');
                    else if (day.contributionCount >= 5) dayDiv.classList.add('level-3');
                    else if (day.contributionCount >= 2) dayDiv.classList.add('level-2');
                    else dayDiv.classList.add('level-1');
                }

                dayDiv.title = `${day.date}: ${day.contributionCount} contributions`;
                weekDiv.appendChild(dayDiv);
            });

            grid.appendChild(weekDiv);
        });

        // Calculate total commits
        const totalCommits = data.contributions.reduce((sum, week) => {
            return sum + week.contributionDays.reduce((s, d) => s + d.contributionCount, 0);
        }, 0);

        document.getElementById('stat-commits').textContent = totalCommits;

    } catch (error) {
        console.error('Contributions API Error:', error);
    }
}

// LeetCode API Integration
async function fetchLeetCodeStats(username) {
    try {
        const response = await fetch(`https://leetcode-api-fork.vercel.app/user/profile/${username}`);
        const data = await response.json();

        if (data.status === 'error') throw new Error('User not found');

        const total = data.totalSolved || 0;
        const easy = data.easySolved || 0;
        const medium = data.mediumSolved || 0;
        const hard = data.hardSolved || 0;

        document.getElementById('leetcode-easy').textContent = easy;
        document.getElementById('leetcode-medium').textContent = medium;
        document.getElementById('leetcode-hard').textContent = hard;
        document.getElementById('leetcode-total').textContent = total;

        // Update chart
        updateLeetCodeChart(easy, medium, hard);

        return data;
    } catch (error) {
        console.error('LeetCode API Error:', error);
        document.getElementById('leetcode-easy').textContent = '--';
        document.getElementById('leetcode-medium').textContent = '--';
        document.getElementById('leetcode-hard').textContent = '--';
        document.getElementById('leetcode-total').textContent = '--';
        return null;
    }
}

// Chart instances
let difficultyChart = null;
let topicChart = null;

function updateLeetCodeChart(easy, medium, hard) {
    const ctx1 = document.getElementById('difficultyChart').getContext('2d');
    const ctx2 = document.getElementById('topicChart').getContext('2d');

    if (difficultyChart) difficultyChart.destroy();
    if (topicChart) topicChart.destroy();

    difficultyChart = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Easy', 'Medium', 'Hard'],
            datasets: [{
                data: [easy, medium, hard],
                backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#fff' }
                }
            }
        }
    });

    // Placeholder for topic chart
    topicChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Arrays', 'Strings', 'DP', 'Graphs', 'Trees'],
            datasets: [{
                label: 'Problems',
                data: [Math.floor(easy * 0.3), Math.floor(medium * 0.25), Math.floor(hard * 0.2), Math.floor(easy * 0.15), Math.floor(medium * 0.1)],
                backgroundColor: ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            }
        }
    });
}

// Render profile
function renderProfile() {
    const p = portfolioData.profile;
    document.getElementById('user-name').textContent = p.name;
    document.getElementById('user-tagline').textContent = p.tagline;
    document.getElementById('user-college').textContent = p.college;
    document.getElementById('user-year').textContent = p.year;
    document.getElementById('status-text').textContent = p.status;
    document.getElementById('about-description').textContent = p.about;

    // Social links - clear first
    const socialContainer = document.getElementById('social-links');
    const footerSocial = document.getElementById('footer-social');
    socialContainer.innerHTML = '';
    footerSocial.innerHTML = '';

    portfolioData.social.forEach(s => {
        const link = createSocialLink(s);
        socialContainer.appendChild(link.cloneNode(true));
        footerSocial.appendChild(link);
    });
}

// Create social link element
function createSocialLink(social) {
    const a = document.createElement('a');
    a.href = social.url;
    a.className = 'social-link';
    a.target = '_blank';
    a.setAttribute('aria-label', social.name);
    a.innerHTML = getSocialIcon(social.icon);
    return a;
}

function getSocialIcon(name) {
    const icons = {
        github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        linkedin: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
        twitter: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
        leetcode: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 2.096a1.98 1.98 0 00-2.144.001l-9.2 5.6a1.98 1.98 0 00.001 2.943l3.092 1.883a1.98 1.98 0 002.144.001l9.2-5.6a1.98 1.98 0 00-.001-2.943l-3.092-1.884zm-8.892 8.66l-2.63-1.6a.66.66 0 010-1.145l9.2-5.6a.66.66 0 011.145 0l2.63 1.6a.66.66 0 010 1.145l-9.2 5.6a.66.66 0 01-1.145 0zm14.313 2.337l-2.756 1.68a.66.66 0 01-1.145 0L4.996 8.253a.66.66 0 010-1.145l2.756-1.68a.66.66 0 011.145 0l9.2 5.6a.66.66 0 010 1.145l-9.2 5.6a.66.66 0 01-1.145 0z"/></svg>'
    };
    return icons[name] || '';
}

// Render skills
function renderSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';

    Object.entries(portfolioData.skills).forEach(([category, skills]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';

        const icon = getCategoryIcon(category);
        categoryDiv.innerHTML = `
            <h3>${icon} ${category}</h3>
            <div class="skill-list">
                ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;

        container.appendChild(categoryDiv);
    });
}

function getCategoryIcon(category) {
    const icons = {
        "Programming Languages": '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
        "Frontend": '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
        "Backend": '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 17l6-6-6-6M12 19h8"/></svg>',
        "Tools & DevOps": '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
    };
    return icons[category] || '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/></svg>';
}

// Render projects
function renderProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';

    if (portfolioData.projects.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">No projects added yet. Add some in the admin panel!</p>';
        return;
    }

    portfolioData.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const initial = project.title ? project.title.charAt(0).toUpperCase() : 'P';

        card.innerHTML = `
            <div class="project-image">
                ${project.image ? `<img src="${project.image}" alt="${project.title}">` : `<span class="project-image-placeholder">${initial}</span>`}
            </div>
            <div class="project-content">
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-links">
                    ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg> Demo</a>` : ''}
                    ${project.github ? `<a href="${project.github}" class="project-link" target="_blank"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> Code</a>` : ''}
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    document.getElementById('stat-projects').textContent = portfolioData.projects.length;
}

// Render updates
function renderUpdates() {
    const container = document.getElementById('updates-container');
    container.innerHTML = '';

    if (portfolioData.updates.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">No updates yet. Add some in the admin panel!</p>';
        return;
    }

    portfolioData.updates.forEach(update => {
        const card = document.createElement('div');
        card.className = 'update-card';

        card.innerHTML = `
            <div class="update-date">${update.date}</div>
            <h3 class="update-title">${update.title}</h3>
            <p class="update-content">${update.content}</p>
        `;

        container.appendChild(card);
    });
}

// Cursor effect
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.querySelectorAll('a, button, .project-card, .skill-tag, .update-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Initialize
async function init() {
    // Try to fetch from Gist first, then localStorage, then defaults
    const gistData = await fetchFromGist();
    if (gistData) {
        portfolioData = gistData;
        localStorage.setItem('portfolioData', JSON.stringify(gistData));
    } else {
        portfolioData = loadData();
    }
    console.log('Loaded data:', portfolioData.projects);

    if (!document.getElementById('user-name')) return;

    renderProfile();
    renderSkills();
    renderProjects();
    renderUpdates();

    // Auto-refresh every 30 seconds
    setInterval(async () => {
        const newGistData = await fetchFromGist();
        if (newGistData && JSON.stringify(newGistData.projects) !== JSON.stringify(portfolioData.projects)) {
            console.log('Gist data changed, reloading...');
            portfolioData = newGistData;
            localStorage.setItem('portfolioData', JSON.stringify(newGistData));
            renderProfile();
            renderSkills();
            renderProjects();
            renderUpdates();
        }
    }, 30000);

    const githubUsername = portfolioData.profile.github || 'karnesh';
    await fetchGitHubStats(githubUsername);
    await fetchGitHubContributions(githubUsername);

    // Fetch LeetCode stats
    const leetcodeUsername = portfolioData.profile.leetcode || 'karnesh';
    await fetchLeetCodeStats(leetcodeUsername);

    // Update repo count
    const reposEl = document.getElementById('github-repos');
    if (reposEl.textContent !== '--') {
        document.getElementById('stat-repos').textContent = reposEl.textContent;
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', init);

// Expose data for admin panel
window.portfolioData = portfolioData;
window.savePortfolioData = saveData;
window.reloadPortfolio = () => {
    portfolioData = loadData();
    init();
};
