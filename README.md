# Shiv Patel Portfolio

A static personal portfolio for Shiv Patel, a Rutgers Computer Science and Data Science student building full-stack applications, machine-learning systems, and AI-powered products.

## Features

- One-page responsive portfolio with Home, About, Experience, Projects, Skills, Education, and Contact sections
- Sticky translucent navigation with accessible mobile menu
- Active section highlighting, smooth scrolling, and reduced-motion support
- Custom dark futuristic visual system using CSS gradients, glass panels, dashboard graphics, and lightweight SVG assets
- Direct contact links instead of a placeholder form
- SEO title, meta description, Open Graph metadata, and SVG favicon

## Technology Stack

- HTML5
- Modern vanilla CSS
- Vanilla JavaScript
- Static assets only; no build step, package manager, backend, or framework required

## Run Locally

Open `index.html` directly in a browser.

You can also serve the folder with any static server, for example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy With GitHub Pages

1. Push this repository to GitHub.
2. In the repository settings, open **Pages**.
3. Choose the branch that contains `index.html`.
4. Set the site source to the repository root.
5. Save and wait for GitHub Pages to publish the static site.

## Update Personal Links

The social, resume, and project links are centralized in `assets/js/main.js`.

- Replace `SITE_LINKS.github` with Shiv's verified GitHub URL.
- Replace `SITE_LINKS.linkedin` with Shiv's verified LinkedIn URL.
- Place the resume PDF at `assets/Shiv-Patel-Resume.pdf`, or update `SITE_LINKS.resume` to a verified resume URL.
- Replace each `PROJECT_LINKS` entry with the matching project repository URL.
- Add live demo buttons in `index.html` only when a legitimate deployed URL exists.

## Directory Structure

```text
.
+-- index.html
+-- assets
|   +-- css
|   |   +-- main.css
|   +-- img
|   |   +-- favicon.svg
|   |   +-- og-card.svg
|   +-- js
|       +-- main.js
+-- LICENSE.txt
+-- README.md
```

## Credits

The original repository used Hyperspace by HTML5 UP under the Creative Commons Attribution 3.0 license. The current visible portfolio has been redesigned with custom HTML, CSS, JavaScript, and SVG assets. No stock photography or external icon libraries are used.

The stylesheet optionally loads the Google Font Inter with a system font fallback.

## License

See `LICENSE.txt` for the original template license retained with the repository. Add a separate project license if you want to define licensing for the redesigned portfolio source.
