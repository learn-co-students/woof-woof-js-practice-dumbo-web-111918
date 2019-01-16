document.addEventListener("DOMContentLoaded", function() {

const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");

//--------------Get Dog-----------------

fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(data => renderData(data))

  function makePupBar(pup) {
    let pupSpan = document.createElement("span");
    pupSpan.dataset.id = pup.id;
    pupSpan.setAttribute("class", "pup-span")
    pupSpan.innerText = pup.name;
    return pupSpan;
  }

  function renderData(pups){
    pups.forEach(pup => {
      dogBar.append(makePupBar(pup));
    })
  }

  //-----------Show Dog----------------

  dogBar.addEventListener("click", (e) => {
    if(e.target.className.includes("pup-span")){

      fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
        .then(res => res.json())
        .then(data => renderPup(data))
    }
  });

  function renderPup(pup) {
    const pupImage = document.createElement("img");
    pupImage.src = pup.image;

    const pupName = document.createElement("h2")
    pupName.innerText = pup.name;

    dogInfo.innerHTML = " ";
    dogInfo.append(pupImage, pupName);
    dogInfo.append(dogTypeButton(pup));

  }

  //------------Dog Button---------------

  function dogTypeButton(pup) {
    const dogTypeButton = document.createElement("button");
    dogTypeButton.setAttribute("class", "btn");
    dogTypeButton.dataset.id = pup.id;
    dogTypeButton.dataset.isGoodDog = pup.isGoodDog;

    if(pup.isGoodDog){
      dogTypeButton.innerText = "Good Dog!";
    }
    else {
      dogTypeButton.innerText = "Bad Dog!";
    }
    return dogTypeButton;
  }

  dogInfo.addEventListener("click", (e) => {
    if(e.target.className.includes('btn')){

      if(e.target.innerText === "Good Dog!"){
        e.target.innerText = "Bad Dog!";
        e.target.dataset.isGoodDog = false;
      }
      else {
        e.target.innerText = "Good Dog!";
        e.target.dataset.isGoodDog = true;
      }

      let toggle = e.target.dataset.isGoodDog;
      console.log(toggle);
        const option = {
            method: "PATCH",
            headers:{
                "Content-Type" : "application/json"
              },
            body:JSON.stringify({isGoodDog: toggle})
        }

        fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, option)
          .then(res => res.json())
          .then(data => console.log(data))
   }
  });
});
