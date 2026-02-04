# Contact Management Web App

A fully functional, interactive contact management application built with HTML, CSS, Bootstrap, and JavaScript.

## Features

✨ **Add Contacts**
- Add new contacts with name, email, and phone number
- Form validation to ensure all fields are filled
- Duplicate email detection
- Auto-focus on form after successful addition

✏️ **Edit Contacts**
- Click the Edit button to modify contact information
- Modal dialog for editing
- Validation to prevent duplicate emails
- Updates saved to local storage

🗑️ **Delete Contacts**
- Delete individual contacts with confirmation
- Clear all contacts at once
- Soft confirmation to prevent accidental deletion

📋 **Contact Listing**
- Display all contacts in a responsive table
- Contacts sorted alphabetically by name
- Contact count badge
- Clickable email and phone links
- Empty state message when no contacts exist

💾 **Data Persistence**
- All contacts saved to browser's localStorage
- Data persists across browser sessions
- No server required

📱 **Responsive Design**
- Works perfectly on desktop, tablet, and mobile
- Bootstrap 5 for professional UI
- Beautiful gradient background
- Smooth animations and transitions

## How to Use

1. **Open the App**: Open `index.html` in your web browser
2. **Add Contact**: 
   - Fill in the name, email, and phone number
   - Click "Add Contact" button
3. **Edit Contact**: 
   - Click the ✏️ Edit button next to any contact
   - Modify the information in the modal
   - Click "Save Changes"
4. **Delete Contact**: 
   - Click the 🗑️ Delete button next to any contact
   - Confirm the deletion
5. **Clear All**: Click "Clear All Contacts" button at the bottom to remove all contacts

## Keyboard Shortcut

- **Ctrl + N**: Focus on the contact name input field

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Custom styling with animations and gradients
- **Bootstrap 5**: Responsive layout and components
- **JavaScript (ES6+)**: Functionality and interactivity
- **localStorage**: Data persistence

## Features Included

✅ Add contacts with validation
✅ Edit existing contacts
✅ Delete single or all contacts
✅ Display contacts in a formatted table
✅ Prevent duplicate email addresses
✅ Input sanitization to prevent XSS
✅ Responsive mobile-friendly design
✅ Local data persistence
✅ Success/error notifications
✅ Alphabetical sorting
✅ Empty state handling

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Local Storage

All contacts are saved in your browser's localStorage under the key `contacts`. To clear all data:
1. Open browser Developer Tools (F12)
2. Go to Console
3. Type: `localStorage.removeItem('contacts')` and press Enter
4. Refresh the page

## Future Enhancements

- Search/filter functionality
- Export contacts to CSV
- Import contacts from file
- Contact categories/groups
- Contact profile images
- Backup and restore functionality
- Dark mode toggle

## License

Free to use and modify

---

Enjoy managing your contacts! 📞
