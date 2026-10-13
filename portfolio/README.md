# Personal Portfolio

A fast, responsive, no-build portfolio (plain HTML, CSS, JavaScript).

## Structure
```
portfolio/
├── index.html        # page content – replace every [bracketed] text
├── css/style.css     # design tokens (top of file), layout, animations
├── js/main.js        # typing text, scroll reveal, counters, theme toggle
├── assets/
    ├── images/       # your photos and project screenshots
    └── resume.pdf    # your resume (download button)
```

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Customize
1. **Content:** edit `index.html` (name, bio, projects, links, email).
2. **Typing roles:** edit the `roles` list in `js/main.js`.
3. **Colors:** change the variables at the top of `css/style.css`.
4. **Counters:** change the numbers in `data-count="..."` in `index.html`.

## Deploy (free)
- **GitHub Pages:** push to a repo, then Settings > Pages > deploy from `main`.
- **Netlify / Vercel:** drag the folder in, or connect the repo.

Animations turn off automatically for visitors who prefer reduced motion.

## Photo and certificates
- Profile photo: save it as `assets/images/profile.jpg` (it shows beside your name in the header).
- Certificates: put the files in `assets/certificates/` using the names in `assets/certificates/README.txt`.
