// SandWhich JS code

// Establishing our containers of data 
const sandwichMenu = document.getElementById('menu')
const ingredientsList = document.getElementById('ingredients')
const focusedSandwich = document.getElementById('focusedSandwich')
const commentSection = document.getElementById('comments')

// Setting a global variable 
let allSandwiches = []
let focusedSandwichId = ''

//Fetch to get data and make the function call to render the top menu
fetch('http://localhost:3000/sandwiches')
    .then((res) => res.json())
    .then(data => {
        data.forEach(sandwich => {
            createSandwichImage(sandwich)
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error)
    })


// Function to render images on the Menu 
function createSandwichImage(sandwich) {
    const img = document.createElement('img')
    img.src = sandwich.url
    img.classList.add('sandwich-image') //Add a CSS class to the img element
    img.setAttribute('data-id', sandwich.id); // Set the data-id attribute to store the sandwich id
    allSandwiches.push(sandwich)
    img.addEventListener(
        'mouseenter',
        (event) => {
            event.target.classList.add('enlarge')

        }
    );

    sandwichMenu.appendChild(img) //Append the created img element to the sandwichMenu div
}


// Click event on the menu to render the selected image in the center of the page and the ingredients list on the side 
sandwichMenu.addEventListener('click', (e) => {
    const clickedImg = e.target;
    const sandwichId = clickedImg.getAttribute('data-id'); // Get the value of the data-id attribute
    ingredientsList.innerHTML = ""
    const ingredientsListTitle = document.createElement('h3')
    ingredientsListTitle.textContent = "Ingredients"
    ingredientsList.appendChild(ingredientsListTitle)

    let mySound = new Audio('./audio/ULC7YZK-order-up-with-bell-ding.mp3')
    mySound.play()



    focusedSandwichId = sandwichId
    fetch(`http://localhost:3000/sandwiches/${sandwichId}`)
        .then(res => res.json())
        .then(data => {
            focusedSandwich.innerHTML = ""
            console.log(data.url)
            addFocusedSandwich(data)
            let ingredientsIds = data['sandwich-ingredients-ids']
            ingredientsIds.forEach(id => {
                fetch(`http://localhost:3000/ingredients/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        renderSandwichIngredientList(data)
                    })
            })
        })

    commentSection.innerHTML = ""
    let filteredSandwich = allSandwiches.filter(allSandwiches => allSandwiches.id == focusedSandwichId);
    filteredSandwich[0].commentsArr.forEach(comment => {
        const newComment = document.createElement('li')
        newComment.textContent = comment
        commentSection.append(newComment)

    })


})




const sandwichForm = document.getElementById('sandwichForm');
sandwichForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let filteredSandwich = allSandwiches.filter(allSandwiches => allSandwiches.id == focusedSandwichId);
    filteredSandwich[0].commentsArr.push(event.target["new-comment"].value)
    fetch(`http://localhost:3000/sandwiches/${focusedSandwichId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            commentsArr: filteredSandwich[0].commentsArr
        }),
    })
        .catch(error => console.error('Error:', error));
    sandwichForm.reset()

    // making a list of new comments
    commentSection.innerHTML = ''

    filteredSandwich[0].commentsArr.forEach(comment => {
        const newComment = document.createElement('li')
        newComment.textContent = comment
        commentSection.append(newComment)

    })
})










//The function to create the image in the center of the page 
function addFocusedSandwich(sandwich) {
    const h2 = document.createElement('h2')
    h2.textContent = sandwich.name
    const img = document.createElement('img')
    img.src = sandwich.url
    img.classList.add('sandwich-clicked') //Add a CSS class to the img element
    focusedSandwich.appendChild(h2)
    focusedSandwich.appendChild(img) //Append the created img element to the sandwichMenu div
}


//The function to create the list of ingredients on the right side of the page 
function renderSandwichIngredientList(ingredients) {
    const ul = document.createElement('ul')
    ul.classList.add('ingredients-list')
    ingredientsList.append(ul)
    const p = document.createElement('p')
    p.innerHTML = ingredients.name
    const img = document.createElement('img')
    img.src = ingredients.url
    img.classList.add('ingredient-image') //Add a CSS class to the img element
    ul.appendChild(img)
    ul.appendChild(p)
}



// Creating variables and click event to generate a random image to the center of the page and ingredients list on the right side
const randomButtonContainer = document.getElementById('randomButtonContainer')
let randomButton = document.createElement('button')

randomButton.setAttribute('id', 'randomButton')

sandwhichImage = document.createElement('img')
sandwhichImage.src = './images/RandomSandwhich.PNG'
sandwhichImage.classList.add('randomButtonImage')

randomButton.appendChild(sandwhichImage)
randomButtonContainer.appendChild(randomButton)

randomButtonContainer.addEventListener('click', (e) => {
    getrandomSandwich()
        .then(randomSandwichId => {
            focusedSandwichId = randomSandwichId
            fetch(`http://localhost:3000/sandwiches/${randomSandwichId}`)
                .then(res => res.json())
                .then(data => {
                    focusedSandwich.innerHTML = ""
                    ingredientsList.innerHTML = ""
                    commentSection.innerHTML = ""

                    const ingredientsListTitle = document.createElement('h3')
                    ingredientsListTitle.textContent = "Ingredients"
                    ingredientsList.appendChild(ingredientsListTitle)

                    let filteredSandwich = allSandwiches.filter(allSandwiches => allSandwiches.id == focusedSandwichId);
                    filteredSandwich[0].commentsArr.forEach(comment => {
                        const newComment = document.createElement('li')
                        newComment.textContent = comment
                        commentSection.append(newComment)

                    })

                    console.log(data.url)
                    addFocusedSandwich(data)
                    let ingredientsIds = data['sandwich-ingredients-ids']
                    ingredientsIds.forEach(id => {
                        fetch(`http://localhost:3000/ingredients/${id}`)
                            .then(res => res.json())
                            .then(data => {
                                renderSandwichIngredientList(data)
                            })
                    })
                })
        })


})

// Function to get a random sandwich from the array of sandwiches
function getrandomSandwich() {
    return fetch('http://localhost:3000/sandwiches')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error fetching data');
            }
        })
        .then(data => {
            let randomIndex = Math.floor(Math.random() * data.length) + 1;
            return randomIndex;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}



