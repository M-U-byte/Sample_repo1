// Contact Management App JavaScript

// Initialize contacts array from localStorage
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editingIndex = null;

// DOM Elements
const contactForm = document.getElementById('contactForm');
const contactNameInput = document.getElementById('contactName');
const contactEmailInput = document.getElementById('contactEmail');
const contactPhoneInput = document.getElementById('contactPhone');
const contactsList = document.getElementById('contactsList');
const contactsTableContainer = document.getElementById('contactsTableContainer');
const noContactsMessage = document.getElementById('noContactsMessage');
const contactCount = document.getElementById('contactCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const editForm = document.getElementById('editForm');
const editNameInput = document.getElementById('editName');
const editEmailInput = document.getElementById('editEmail');
const editPhoneInput = document.getElementById('editPhone');
const saveEditBtn = document.getElementById('saveEditBtn');

// Event Listeners
contactForm.addEventListener('submit', addContact);
clearAllBtn.addEventListener('click', clearAllContacts);
saveEditBtn.addEventListener('click', saveEdit);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    displayContacts();
});

// Add Contact Function
function addContact(e) {
    e.preventDefault();

    // Get form values
    const name = contactNameInput.value.trim();
    const email = contactEmailInput.value.trim();
    const phone = contactPhoneInput.value.trim();

    // Validate inputs
    if (!name || !email || !phone) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    // Check for duplicate email
    if (contacts.some(contact => contact.email.toLowerCase() === email.toLowerCase())) {
        showAlert('This email already exists in your contacts!', 'warning');
        return;
    }

    // Create contact object
    const newContact = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        dateAdded: new Date().toLocaleDateString()
    };

    // Add to array
    contacts.push(newContact);

    // Save to localStorage
    saveToLocalStorage();

    // Clear form
    contactForm.reset();
    contactNameInput.focus();

    // Update display
    displayContacts();

    // Show success message
    showAlert('Contact added successfully!', 'success');
}

// Display Contacts Function
function displayContacts() {
    contactCount.textContent = contacts.length;

    if (contacts.length === 0) {
        contactsTableContainer.style.display = 'none';
        noContactsMessage.style.display = 'flex';
        clearAllBtn.style.display = 'none';
        return;
    }

    contactsTableContainer.style.display = 'block';
    noContactsMessage.style.display = 'none';
    clearAllBtn.style.display = 'block';

    // Sort contacts by name
    const sortedContacts = [...contacts].sort((a, b) => 
        a.name.localeCompare(b.name)
    );

    // Clear the list
    contactsList.innerHTML = '';

    // Add each contact to the table
    sortedContacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${escapeHtml(contact.name)}</strong>
            </td>
            <td>
                <a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a>
            </td>
            <td>
                <a href="tel:${escapeHtml(contact.phone)}">${escapeHtml(contact.phone)}</a>
            </td>
            <td>
                <button class="btn btn-sm btn-edit" onclick="editContact(${contact.id})">
                    ✏️ Edit
                </button>
                <button class="btn btn-sm btn-delete" onclick="deleteContact(${contact.id})">
                    🗑️ Delete
                </button>
            </td>
        `;
        contactsList.appendChild(row);
    });
}

// Edit Contact Function
function editContact(id) {
    const contact = contacts.find(c => c.id === id);
    
    if (!contact) return;

    editingIndex = contacts.indexOf(contact);

    // Populate edit form
    editNameInput.value = contact.name;
    editEmailInput.value = contact.email;
    editPhoneInput.value = contact.phone;

    // Show modal
    editModal.show();
    editNameInput.focus();
}

// Save Edit Function
function saveEdit() {
    const name = editNameInput.value.trim();
    const email = editEmailInput.value.trim();
    const phone = editPhoneInput.value.trim();

    // Validate inputs
    if (!name || !email || !phone) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    // Check for duplicate email (excluding current contact)
    const isDuplicateEmail = contacts.some((contact, index) => 
        index !== editingIndex && 
        contact.email.toLowerCase() === email.toLowerCase()
    );

    if (isDuplicateEmail) {
        showAlert('This email already exists in your contacts!', 'warning');
        return;
    }

    // Update contact
    const originalContact = contacts[editingIndex];
    originalContact.name = name;
    originalContact.email = email;
    originalContact.phone = phone;

    // Save to localStorage
    saveToLocalStorage();

    // Close modal
    editModal.hide();

    // Update display
    displayContacts();

    // Show success message
    showAlert('Contact updated successfully!', 'success');

    editingIndex = null;
}

// Delete Contact Function
function deleteContact(id) {
    // Show confirmation
    if (confirm('Are you sure you want to delete this contact?')) {
        contacts = contacts.filter(contact => contact.id !== id);
        saveToLocalStorage();
        displayContacts();
        showAlert('Contact deleted successfully!', 'info');
    }
}

// Clear All Contacts Function
function clearAllContacts() {
    if (contacts.length === 0) return;

    if (confirm('Are you sure you want to delete all contacts? This action cannot be undone!')) {
        contacts = [];
        saveToLocalStorage();
        displayContacts();
        showAlert('All contacts have been deleted!', 'warning');
    }
}

// Save to localStorage Function
function saveToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Show Alert Function
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert after header
    const header = document.querySelector('.display-4').parentElement;
    header.parentElement.insertBefore(alertDiv, header.nextElementSibling);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 4000);
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Search/Filter functionality (bonus)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        contactNameInput.focus();
    }
});
