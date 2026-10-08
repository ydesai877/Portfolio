# Yash Desai — Portfolio

A personal finance portfolio built with React and Vite. It has five pages: About Me, Resume, Projects, Blogs, and Contact.

Live site (after setup): `https://ydesai877.github.io/Portfolio/`

## Publish to GitHub Pages

1. Copy these files into your `Portfolio` repository. Replace the old files with the same names.
2. Keep your photo at `public/profile.jpg`. If the file is missing, the site shows your initials.
3. Commit and push to the `main` branch.
4. On GitHub, open the repository. Go to **Settings → Pages**.
5. Under **Build and deployment → Source**, select **GitHub Actions**.
6. Open the **Actions** tab. Wait until the "Deploy to GitHub Pages" run shows a green check (about 1 minute).
7. Open `https://ydesai877.github.io/Portfolio/`.

Each push to `main` publishes the site again.

> If you rename the repository, change `base` in `vite.config.js` to the new name, for example `base: '/new-name/'`.

## Edit the content

All text is in the `DEFAULT_DATA` object at the top of `src/App.jsx`.

- **About Me:** edit `about.lead`, `about.paragraphs`, and `about.focus`.
- **Resume:** edit `experience`, `education`, `skills`, and `certificates`.
- **Resume PDF:** replace `public/resume.pdf` with the new file. Keep the same name.
- **Projects:** add an item to `projects`. To show a "View project" button, set `link` to a URL.
- **Blogs:** to publish a post, set `status: ''` and set `link` to the post URL (for example, a LinkedIn article).

## Contact form

The form sends messages through Web3Forms (web3forms.com). Web3Forms emails each message to `yashdesai201@gmail.com`. No email app opens for the visitor.

- The access key is `web3formsKey` in `src/App.jsx`. It is safe to publish.
- To change the email address that receives messages, create a new key at web3forms.com and replace `web3formsKey`.
- A hidden `botcheck` field blocks simple spam bots.

## Run on your computer

```bash
npm install
npm run dev
```

Open the URL that Vite shows (usually `http://localhost:5173/Portfolio/`).

## Structure

Page addresses:

- About Me: `/Portfolio/`
- Resume: `/Portfolio/resume/`
- Projects: `/Portfolio/projects/`
- Blogs: `/Portfolio/blogs/`
- Contact: `/Portfolio/contact/`

```
.github/workflows/deploy.yml   Builds and publishes the site to GitHub Pages
public/profile.jpg             Your photo (keep your existing file)
public/resume.pdf              Resume for the download buttons
src/App.jsx                    Site content (DEFAULT_DATA) and page layouts
src/styles.css                 Colors, fonts, and layout
src/main.jsx                   React entry point
index.html                     About Me page (fonts and meta tags)
resume/index.html              Resume page
projects/index.html            Projects page
blogs/index.html               Blogs page
contact/index.html             Contact page
vite.config.js                 Vite settings: base path and the list of pages
```
