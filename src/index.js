//add dog names to dog bar div
const containerDiv = document.querySelector("#dog-summary-container")
const barDiv = document.querySelector("#dog-bar")
const nameSpan = document.createElement("span")
const filterDogsButton = document.querySelector("#good-dog-filter")


document.addEventListener("DOMContentLoaded", init)
console.log("dom loaded")

//initialize
function init(event){
  const filterDogsButton = document.querySelector("#good-dog-filter")
  filterDogsButton.addEventListener("click", toggleFilter)
  getDogs().then(addAllDogsToDogBar)
}

function toggleFilter(event){
  if (filterDogsButton.innerText.includes("OFF")){
    filterDogsButton.innerText = "Filter good dogs: ON"
    updateDogBar()
  } else {
    filterDogsButton.innerText = "Filter good dogs: OFF"
    updateDogBar()
  }
}

// puts dogs in dogBar
function addAllDogsToDogBar(dogArray, filter = false){
  console.log(dogArray)
  const barDiv = document.querySelector("#dog-bar")
  barDiv.innerHTML = ""
  // iterate thru all dogs and callback for add to bar
  if (filter) {
    dogArray.filter(dog => dog.isGoodDog).forEach(addDogSpantoDogBar)
  } else {
    dogArray.forEach(addDogSpantoDogBar)
  }
}

// create span ---> append name span to bar
// add dataset id
// add click listener
function addDogSpantoDogBar(dog){
  const barDiv = document.querySelector("#dog-bar")
  const nameSpan = document.createElement("span")
  nameSpan.innerText = dog.name
  nameSpan.dataset.id = dog.id
  nameSpan.addEventListener("click", onDogSpanClick)
  barDiv.append(nameSpan)
}

// create funtion for click event that fetches ONE dog
function onDogSpanClick(event){
  getOneDog(event.target.dataset.id)
    .then(showDogInfo)}


// grab the dog info and set the innerHTML
function showDogInfo(dog){
  console.log(dog.id)
  containerDiv.innerHTML = `<img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button>${dog.isGoodDog}</button>`
    const goodButton = document.querySelector("#dog-summary-container button")

// show good dog vs bad + event listener for toggle
    if (dog.isGoodDog !== true){
      goodButton.innerHTML = `<button> Good Dog! </button>`
    } else {
      goodButton.innerHTML = `<button> Bad Boi! </button>`
    }
    goodButton.dataset.id = dog.id
    goodButton.addEventListener("click", goodDogButtonClick)
}

// toggle good or bad dog event
function goodDogButtonClick(event){
  let goodStatus;
  if (event.target.innerText.includes("Good")){
      event.target.innerText = "Bad Boi!"
      goodStatus = false
    } else {
      event.target.innerText = "Good Dog!"
      goodStatus = true
    }
  }

function updateDogBar(){
  if (filterDogsButton.innerText.includes("OFF")){
    getDogs().then(dogArray => addAllDogsToDogBar(dogArray))
  } else {
    getDogs().then(dogArray => addAllDogsToDogBar(dogArray, true))
  }
}


  ////// some fetches:
  const dogURL = "http://localhost:3000/pups"

  // fetch for all Dogs
  function getDogs(){
    return fetch(dogURL)
      .then(response => response.json())
  }

  // fetch for one dog, have pass in ID
  function getOneDog(id){
    return fetch(dogURL + `/${id}`)
      .then(response => response.json() )
  }

  // set up fetch for good/bad toggle update
  // have to pass in ID and options object
  function toggleGoodDog(id, goodStatus){
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: goodStatus
      })
    }
    return fetch(dogURL + `/${id}`, options)
      .then(response => response.json())

  }
