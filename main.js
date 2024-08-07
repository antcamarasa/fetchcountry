
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
            console.log(data)
            printCountry(data);
        })
}


// fonction pour afficher les pays
const printCountry = (countriesData) => {

    countriesData.forEach(country => {
        const countryElement = document.createElement("div");
        countryElement.classList = 'country-card';
        countryElement.innerHTML = `<p>${country.name.common}</p><p>${country.flag}</p>`
        container.appendChild(countryElement);

        // Gestion de la liste via un crud
        countriesData.push(countryElement);
    })
}

// Gestionnaire d'événements pour le bouton
btn.addEventListener("click", () => {
    const countryName = input.value.trim();

    if(countryName) {
        fetchCountryData(countryName)
    }
});


// Gestionnaire d'événements pour la touche Entrée
input.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        const countryName = input.value.trim();
        if(countryName) {
            fetchCountryData(countryName);
        }
    }
})