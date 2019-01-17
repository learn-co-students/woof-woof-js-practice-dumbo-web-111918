document.addEventListener('DOMContentLoaded', () =>{
    let dogBarDiv = document.getElementById("dog-bar")
    let dogSpan = document.getElementsByTagName('span');
    let dogInfoDiv = document.getElementById('dog-info');
 
    //get all dogs 
    fetch('http://localhost:3000/pups')
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // console.log(data)
        data.forEach((el)=>{
            renderDogSpan(el)
        })
    })
    dogBarDiv.addEventListener('click', fetchDogShowInfo);
    dogInfoDiv.addEventListener('click', toggleGoodDog)
})

function renderDogSpan (dogJson) {
    let dogBarDiv = document.getElementById("dog-bar");
    let dogSpan = document.createElement('span');
    dogSpan.innerText = dogJson.name;
    dogSpan.dataset.id = dogJson.id;
    dogSpan.className = 'dog-span'
    //append span to div
    dogBarDiv.appendChild(dogSpan);
}

function fetchDogShowInfo (event){
    // console.log(event.target)
    if (event.target.className === 'dog-span'){
        let id = event.target.dataset.id 
        // console.log(id)
        fetch(`http://localhost:3000/pups/${id}`)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            // console.log(data)
            renderDogInfoOnDiv(data)
        })
    }
}

function renderDogInfoOnDiv (dogObj) {
    let dogInfoDiv = document.getElementById('dog-info');
    dogInfoDiv.dataset.id = dogObj.id
    //reset the Div each time so that on each click the Div is cleared and new info will be posted on DOM
    dogInfoDiv.innerHTML = '';
    //create h2
    let dogHeader = document.createElement('h2');
    dogHeader.innerText = dogObj.name;

    //create img element
    let dogImg = document.createElement('img');
    dogImg.src = dogObj.image;
    
    //create a button
    let dogButton = document.createElement('button');
    dogButton.className = 'dog-btn'
    dogButton.innerText = dogObj.isGoodDog ? dogButton.innerText = "Good Dog!" : dogButton.innerText = "Bad Dog!"

    dogInfoDiv.append(dogHeader, dogImg, dogButton)
    //appendChild will not work "?" 
}

//TODO TOGGLE GOOD DOG
function toggleGoodDog (event) {
    if(event.target.className === 'dog-btn') {
        let id = event.target.parentNode.dataset.id
        let dogButtonText = event.target.innerText
        // console.log(dogButtonText, id)
        let changeVal;
        if(dogButtonText.includes('Good')) {
            dogButtonText = 'Bad Dog!'
            changeVal = false;
        }else{
            dogButtonText = "Good Dog!";
            changeVal = true;
        }

        //make a patch request to change the isGoodDog from True/false
        fetch(`http://localhost:3000/pups/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                isGoodDog:changeVal
            })
        }).then ((res)=>{
                return res.json();
            }).then((data)=>{
            //pessimistic rendering (changes the db first and rerender all to DOM)
            // console.log(data)
                return renderDogInfoOnDiv(data)
            })
    }
}

//TO DO BONUS! STEP 5: FILTER GOOD DOGS