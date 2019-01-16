document.addEventListener("DOMContentLoaded", function(){    
    let dogBar = document.getElementById("dog-bar");
    dogBar.addEventListener("click", function(event) {
        const e = event.target;
        id = e.parentNode.dataset.id
        if ( e.classList.contains("pup-name")) {
         fetch(`http://localhost:3000/pups/${id}`)
         .then(object => object.json())
         .then(parsedObject => renderDogDiv(parsedObject));
        }
    })
    //CHANGE DOG FROM GOOD TO BAD AND BACK
    let dogDivBtn = document.getElementById("dog-summary-container");
    dogDivBtn.addEventListener("click", function(event){
        const e = event.target
        if( e.classList.contains("good-boy")) {
            
            let changeGoodvalue = function() {
                if (e.innerText == "true") {
                    return false;
                } else if(e.innerText == "false") {
                    return true;
                }
            }

            let updatedDog = {
                isGoodDog: changeGoodvalue()
            }
            e.innerText = updatedDog.isGoodDog
            fetch(`http://localhost:3000/pups/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body:  JSON.stringify(updatedDog)
            })
        }
    })
    //GOOD DOG FILTER BUTTON

   

})
//CREATE INNERHTML FOR EACH DOG AND RENDER TO THE SCREEN
fetch("http://localhost:3000/pups") 
.then( object => object.json())
.then( parsedObject => createDogs(parsedObject))

let renderDogDiv = function(obj) {
    const dogDiv = document.getElementById("dog-info");
    dogDiv.innerHTML = `<img src="${obj.image}">
                        <h2> ${obj.name} </h2>
                        <button class="good-boy" data-id="${obj.id}"> ${obj.isGoodDog} </button>`    
}

//CREATE DOGS AND MANIPULATE
let createDogs = function(obj) {
    obj.forEach(function(pup) {

        let dogBar = document.getElementById("dog-bar");
        let createDiv = document.createElement("div");
        createDiv.setAttribute("class", "pup-div")
        createDiv.setAttribute("data-id", `${pup.id}`)
        createDiv.innerHTML = `<span class="pup-name"> ${pup.name} </span>`
        dogBar.append(createDiv);
    })
}

