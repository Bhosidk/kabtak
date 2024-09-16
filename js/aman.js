// Function to scroll to the first element with a specific class
function scrollToClass(className) {
    const target = document.querySelector(`.${className}`);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// Event listener for the link
document.querySelector('.scroll-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor link behavior
    scrollToClass('why-choose'); // Call the function and pass the class
});
