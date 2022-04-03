const  textarea = document.querySelector('.search');
const  btn = document.querySelector('.btn');

btn.addEventListener('click', submitRequest);

function submitRequest() {
    let container = document.querySelector('.container'); //div father of card pokemon 
    container.classList.remove('none');//remove class 'none'of the div father 

    const resetValue = textarea.value.toLowerCase(); //value of textarea reset to to lower case
    BASE_URL_POKEMONS =`https://pokeapi.co/api/v2/pokemon/${resetValue}`;

    fetch(BASE_URL_POKEMONS)
    .then(response => response.json())
    .then(pokemons => {
        const resetPokemonsNameInCard = pokemons.name[0].toUpperCase() + pokemons.name.substr(1); //change first letter of pokemon name for to upper case

        const cardPokemons = container.innerHTML = `
        <div class="information-pokemon">
        <h1>${resetPokemonsNameInCard}</h1>
        <section id="alternative-image">
        <img src="https://cdn.traction.one/pokedex/pokemon/${pokemons.id}.png">
        </section>
        <div class="description">
        <h2>type:</h2>
        <h2>${pokemons.types[0].type.name}</h2>
        <h2 id="second-type-pokemon"></h2>
        </div>
        </div>`;

        if (pokemons.id >= 888) {
            imgAlternativePokemon();
        }

        if (pokemons.types.length == 2) {
            checkPokemonType();
        }

        function imgAlternativePokemon() {
            const divImage = document.querySelector('#alternative-image');
            const getNewImage = divImage.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemons.id}.png">` 
            return;
            //above id 800 images are missing from the PokéDex API, so I get sprites from BASE_URL_POKEMONS
        }

        function checkPokemonType() {
            const description = document.querySelector('#second-type-pokemon');
            const secondTypepokemon = description.innerHTML = ` ${pokemons.types[1].type.name}`
            return;
            //Check if there is more than one type in the array, if so add it to the html
        }
    })
    .catch(() => {
    if (resetValue === "") {
        messageErrorOne.classList.remove('none');
        container.classList.add('none');
        } else {
        messageErrorTwo.classList.remove('none');
        container.classList.add('none');
        }
        //custom errors 
    }) 
    const messageErrorOne = document.querySelector('.error-customs > .error-input-empty');
    messageErrorOne.classList.add('none');//hides the error message

    const messageErrorTwo = document.querySelector('.error-customs > .error-input-value-nonexistent');
    messageErrorTwo.classList.add('none');//hides the error message
    return;
}

function mapKeyEnter(event) {
    if(event.keyCode === 13 ){
        submitRequest();
        return;
    }
}

document.addEventListener('keyup', mapKeyEnter);
