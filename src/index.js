//1. Statz's code: Index.js : Rendering the the sandwiches at the top of the page. 
//1. Fetch call to the db.json and parsing out all of the data.


//1.1 Getting ID's to render the images
document.addEventListener('DOMContentLoaded', () => {
    const sandwichMenu = document.getElementById('menu')

    //1.2 Function to create images
    function createSandwichImage(sandwich) {
        const img = document.createElement('img')
        img.src = sandwich.url
        img.classList.add('sandwich-image') //Add a CSS class to the img element
        sandwichMenu.appendChild(img) //Append the created img element to the sandwichMenu div
    }

    //1.3 Make an HTTP GET request to fetch the sandwich data from the server
    fetch('http://localhost:3000/sandwiches')
    .then((res) => res.json ())
    .then(data => {

        //1.4 Iterate through the sandwich objects and create img tags for each
        data.forEach(sandwich => {
            createSandwichImage(sandwich)
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error)
    })
})
