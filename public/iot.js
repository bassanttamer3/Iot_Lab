const socket = io();

// Listen for the 'update-list' event to update the list when data is received
socket.on('update-list', function(data) {
    console.log('Received updated list:', data); // Check received data
    const dataList = document.getElementById('submissionList');
    dataList.innerHTML = ''; // Clear the old list
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `Name: ${item.userName}, Phone: ${item.number}, Email: ${item.email}, Date: ${item.date}`;
        dataList.appendChild(li);
    });
});

// Send data when the form is submitted
const form = document.getElementById('myForm');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        userName: document.getElementById('userName').value,
        number: document.getElementById('number').value,
        email: document.getElementById('email').value,
        date: document.getElementById('dob').value // Correct the ID to match the input element
    };

    socket.emit('new-data', formData); // Emit the data to the server
    form.reset(); // Reset the form after submission

    // Display an alert that data has been successfully submitted
    alert('Data has been successfully submitted!');
});
