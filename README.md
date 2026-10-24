# Tunnel of Unmentionable Desires

A static, phone-friendly GitHub Pages site for the Carnevil LARP Tunnel of Unmentionable Desires.

## Files

- `index.html` - landing page and experience view
- `styles.css` - mobile-first presentation
- `tunnel.js` - stage selection, name matching, and display logic
- `characters.json` - all character-specific text
- `images/` - optional background artwork

## The three QR URLs

After GitHub Pages is enabled, use the same site with three query parameters:

- QR 1: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/?stage=1`
- QR 2: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/?stage=2`
- QR 3: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/?stage=3`

If `stage` is missing or invalid, the site defaults to stage 1.

## Publish on GitHub Pages

1. Create a new GitHub repository, for example `tunnel-of-unmentionable-desires`.
2. Upload everything in this folder to the repository root. Do not upload the containing folder as an extra directory level.
3. Open the repository's **Settings**.
4. Select **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose the `main` branch and `/ (root)` folder, then save.
7. GitHub will provide the public Pages URL after deployment.
8. Test all three stage URLs on a phone before generating the final QR codes.

## Name handling

Names are case-insensitive and surrounding spaces are ignored. Punctuation and spaces are also stripped during matching.

`Button` and `Mitya` both resolve to Button's experience.

Incorrect names receive an in-world error message instead of a technical error.

## Editing character text

Edit `characters.json`. Each character has:

- `displayName`
- `aliases`
- `temptation` for stage 1
- `permission` for stage 2
- `recognition` for stage 3

Keep valid JSON syntax. In particular, preserve commas and quotation marks.

## Optional background artwork

Add a file at:

`images/tunnel-background.webp`

The site still works if this image is absent because the CSS supplies a dark fallback.

## Testing locally

Because the page loads `characters.json` with JavaScript `fetch()`, opening `index.html` directly from a computer's filesystem may be blocked by the browser. The simplest test is to publish it with GitHub Pages. A local web server will also work.
