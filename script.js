// Get the form element (no need for responseMessage anymore)
const form = document.getElementById('portfolioForm');

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Check required fields
    const requiredFields = ['name', 'email', 'message'];
    let isValid = true;

    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            isValid = false;
            alert(`Please fill out the ${field} field.`); // Alert for missing field
        }
    });

    // If all required fields are filled, proceed with submission
    if (isValid) {
        // Log data to console for debugging
        console.log('Form Data:', data);

        // Send the data via EmailJS
        emailjs.send('service_usgmo05', 'template_pbpsxga', data)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message sent successfully! I’ll get back to you within the hour, thanks.'); // Success alert
                form.reset(); // Clear the form
            }, (error) => {
                console.log('FAILED...', error);
                alert('Oops! Something went wrong. Please try again.'); // Error alert
            });
    }
});