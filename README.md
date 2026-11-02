# Architrexx — company marketing website

A simple, responsive company website based on your supplied black-and-blue Canva layout. Built with plain **HTML, CSS and JavaScript**, with no framework, installation, account or build step needed. All images are included; the website works offline.

## Run it in VS Code

1. Extract `architrexx-website.zip`.
2. Open VS Code → **File → Open Folder** → select `architrexx-website`.
3. Open `index.html` in a current web browser. You can double-click it from your file manager.
4. For automatic refresh as you save, use **Open with Live Server** if you already have the Live Server extension in VS Code.

Alternatively, if Python is installed, run this command from the project folder:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`. Stop the server with Ctrl+C.

## Project files

```text
architrexx-website/
  index.html       Content, sections, team names, FAQs, and enquiry form
  styles.css       Black-and-blue theme and desktop/mobile layouts
  script.js        Mobile menu, service selector, FAQs, enquiry drafts
  assets/
    hero-building.jpg
    studio-process.jpg
    building-facade.jpg
    drafting.jpg
  README.md        Setup and editing guide
```

## Sections and interactions

- **Home:** welcome message and a short studio introduction.
- **Services:** three clickable service buttons update the description and image.
- **Our Team:** the four names from your layout, using initials rather than presenting the layout's stock portraits as your actual team.
- **FAQs:** click or use Enter/Space on a question to open it. Only one question stays open at a time.
- **Contact:** required-field/email validation and a local enquiry preview. Visitors can copy or download their enquiry as a text file.
- The menu collapses on smaller screens. Navigation links scroll to each section.

## Contact form — what it actually does

**This website does not send messages and has no backend.** The form prepares an enquiry draft inside the page. It displays an explicit draft-only notice and does not claim that a message has been sent. Form contents are not stored in a database or local storage. Copy and download work after the visitor prepares a draft.

If you have a confirmed company email address, set this line near the top of `script.js`:

```js
const STUDIO_EMAIL = 'your-confirmed-address@example.com';
```

An **Open email app** link will then appear after a draft is prepared. It opens a prefilled email in the visitor's email app, where the visitor must review and send it. It still does not submit messages automatically. For very long messages, copying the draft into an email may be more reliable than a mailto link. Automatic delivery would require a separate form service or backend.

## Replace the draft content

This version treats Architrexx as an **academic company concept**, as indicated in the footer. Review all draft copy, names, titles, and services before publishing it as a real company website.

- `index.html`: edit the studio description, hero text, team names, FAQ questions/answers and footer.
- `script.js`: edit `serviceContent` to change the three service descriptions and images. If you change a service key, also change its matching `data-service` value in `index.html`. Update the initial service text in `index.html` too so it matches the default selected service.
- `styles.css`: change the colours at the top. `--blue` controls the bright blue, and `--black` controls the background.
- `assets/`: replace images with your own photos or renders. Update the corresponding `src`, `alt`, `image` and `alt` text in the HTML/JavaScript if filenames or subjects change.
- To add team portraits, replace a `.team-monogram` span inside `.team-portrait` with an image, such as `<img src="assets/bayron.jpg" alt="Portrait of [confirmed name]">`. Add `.team-portrait img { width: 100%; height: 100%; object-fit: cover; }` to your CSS.

### How the reference was used

The company name, navigation labels and team names come from your supplied PDF. This version keeps its black-and-blue direction, gradients, glass-style panels, rounded images, large headings, and prominent calls to action.

The PDF still contains digital-marketing template language, sample customer testimonials, placeholder contact information, and repeated sections. The website uses **proposed architecture-focused wording**, removes repeated blocks, omits unverified testimonials/contact details, and provides actual FAQ interactions. Confirm that the proposed services match your intended company.

The photographs were extracted from the supplied PDF and are used as illustrative visual references. They are not labelled as completed Architrexx projects. Confirm your permission to use these assets before public/commercial publication.

## Explain this project in class

- **HTML** structures the company sections, navigation, images and enquiry form.
- **CSS** applies the theme, gradients, spacing and responsive layouts. Media queries switch the layout for phones.
- **JavaScript** handles button clicks, changes the selected service, opens the mobile menu, manages FAQs, and builds the local enquiry preview.
- **Accessibility:** semantic headings, associated form labels, visible keyboard focus, keyboard-operable buttons/FAQ controls, descriptive image text and reduced-motion support.

## Quick check before submission

Open the site at desktop and phone widths. Test the menu, all three service buttons, each FAQ, invalid/valid form entries, and draft download. Check the spelling of your company and team names and replace academic wording if your instructor requires something different.

The ZIP is source code for your local VS Code project. It has not been published to a public website.
