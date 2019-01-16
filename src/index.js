
document.addEventListener('DOMContentLoaded', function(){

const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const dogFilter = document.querySelector("#good-dog-filter")
dogFilter.dataset.value = "true;"
//debugger;
//i can play around , dont have to explicitly say console.log(dogBar.id) in file
const url =  "http://localhost:3000/pups/"
   // dogRender({
   //     "id": 1,
   //     "name": "Mr. Bonkers",
   //     "isGoodDog": true,
   //     "image": "https://weloveanimals.me/wp-content/uploads/2017/10/gettyimages-590486672-e1508512743796.jpg"

   //  });
   //console.log(dogBar)




//variables


 //fetches
      fetch(url)
        .then(function(response){
        return response.json();
     })
     .then(function(data){
        //console.log(data);
        data.forEach(dogSpan);
     })



//listeners go here

  dogBar.addEventListener("click", function(event){
    console.log(event);
    if (event.target.className === "dog-name"){
      //console.log(event.target)
    	fetch(`http://localhost:3000/pups/${event.target.dataset.id}`)
        .then(function(response){
          //console.log(response)
        return response.json();
     })
     .then(function(data){
      //console.log(data);
      dogInfo.innerHTML = "";
     dogRender(data);
     })

    }//if
  });
//could have looked at text, if string starts with good, make a true value
//put it into my object and then do patch


   dogInfo.addEventListener("click", function(event){

     if (event.target.className === "good-btn"){
          //console.log(event);
         let buttonVal = event.target.dataset.value
         var isTrueSet = buttonVal === "true";

        let opts = {
             isGoodDog: !isTrueSet
        }

       fetch(`http://localhost:3000/pups/${event.target.dataset.id}`,
        {
           method: "PATCH",
           headers: {
                      "Content-Type": "application/json",
                       "Accept": "application/json"
                     },
           body: JSON.stringify(opts)
         })

        .then(function(response){
          //console.log(response)
        return response.json();
     })
     .then(function(data){
      //console.log(data);
      dogInfo.innerHTML = "";
      dogRender(data);
     })

     }//end of if statement

  });

   dogFilter.addEventListener("click", function(event){

      let buttonVal = event.target.dataset.value

      var isTrueSet = buttonVal === "true";
      //console.log(event);
      //!isTrueSet;
      setButtonText(event.target)
       isTrueSet = !isTrueSet;
      //console.log(event);

       fetch(url)
        .then(function(response){
        return response.json();
     })
     .then(function(data){
        //console.log(data);
      let filtered = data.filter (function(element){
           return element.isGoodDog === isTrueSet

        });
      console.log(filtered);
       dogInfo.innerHTML = "";
       renderAllDogs(filtered);

     })

      //remove them all
      //only bring back the names when the isGoodDog === isTrueSet
      //if button is off show everything
      //if button is on, remove the off

   });

    function setButtonText(button) {
        if (button.dataset.value === "true") {
          button.dataset.value = "false";
          button.innerHTML = "Filter good dogs: OFF";
        }
        else if (button.dataset.value !== "true"){
          button.dataset.value = "true"
          button.innerHTML = "Filter good dogs: ON";
        }
        return button.innerHTML
      }
//functions go here
//create span that has all the info and append it to dog-bar div
//then create each one
//then go fetch ’em
//if that works, turn image and button displays to off
// => create an event listener that will turn them back on if you click
//dog has name, isGoodDog, image
//


   function dogSpan(pup){
     let dogSpan = document.createElement("span")
     //const dogName = document.createElement("h2");
      dogSpan.innerHTML = pup.name
      dogSpan.dataset.id = pup.id
      dogSpan.classList = "dog-name";
      dogSpan.style.fontSize = "15px";
      dogBar.append(dogSpan);
    }

  function dogRender (pup){
     //let dogSpan = document.createElement("span")

     //dogSpan.style.fontSize = "15px";
     //dogSpan.innerHTML = pup.name

     //dogInfo.style.display = "none";
      const dogName = document.createElement("h2");

      dogName.innerHTML = pup.name
      dogName.className = "name"
      const dogImage = document.createElement("img");
      dogImage.src = pup.image
      dogImage.style.width = "10 px";
      dogImage.style.height = "10 px";
      //dogImage.style.display = "show"
      dogImage.className = "image"

     const isGoodDog = document.createElement("button");
     isGoodDog.classList= "good-btn"
     isGoodDog.innerHTML = textButton(isGoodDog, pup);
     isGoodDog.dataset.id = pup.id

      //console.log(pup, 'pup')
      //could call it animal
     //textButton(isGoodDog, pup);

     //dogSpan.append(dogName)
     //dogInfo.innerHTML = "";
     dogInfo.append(dogImage, dogName, isGoodDog)
     //dogBar.append(dogSpan)
     ////console.dir gives you the methods
     //console.dir(dogInfo)
     return pup;
     }


        function textButton(button, animal) {
        if (animal.isGoodDog === true) {
          button.innerHTML = "Good Dog!"
          button.dataset.value = true;
        }
       else {
        button.innerHTML = "Bad Dog!"
        button.dataset.value = false;
       }
       return button.innerHTML;
     }

 function renderAllDogs(pups){
   return pups.map(function(element){
      dogRender(element);
   });
 }


 }); //end of DOM listener




