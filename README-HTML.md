# EditX Studio - HTML Version

A professional image and video editing platform built with vanilla HTML, CSS, and JavaScript. This standalone version is easy to run and doesn't require any build tools or dependencies.

## 🚀 Quick Start

1. **Download the files:**
   - `index.html` - Main HTML file
   - `styles.css` - All styling
   - `script.js` - All functionality

2. **Open in your browser:**
   - Simply double-click `index.html` or open it in any web browser
   - No server setup required!

3. **Start editing:**
   - Click "Start Editing" to open the editor
   - Create an account or sign in
   - Upload images and start editing

## ✨ Features

### 🖼️ Image Editing
- **Upload & Import:** Drag and drop or click to upload images
- **Canvas Editing:** Professional canvas-based editing interface
- **Layer Management:** Add, delete, show/hide, and lock layers
- **Text Tools:** Add text layers with customizable fonts
- **Basic Tools:** Select, crop, rotate, and transform tools
- **Export:** Save your work as PNG images

### 🎬 Video Editing (Coming Soon)
- **Timeline Interface:** Multi-track video editing
- **Video Tools:** Cut, trim, transitions, and effects
- **Audio Support:** Add and edit audio tracks
- **Export Options:** Multiple video formats

### 🤖 AI Features (Coming Soon)
- **Background Removal:** AI-powered background removal
- **Auto Enhancement:** Smart image enhancement
- **Style Transfer:** Apply artistic styles to images
- **Object Removal:** Remove unwanted objects

### 👥 User Features
- **Authentication:** Sign up and sign in system
- **Project Saving:** Save projects locally
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Dark Theme:** Professional dark interface

## 🛠️ How to Use

### Getting Started
1. Open `index.html` in your browser
2. Click "Start Editing" or "Sign In"
3. Create an account or sign in
4. Upload an image by clicking "Import" or dragging files
5. Use the tools in the left sidebar to edit
6. Manage layers in the right panel
7. Export your work when finished

### Available Tools
- **Select:** Click to select layers
- **Crop:** Crop and resize images
- **Rotate:** Rotate images
- **Text:** Add text layers
- **Brush:** Draw on canvas
- **Filters:** Apply image filters
- **AI Tools:** AI-powered editing features

### Keyboard Shortcuts
- `Ctrl/Cmd + S` - Save project
- `Ctrl/Cmd + O` - Open file
- `Ctrl/Cmd + E` - Export project
- `Delete` - Delete selected layer
- `Escape` - Close modals

## 📁 File Structure

```
editx-studio-html/
├── index.html          # Main HTML file
├── styles.css          # All CSS styling
├── script.js           # JavaScript functionality
└── README-HTML.md      # This file
```

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css` to customize colors:

```css
:root {
    --primary-500: #0ea5e9;    /* Main blue color */
    --secondary-500: #d946ef;  /* Purple accent */
    --gray-900: #0f172a;       /* Dark background */
    /* ... more colors */
}
```

### Adding New Tools
To add new editing tools, modify the `selectTool()` function in `script.js`:

```javascript
function selectTool(tool) {
    selectedTool = tool;
    
    switch (tool) {
        case 'your-tool':
            // Add your tool logic here
            break;
    }
}
```

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## 📱 Mobile Support

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Technical Details

### Technologies Used
- **HTML5:** Structure and canvas element
- **CSS3:** Styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript:** No frameworks or libraries required
- **Canvas API:** For image manipulation
- **Local Storage:** For saving user data and projects
- **File API:** For file uploads and downloads

### Performance
- Lightweight and fast loading
- No external dependencies
- Optimized for smooth editing experience
- Efficient canvas rendering

## 🚀 Deployment

### Local Development
Simply open `index.html` in your browser - no server needed!

### Web Hosting
Upload all files to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any traditional web hosting

### File Structure for Hosting
```
your-website.com/
├── index.html
├── styles.css
└── script.js
```

## 🐛 Troubleshooting

### Common Issues

**Images not loading:**
- Check that the image file is valid
- Try a different image format (JPG, PNG, WebP)
- Ensure the file size is reasonable (< 10MB)

**Canvas not working:**
- Make sure JavaScript is enabled
- Try refreshing the page
- Check browser console for errors

**Save not working:**
- Check that localStorage is enabled
- Try a different browser
- Clear browser cache and try again

### Browser Console
Open browser developer tools (F12) to see any error messages or debug information.

## 🔮 Future Features

- Video editing capabilities
- AI-powered tools
- Cloud storage integration
- Collaborative editing
- More filters and effects
- Advanced layer blending modes
- Plugin system

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to contribute by:
- Reporting bugs
- Suggesting new features
- Improving the code
- Adding new tools

## 📞 Support

If you need help:
1. Check the troubleshooting section
2. Look at the browser console for errors
3. Try a different browser
4. Create an issue on GitHub

---

**Enjoy editing with EditX Studio! 🎨**