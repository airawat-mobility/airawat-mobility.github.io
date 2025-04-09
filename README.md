# Urban Vision Hackathon Website

A modern, interactive website for the Urban Vision Hackathon - an AI-driven challenge to improve Indian traffic mobility through image annotation.

![Urban Vision Hackathon Preview](/hack/assets/img/UI-1.png)

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

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript for customization

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/urban-vision-hackathon.git
   ```

2. Navigate to the project directory:
   ```bash
   cd urban-vision-hackathon
   ```

3. Open `index.html` in your browser or set up a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   # Using Node.js with live-server
   npx live-server
   ```

## Project Structure

```
urban-vision-hackathon/
├── assets/
│   ├── img/            # Image assets including logos, UI screenshots
│   ├── dash_board.gif  # Portal preview animation
│   └── video.mp4       # Promotional video
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── main.jpeg           # Main image for about section
└── README.md           # Project documentation
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

### Adding New Features

The JavaScript functionality is organized in a modular way in `script.js`, allowing for easy extension.

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/yourusername/urban-vision-hackathon](https://github.com/yourusername/urban-vision-hackathon)

## Acknowledgements

- [Remixicon](https://remixicon.com/)
- [Google Fonts](https://fonts.google.com/)
- IISc Bangalore
- Ministry of Education, India
- AIRAWAT
- Bangalore Traffic Police
