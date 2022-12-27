const textarea = document.querySelector('.search');
textarea.addEventListener('keyup', shrinkArrayByFiveSpaces);

const containerErrorsCustoms = document.querySelector('.error-custom'); //container custom error 

textarea.addEventListener('click', () => {
    containerErrorsCustoms.classList.add('none');
}) //always that textarea recive a click, the message of erros it is hide
/******************* section get elements dynamics errors *********************************/

/******************* section get elements of form search *********************************/
const li = document.querySelectorAll('.all-li'); //li of suggestions

const btn = document.querySelector('.btn');
btn.addEventListener('click', submitRequest);

const ul = document.querySelector('.sugestions');
document.addEventListener('click', () => {
    ul.classList.add('none');
});

/******************* section verify value of input search *********************************/
let firstArr = []; //first array, recive all pokemons names for dynamic sugestions sugestions   

function shrinkArrayByFiveSpaces() {
    ul.classList.remove('none');

    const filterArr = firstArr.filter(oldArr => oldArr.includes(`${textarea.value}`)); //compares the values of the textarea with those of the suggestions array
    let sencondArr = []; //array with five names for dynamics suggestions

    function changeUlForFiveSpaces() {
        for (let n = 0; n <= 4; n++) {
            let sencondArrFiveSpaces = filterArr[n];

            sencondArr.push(sencondArrFiveSpaces);

            if (textarea.value == '') ul.classList.add('none');

            if (typeof sencondArrFiveSpaces !== "string" || sencondArrFiveSpaces === '' || sencondArrFiveSpaces === ' ') {
                li[n].classList.add('none');
                //check that the values are as expected
            }
            
            if (typeof sencondArrFiveSpaces === "string") {
                li[n].classList.remove('none');
            }

            li[n].innerText = `${sencondArrFiveSpaces}`; //puts values in the li

            li[n].addEventListener('click', () => {
                textarea.value = `${sencondArrFiveSpaces}`;
                ul.classList.add('none');
            }); //when you click on li it add value in the input search
        }   
    }
    changeUlForFiveSpaces();
}

/************************ section make request the names of pokemons in the API ****************************************/
function requestNamesPokemons() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=899&offset=01")
    .then(res => res.json())
    .then((res) => {
        for (let i = 1; i <= 898; i++) {
            let reciveNames =  res.results[i].name;
            firstArr.push(reciveNames); 
        }        
    })
    .catch();
}
requestNamesPokemons(); //this function takes the name of the pokemons for dynamics sugestions

/************************* make request about informations pokemons on API ************************************/
const elementSonOfContainerCardPokemons = document.querySelector('.information-pokemon');
elementSonOfContainerCardPokemons.classList.add('none'); //remove class 'none' of the div father 

function submitRequest() {
    containerErrorsCustoms.classList.add('none');

    const resetValueTextarea = textarea.value.toLowerCase(); //value of textarea reset for to lower case

    BASE_URL_POKEMONS =`https://pokeapi.co/api/v2/pokemon/${resetValueTextarea}`;

    fetch(BASE_URL_POKEMONS)
    .then(response => response.json())
    .then(pokemons => {
        const elementSonOfContainerCardPokemons = document.querySelector('.information-pokemon');
        elementSonOfContainerCardPokemons.classList.remove('none'); //remove class 'none' of the div father 
    

        const resetPokemonsNameInCard = pokemons.name[0].toUpperCase() + pokemons.name.substr(1); //change first letter of pokemon name for to upper case

        const cardPokemons = innerHTML = `
        <h1>${resetPokemonsNameInCard}</h1>
        <section id="alternative-image">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemons.id}.png">
        </section>
        <div class="description">
            <h5>Type: <span>${pokemons.types[0].type.name}</span>, <span>${verifyLengthArrayTypesPokemons()}</span></h5>
            <h5>Abilities: <span>${pokemons.abilities[0].ability.name}</span>, <span>${verifyLengthArrayAbilitiesPokemons()}</span></h5>
        </div>`;

        elementSonOfContainerCardPokemons.innerHTML = cardPokemons; 

        function verifyLengthArrayTypesPokemons() {
            if (pokemons.types.length > 1) {
                return ` ${pokemons.types[1].type.name}`;
            } else {
                return '';
            }
        }

        function verifyLengthArrayAbilitiesPokemons() {
            if (pokemons.abilities.length > 1) {
                return ` ${pokemons.abilities[1].ability.name}`;
            } else {
                return '';
            }
        }
    })
    .catch((error) => {
        const elementMessageErrorOne = document.querySelector('.error-custom > .error-pokemon-null');
        containerErrorsCustoms.classList.remove('none');
        elementMessageErrorOne.classList.remove('none');
        elementSonOfContainerCardPokemons.classList.add('none');
    }) 
}

/******************* section select suggestion of input for key *********************************/
let numberHoverSugestion = -1; //selector start number 
let maxSugestions = 4; //maximum selector number 


function selectorHoverSugestionUp(keyUp) {
    if (keyUp.keyCode === 38) {
        numberHoverSugestion--

        if (numberHoverSugestion < 0) 
            numberHoverSugestion = maxSugestions;

        for (let n = 0; n <= 4; n++) {

            if(li[n].classList.contains('none') == false) maxSugestions = n; 

            let valueLi = li[n].value;

            if (numberHoverSugestion === valueLi) li[n].classList.add('checked');

            if (numberHoverSugestion !== valueLi) li[n].classList.remove('checked');
        }
    }    
}

//this function directs the selector up
//in the Li there are values from 0 to 4, when numberHoverSugestion is equal to this value it gets the checked class which makes its background gray
textarea.addEventListener('keyup', selectorHoverSugestionUp)

function selectorHoverSugestionDown(keyDown) {
    if (keyDown.keyCode === 40) {
        numberHoverSugestion++

        if (numberHoverSugestion > maxSugestions)
            numberHoverSugestion = 0;

        for (let n = 0; n <= 4; n++) {
            if (li[n].classList.contains('none') == false) maxSugestions = n;

            let valueLi = li[n].value;
            
            li[n].classList.add('checked');

            if (numberHoverSugestion !== valueLi) li[n].classList.remove('checked'); 
        }
    }
}


//this function directs the selector down
//in the Li there are values from 0 to 4, when numberHoverSugestion is equal to this value it gets the checked class which makes its background gray
textarea.addEventListener('keyup', selectorHoverSugestionDown);

function selectHoverSugestion(keyEnter) {
    if (keyEnter.keyCode === 13 ) {
        if(textarea.value == "")
         numberHoverSugestion = -1;

        if (numberHoverSugestion === -1) {
            submitRequest() 
            //if numberHoverSugestion === -1 it means that the user did not use the keyboard selector, so the request is made by default
        } 
        
        if (numberHoverSugestion !== -1) {
            const filterArr = firstArr.filter(oldArr => oldArr.includes(`${textarea.value}`));
            let sencondArr = [];

            for (let n = 0; n <= 4; n++) {
                let sencondArrFiveSpaces = filterArr[n];

                sencondArr.push(sencondArrFiveSpaces);

                textarea.value = `${sencondArr[numberHoverSugestion]}`;

                ul.classList.add('none');
                //if numberHoverSugestion !== -1 means that the user used the selector via keyboard, now the array is handled so that only the name that was clicked on is fetched from the API 
            }
            submitRequest();
        }
    }
}
document.addEventListener('keyup', selectHoverSugestion);