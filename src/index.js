document.addEventListener("DOMContentLoaded", () => {

    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(data => {
        data.forEach(dog => makeDoggo(dog))
    })
    
    function makeDoggo(dog) {
        const doggo = document.createElement("span");
        const dogBar = document.querySelector("#dog-bar");
        doggo.innerText = dog.name;
        doggo.addEventListener("click", (e) => showDoggoInfo(dog));
        dogBar.appendChild(doggo);
    }

    function showDoggoInfo(dog) {
        const dogInfo = document.querySelector("#dog-info");
        let dogGood = "Bad Dog!";
        if (dog.isGoodDog) {
            dogGood = "Good Dog!";
        }
        
        dogInfo.innerHTML = `
        <img src="${dog.image}" />
        <h2>${dog.name}</h2>
        <button id="dogButton">${dogGood}</button>
        `
        const dogButton = dogInfo.querySelector("#dogButton");
        dogButton.addEventListener("click", () => {
            if (dogButton.innerText === "Bad Dog!") {
                dogButton.innerText = "Good Dog!";
                dog.isGoodDog = true;
            }
            else {
                dogButton.innerText = "Bad Dog!";
                dog.isGoodDog = false;
            }

            fetch(`http://localhost:3000/pups/${dog.id}`,{
                method: `PATCH`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dog)
            })

        })
    }

    const dogFilter = document.querySelector("#good-dog-filter");
    dogFilter.addEventListener("click", e => {
        if (dogFilter.innerText === "Filter good dogs: OFF") {
            dogFilter.innerText = "Filter good dogs: ON"
            const dogBar = document.querySelector("#dog-bar");
            dogBar.innerHTML = ``;
            fetch("http://localhost:3000/pups")
            .then(resp => resp.json())
            .then(data => {
            data.forEach(dog => {
                if (dog.isGoodDog) {
                makeDoggo(dog)
            }
        })
        })
        }
        else {
            dogFilter.innerText = "Filter good dogs: OFF";
            const dogBar = document.querySelector("#dog-bar");
            dogBar.innerHTML = ``;
            fetch("http://localhost:3000/pups")
            .then(resp => resp.json())
            .then(data => {
                data.forEach(dog => makeDoggo(dog))
            })
        }
        
    })
    

})