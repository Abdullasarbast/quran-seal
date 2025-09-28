# Quran Seal - Name Management Application

A React.js application for managing names with RTL (Right-to-Left) support, built with Tailwind CSS and Ant Design. This application allows users to create, edit, and save name lists with automatic image generation.

## Features

- **RTL Support**: Full right-to-left text support for Arabic/Kurdish text
- **Name Management**: Add, edit, and manage names with localStorage persistence
- **Dynamic Numbering**: Automatic row numbering (1/, 2/, 3/, etc.)
- **Search & Select**: Searchable dropdown for stored names
- **Manual Input**: Manual name entry for each row
- **Row Editing**: Edit entire rows with comma-separated names
- **Image Generation**: Save current state as PNG image
- **Date Display**: Customizable date display at bottom left
- **Responsive Design**: Mobile-friendly responsive layout
- **Data Persistence**: Names stored for 1 year with automatic cleanup
- **Saved Images**: View and manage previously saved images

## Technologies Used

- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Ant Design** - UI component library
- **localStorage** - Client-side data persistence
- **Canvas API** - Image generation

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Adding Names

1. Click "Add New Name" to add names to the storage
2. Names are automatically saved to localStorage for 1 year
3. Duplicate names are prevented

### Managing Rows

1. Use "Add Row" to create new numbered rows
2. Select names from the dropdown or enter manually
3. Click "Edit" to edit entire rows
4. Use "Manual" button to enter names directly

### Saving Images

1. Click "Save Image" to generate a PNG of the current state
2. Images are saved to localStorage with timestamps
3. Use "View Saved" to see previously saved images

### Features

- **Dynamic Height**: Document height adjusts based on number of rows
- **RTL Layout**: Proper right-to-left text alignment
- **Arabic Font**: Uses Amiri font for proper Arabic text rendering
- **Mobile Responsive**: Optimized for mobile devices

## File Structure

```
src/
├── App.jsx                 # Main application component
├── App.css                 # Custom styles
├── main.jsx               # Application entry point
├── index.css              # Global styles with Tailwind
├── utils/
│   └── localStorage.js    # localStorage utilities
└── components/
    └── SavedImages.jsx    # Saved images management component
```

## localStorage Structure

### Names Storage

```javascript
{
  "quran_seal_names": [
    {
      "name": "اسم المستخدم",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Images Storage

```javascript
{
  "quran_seal_saved_images": [
    {
      "id": "unique_id",
      "data": "data:image/png;base64...",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "date": "01/01/2024"
    }
  ]
}
```

## Customization

### Font

The application uses the Amiri font for Arabic text. You can change this in `src/index.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap");
```

### Colors

Modify colors in `tailwind.config.js` or use Tailwind classes directly in components.

### Canvas Generation

The image generation can be customized in the `saveAsImage` function in `App.jsx`.

## Browser Support

- Modern browsers with localStorage support
- Canvas API support for image generation
- ES6+ features

## License

This project is open source and available under the MIT License.
