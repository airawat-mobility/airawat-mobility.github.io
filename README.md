# Urban Vision Hackathon Website

A modern, interactive website for the Urban Vision Hackathon - an AI-driven challenge to improve Indian traffic mobility through image annotation.

![Urban Vision Hackathon Preview](/hack/assets/img/UI-1.jpg)

## About the Project

The Urban Vision Hackathon website serves as the central hub for this innovative competition organized by IISc, supported by the Ministry of Education, AIRAWAT, and Bangalore Traffic Police. The hackathon aims to create India's largest annotated traffic image dataset through a gamified experience, ultimately contributing to smarter AI models for urban mobility.

## Features

- **Modern Design**: Responsive, accessible, and visually appealing interface with dark/light mode toggle
- **Interactive Elements**: Animated sections, interactive cards, and smooth transitions
- **Dynamic Content**: Typewriter effects, animated counters, and progress tracking
- **Gamified Visualization**: Modern gallery with filmstrip carousel for game interface previews
- **Comprehensive Information**: Detailed sections for rules, eligibility, prizes, and important dates
- **Registration Flow**: Step-by-step registration process for both team leaders and members
- **Media Integration**: Video player and poster showcase
- **Partner Showcase**: Visual display of institutional partners
- **Visual Effects**: Canvas-based network graph and particle animations

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Advanced styling with custom properties, flexbox, grid, and animations
- **JavaScript**: Vanilla JS for interactive elements and animations
- **Canvas API**: For network visualization and particle effects
- **Responsive Design**: Mobile-first approach with media queries
- **Remixicon**: Modern icon library
- **Google Fonts**: Typography with Poppins font family

## Project Structure

```
.
├── README.md
├── hack
│   ├── assets
│   │   ├── img
│   │   │   ├── UI-1.png
│   │   │   ├── UI-2.png
│   │   │   ├── UI-3.png
│   │   │   ├── acm-logo.png
│   │   │   ├── airawat-logo.png
│   │   │   ├── artpark.png
│   │   │   ├── btp-logo.png
│   │   │   ├── cds-logo.png
│   │   │   ├── cistup-logo.png
│   │   │   ├── cistup.png
│   │   │   ├── dfpg-logo.png
│   │   │   ├── game.png
│   │   │   ├── ieee-logo.png
│   │   │   ├── iisc-logo.jpg
│   │   │   ├── main-theme-2.png
│   │   │   ├── main-theme.png
│   │   │   ├── main.jpeg
│   │   │   ├── moe-logo.png
│   │   │   ├── portal.png
│   │   │   └── rbcbps-logo.png
│   │   └── poster.png
│   ├── index.html
│   ├── main.jpeg
│   ├── script.js
│   └── styles.css
└── index.html

4 directories, 27 files
```

## Customization

### Modifying Content

Most of the content can be updated directly in the `index.html` file:
- Update text within appropriate tags
- Replace images by changing src attributes
- Modify dates in the timeline section

### Styling Changes

The website uses CSS variables defined at the top of `styles.css`, making it easy to update the color scheme:

```css
:root {
  --primary-color: #4361ee;
  --secondary-color: #3a0ca3;
  --accent-color: #7209b7;
  --text-color: #2b2d42;
  --background-color: #f8f9fa;
  /* Additional variables... */
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Contact

airawat.mobility@iisc.ac.in

## Acknowledgements

- IISc Bangalore
- Ministry of Education, India
- AIRAWAT
- Bangalore Traffic Police
