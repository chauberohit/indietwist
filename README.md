# Indie Twist Restaurant Table Booking Template

A modern, responsive restaurant booking template for Indie Twist restaurant. This template features a beautiful design with Bootstrap integration and comprehensive booking functionality, showcasing authentic Indian cuisine with a modern twist.

## Features

### 🎨 Design & UI
- **Modern Hero Section** with stunning background image and gradient overlays
- **Responsive Design** that works perfectly on all devices
- **Elegant Color Scheme** inspired by Indian cuisine (browns, golds, and warm tones)
- **Smooth Animations** and scroll effects
- **Professional Typography** using Google Fonts (Playfair Display & Inter)

### 📱 Responsive Layout
- Mobile-first design approach
- Bootstrap 5.3.0 integration
- Flexible grid system
- Touch-friendly navigation
- Optimized for all screen sizes

### 🍽️ Restaurant Features
- **Hero Section** showcasing Indie Twist branding
- **About Section** with restaurant information
- **Special Offers** with pricing
- **Comprehensive Menu** with filtering
- **Contact Information** with map integration
- **Social Media Links**

### 📋 Booking System
- **Comprehensive Booking Form** with validation
- **Real-time Form Validation** with visual feedback
- **Date Restrictions** (no past dates, 3-month advance booking)
- **Time Slot Management** based on restaurant hours
- **Guest Count Validation**
- **Special Occasion Options**
- **Dietary Requirements** field
- **Form Auto-save** to localStorage
- **Success/Error Messages**

### ⚡ Interactive Features
- **Smooth Scrolling** navigation
- **Navbar Scroll Effects** with backdrop blur
- **Form Validation** with Bootstrap styling
- **Loading States** for form submission
- **Image Lazy Loading** for performance
- **Mobile Menu** optimization

## File Structure

```
HTML Template/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables
- **Bootstrap 5.3.0** - Responsive framework
- **JavaScript ES6+** - Modern JavaScript features
- **Font Awesome 6.4.0** - Icons
- **Google Fonts** - Typography

## Getting Started

1. **Open the Template**
   - Simply open `index.html` in your web browser
   - No server setup required for basic functionality

2. **Customize Content**
   - Edit restaurant information in the HTML
   - Update contact details and hours (currently set for Indie Twist, Newbury)
   - Modify menu items and pricing
   - Replace placeholder images with actual restaurant photos

3. **Styling Customization**
   - Modify CSS variables in `styles.css` for color scheme
   - Update fonts, spacing, and layout as needed
   - Customize the hero section background image

## Customization Guide

### Colors
The template uses CSS custom properties for easy color customization:

```css
:root {
    --primary-color: #8B4513;    /* Main brown */
    --secondary-color: #D2691E;  /* Orange brown */
    --accent-color: #CD853F;     /* Light brown */
    --gold-color: #FFD700;       /* Gold accents */
    --dark-color: #2C1810;       /* Dark brown */
}
```

### Restaurant Information
Update the following sections in `index.html`:
- Restaurant name and tagline (currently "Indie Twist - Twist on Tradition")
- Contact information (currently set for Newbury location)
- Opening hours (currently 12:00pm - 10:00pm daily)
- Menu items and pricing (comprehensive menu already included)
- Social media links

### Images
Replace placeholder images with your own:
- Hero background image
- Restaurant interior photos
- Menu item photos
- Update image sources in HTML

### Booking Form
The booking form includes:
- Personal information fields
- Date and time selection
- Guest count
- Special occasions
- Dietary requirements
- Special requests

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading** for images
- **Optimized CSS** with efficient selectors
- **Minimal JavaScript** for fast loading
- **Responsive Images** with proper sizing
- **Smooth Animations** with hardware acceleration

## Form Functionality

The booking form includes:
- ✅ Real-time validation
- ✅ Email format checking
- ✅ Phone number validation
- ✅ Date restrictions
- ✅ Required field validation
- ✅ Auto-save to localStorage
- ✅ Success/error messaging
- ✅ Loading states

## Integration Notes

### Backend Integration
To make the booking form functional:
1. Replace the simulated API call in `script.js`
2. Add your backend endpoint URL
3. Handle form data processing
4. Implement email notifications
5. Add database storage

### Email Integration
Consider adding:
- Email confirmation to customers
- Admin notification emails
- Booking reminder emails
- Cancellation handling

## License

This template is created for educational and commercial use. Feel free to customize and use for your restaurant website.

## Support

For customization help or questions about this template, please refer to the code comments or modify the files according to your needs.

---

**Template created for:** Indie Twist Restaurant, Newbury

**Created with:** HTML5, CSS3, Bootstrap 5, JavaScript ES6+
