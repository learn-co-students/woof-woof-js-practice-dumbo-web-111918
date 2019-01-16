document.addEventListener("DOMContentLoaded", initalize)

function initalize(){
  getDogs().then(addAllDogsToDogBar)
}

function addAllDogsToDogBar(dogArray){
  const dogBar = document.querySelector('#dog-bar')
  dogBar.innerHTML = ''
  dogArray.forEach(addDogSpanToDogBar)
}

function addDogSpanToDogBar(dog){
  const dogBar = document.querySelector("#dog-bar")
  const dogSpan = document.createElement("span")
  dogSpan.innerText = dog.name
  dogSpan.dataset.id = dog.id

  dogSpan.addEventListener("click", onDogSpanClick)

  dogBar.append(dogSpan)
}

function onDogSpanClick(e){
  getSingleDog(e.target.dataset.id)
    .then(addDogInfoToPage)
}

function addDogInfoToPage(dog){
  const dogInfo = document.querySelector('#dog-info')
  dogInfo.innerHTML = ''

  const dogImg = document.createElement('img')
  dogImg.src = dog.image

  const dogTitle = document.createElement('h2')
  dogTitle.innerText = dog.name

  const dogBtn = document.createElement('button')
  dogBtn.innerText = dog.IsGoodDog ? "Good Boi!" : "Bad Boi!"
  dogBtn.dataset.id = dog.id
  dogBtn.addEventListener('click', onGoodDogButtonClick)

  dogInfo.append(dogImg, dogTitle, dogBtn)
}

  function onGoodDogButtonClick(e){
    let newVal;
    if (e.target.innerText.includes('Good')){
      e.target.innerText = 'Bad Boi!'
      newVal = false;
    } else {
      e.target.innerText = 'Good Boi!'
      newVal = true;
    }
    toggleGoodDog(e.target.dataset.id, newVal)
  }


// fetches:

const baseURL = "http://localhost:3000/pups"

function getDogs(){
  return fetch(baseURL)
    .then(r => r.json())
}

function getSingleDog(id){
  return fetch(baseURL + `/${id}`)
    .then(r => r.json() )
}

function toggleGoodDog(id, newVal){
  const options = {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: newVal
    })
  }
  return fetch(baseURL + `/${id}`, options)
    .then(res => res.json())
}
