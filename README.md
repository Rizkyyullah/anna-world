# A Little World of Anna

A personal scrapbook-style website built to celebrate memories, document personal dreams, and collect thoughtful words in one place.

The project combines a soft, feminine visual direction with a vintage scrapbook aesthetic. Its content is presented through photo cards, handwritten-style typography, paper-inspired sections, and a lightweight music player.

![A Little World of Anna preview](photos/og.jpg)

## Overview

**A Little World of Anna** is a responsive, static website designed as a small personal space. Visitors can explore Anna's profile, browse memories, read her dreams and goals, discover encouraging quotes, and open letters written to her future self.

The site is built with plain HTML, CSS, and JavaScript. It does not require a framework, package manager, build process, or backend service.

## Features

- **Scrapbook-inspired interface** — layered photo cards, paper notes, soft colors, and handwritten-style headings.
- **About section** — introduces the person behind the website through short profile notes.
- **Memory gallery** — browse photos by category and open them in a modal photo viewer.
- **Dreams and goals** — presents personal aspirations and experiences in grouped cards.
- **Random quote selector** — displays supportive messages by category.
- **Personal letters** — switch between letters and read each one in a dedicated paper-style layout.
- **Background music player** — play or pause the audio, mute it, adjust volume, and seek through the track.
- **Responsive navigation** — includes a collapsible mobile menu and active-section indication.
- **Accessibility considerations** — semantic landmarks, descriptive labels, keyboard controls for the photo viewer, a skip link, and reduced-motion support.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure and semantic content |
| CSS3 | Layout, responsive styling, and visual design |
| Vanilla JavaScript | Content rendering and interactive behavior |
| HTML Audio API | Background music playback |
| Google Fonts | Caveat and Lora typography |

## Project Structure

```text
anna-world/
├── audio/
│   └── song.mp3
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── data.js
├── photos/
│   ├── 01.webp
│   ├── 02.webp
│   ├── ...
│   └── og.jpg
├── index.html
└── README.md
```

### How the code is organized

- `index.html` contains the page sections and the elements used by the JavaScript application.
- `css/style.css` contains the visual system, layout rules, responsive behavior, and component styles.
- `js/data.js` stores the website's editable content, including profile notes, photos, categories, dreams, quotes, letters, and music metadata.
- `js/app.js` renders the content and handles gallery filtering, the photo viewer, quote selection, letter navigation, responsive navigation, and audio controls.
- `photos/` contains the image assets used throughout the website.
- `audio/` contains the local audio file used by the music player.

## Accessibility and Performance Notes

- Images use lazy loading where appropriate.
- The hero images are prioritized for initial display.
- The interface respects the user's `prefers-reduced-motion` setting.
- Interactive elements use native buttons and accessible labels.
- The website uses local image and audio assets; Google Fonts are loaded externally.

## Project Status

This project is a personal website and portfolio demonstration. Its content and visual details may be updated as the website evolves.

## License

No open-source license is currently included. Unless a license is added, the source code should be treated as all rights reserved by its respective owner. Third-party assets remain subject to their own licenses and usage terms.
