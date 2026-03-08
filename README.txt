# Karnesh Portfolio - Documentation

## Files Location
```
/home/karnesh/karnesh_portfolio/
├── index.html     # Public portfolio
├── admin.html     # Admin panel
└── script.js      # JavaScript
```

## How to Open

**Public Portfolio:**
```bash
xdg-open /home/karnesh/karnesh_portfolio/index.html
```

**Admin Panel:**
```bash
xdg-open /home/karnesh/karnesh_portfolio/admin.html
```

## Login Details
- **Password:** `admin123`
- **Change Password:** Admin Panel → Settings → Change Password

## Features

### Public Portfolio (index.html)
- Live GitHub stats (repos, followers, contributions graph)
- LeetCode stats with charts
- Profile section with college info
- Skills by category
- Projects showcase
- Life updates section

### Admin Panel (admin.html)
- **Dashboard** - Overview stats
- **Profile** - Edit name, tagline, college, social links
- **Skills** - Add/remove skills by category
- **Projects** - Add/edit/delete projects
- **Updates** - Add life updates
- **Daily Planner** - Tasks & schedule
- **Settings** - Change password, export/import data

## Your Links (Updated)
- **GitHub:** https://github.com/karnesh19zexx
- **LinkedIn:** https://www.linkedin.com/in/karnesh-kumar-s-4abb6430b/
- **LeetCode:** https://leetcode.com/u/KarneshKumar/

## Data Storage
- Data is stored in browser's **LocalStorage**
- Export/Import available in Admin → Settings
- Clear browser data = lose all changes

## Known Issues
- GitHub/LeetCode APIs may have CORS issues when opened as file://
- Use a local server for best results: `npx serve /home/karnesh/karnesh_portfolio`

## To Deploy Online
1. Upload files to GitHub Pages or any web hosting
2. Or use Vercel/Netlify (free)
