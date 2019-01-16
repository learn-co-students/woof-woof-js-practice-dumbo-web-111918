function createDogBar(dogs){
    let dogsBar = document.querySelector("#dog-bar")
    dogsBar.addEventListener("click", function(e){
        showDogInfo(e, dogs)
    })
    dogs.forEach(dog => displayDogOnDogBar(dog, dogsBar))
}

function displayDogOnDogBar(dog, dogsBar){
    let dogSpan = document.createElement("span")
    dogSpan.dataset.id = dog.id
    dogSpan.innerText = dog.name
    dogsBar.appendChild(dogSpan)
}

function createGoodDogBar(dogs) {
    let dogsBar = document.querySelector("#dog-bar")
    dogsBar.addEventListener("click", function(e){
        showDogInfo(e, dogs)
    })
    let goodDogs = dogs.filter(dog => dog.isGoodDog)
    goodDogs.forEach(dog => displayDogOnDogBar(dog, dogsBar))
}

function showDogInfo(e, dogs){
    dogId = e.target.dataset.id
    let dogObj = dogs.filter(dog => dog.id == dogId)[0]
    let dogDiv = document.querySelector("#dog-info")
    dogDiv.innerHTML =  `<img src=${dogObj.image}> <h2>${dogObj.name}</h2>
     <button data-id="${dogObj.id}">${dogObj.isGoodDog? "Good Dog!":"Bad Dog!"}</button>`
}

function patchDogGoodness(dog, e, dogId){
    if (e.target.textContent === "Good Dog!") {
        e.target.textContent = "Bad Dog!"
        dog = {isGoodDog:false}
    } else {
        e.target.textContent = "Good Dog!"
        dog = {isGoodDog:true}
        }
    fetch(`http://localhost:3000/pups/${dogId}`, {
        method:"PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dog)
    }).then(res => res.json())
    .then(dog => console.log(dog)
    )}

function showAllDogs(){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogs => createDogBar(dogs))
}

function showGoodDogs(){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogs => createGoodDogBar(dogs))
}

function removeAllDogs(){
    let dogsBar = document.querySelector("#dog-bar")
    while (dogsBar.firstChild){
        dogsBar.removeChild(dogsBar.firstChild)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let dogDiv = document.querySelector("#dog-info")
    dogDiv.addEventListener("click", function(e){
        let dogId = e.target.dataset.id
        fetch(`http://localhost:3000/pups/${dogId}`)
        .then(res => res.json())
        .then(dog => patchDogGoodness(dog, e, dogId))
    })

    let filterGoodBoysButton = document.querySelector("#good-dog-filter")
    filterGoodBoysButton.addEventListener("click", function(e){
        if (e.target.dataset.on === 'false') {
            e.target.dataset.on = 'true'
            e.target.innerText = "Filter good dogs: ON"
            removeAllDogs()
            showGoodDogs()
        } else {
            e.target.dataset.on = 'false'
            e.target.innerText = "Filter good dogs: OFF"
            removeAllDogs()
            showAllDogs()
        }
    })
    showAllDogs()
})