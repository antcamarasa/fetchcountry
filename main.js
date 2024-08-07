
// Selection des éléments HTML
const container = document.getElementById("container");
const input = document.getElementById("country-input");
const btn = document.getElementById("submit-button");


// Stocker les données
let countriesData = [];

// Fonction pour récupérer les données d'un pays
const fetchCountryData = (country) => {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            countriesData = [...countriesData, ...data];
            printCountry(countriesData);
        })
}


// fonction pour afficher les pays
const printCountry = (countriesData) => {
    container.innerHTML = ''; // Efface tout contenu précédent
    countriesData.forEach((country, index) => {
        const countryElement = document.createElement("div");
        countryElement.className = 'country-card';

        // Crée et ajoute les éléments de texte
        const nameElement = document.createElement("p");
        nameElement.textContent = country.name.common;
        const flagElement = document.createElement("p");
        flagElement.textContent = country.flag;

        // Crée et configure le bouton de suppression
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", () => deleteCountry(index));

        // Ajoute les éléments au div de la carte pays
        countryElement.appendChild(nameElement);
        countryElement.appendChild(flagElement);
        countryElement.appendChild(deleteButton);

        // Ajoute la carte pays au conteneur principal
        container.appendChild(countryElement);
    })
}


// Gestionnaire d'événements pour le bouton d'ajout de pays
btn.addEventListener("click", () => {
    const countryName = input.value.trim();
    if(countryName) {
        fetchCountryData(countryName)
    }
});

// Gestionnaire d'événements pour le bouton suppression de pays
const deleteCountry = (index) => {
    console.log(index)
    countriesData.splice(index, 1);
    printCountry(countriesData);
}

// Gestionnaire d'événements pour la touche Entrée
input.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        const countryName = input.value.trim();
        if(countryName) {
            fetchCountryData(countryName);
        }
    }
})