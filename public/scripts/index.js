document.getElementById('jokeForm').addEventListener('submit', function(event) {
    const nameInput = document.getElementById('floatingInput');
    const name = nameInput.value.trim();

    // Check if the name is not empty
    if (name === '') {
        // Prevent the form from being submitted
        event.preventDefault();

        // Optionally, you can provide feedback to the user (e.g., show an error message)
        alert('Please enter your name before submitting the form.');
    } else {
        // If the name is not empty, update the hidden input field value
        const jokeType = document.querySelector('input[name="jokeType"]:checked').value;
        document.getElementById('selectedOption').value = jokeType;
    }

});

    
    
    document.addEventListener('DOMContentLoaded', function() {
        // Get the value of the selected radio button on page load
        const jokeType = document.querySelector('input[name="jokeType"]:checked').value;

        // Disable or enable the custom joke category checkboxes based on the selected radio button
        const checkboxes = document.querySelectorAll('input[name="categories"]');
        checkboxes.forEach(checkbox => {
            checkbox.disabled = jokeType === 'any';
        });
    });

    // Add an event listener to the form
    document.getElementById('jokeForm').addEventListener('change', function() {
        // Get the value of the selected radio button
        const jokeType = document.querySelector('input[name="jokeType"]:checked').value;

        // Disable or enable the custom joke category checkboxes based on the selected radio button
        const checkboxes = document.querySelectorAll('input[name="categories"]');
        checkboxes.forEach(checkbox => {
            checkbox.disabled = jokeType === 'any';
        });

        

        // If the selected joke type is 'custom', check if at least one checkbox is selected
        if (jokeType === 'custom') {
            const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

            // Add or remove the class to change the border color based on the validation status
            document.getElementById('jokeForm').classList.toggle('invalid-form', !atLeastOneChecked);
        } else {
            // Remove the class if the selected joke type is not 'custom'
            document.getElementById('jokeForm').classList.remove('invalid-form');
        }
    });

