const searchButton = document.querySelector("#search-btn");
const countryInp = document.querySelector("#country-inp");
const result = document.querySelector("#result");

// Fetch and display country data
const fetchCountryData = async (countryName) => {
  const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Invalid country name");
    }

    const data = await response.json();
    displayCountryData(data[0]);
  } catch (error) {
    displayError(
      countryName.length === 0
        ? "Input field cannot be empty"
        : "Please enter a valid country name"
    );
  }
};

// Display country data in the result container
const displayCountryData = (country) => {
  const {
    flags,
    name,
    capital,
    continents,
    population,
    currencies,
    languages,
  } = country;

  result.innerHTML = `
    <img src="${flags.svg}" class="flag-img" alt="Flag of ${name.common}">
    <h2>${name.common}</h2>
    <div class="data-wrapper">
        <h4>Capital:</h4>
        <span>${capital?.[0] || "N/A"}</span>
    </div>
    <div class="data-wrapper">
        <h4>Continent:</h4>
        <span>${continents?.[0] || "N/A"}</span>
    </div>
    <div class="data-wrapper">
        <h4>Population:</h4>
        <span>${population.toLocaleString() || "N/A"}</span>
    </div>
    <div class="data-wrapper">
        <h4>Currency:</h4>
        <span>${currencies ? Object.values(currencies)[0]?.name : "N/A"} (${
    Object.keys(currencies)?.[0] || "N/A"
  })</span>
    </div>
    <div class="data-wrapper">
        <h4>Languages:</h4>
        <span>${languages ? Object.values(languages).join(", ") : "N/A"}</span>
    </div>
  `;
};

// Display error message in the result container
const displayError = (message) => {
  result.innerHTML = `<h3>${message}</h3>`;
};

// Shared search functionality
const handleSearch = () => {
  const countryName = countryInp.value.trim();
  fetchCountryData(countryName);
  countryInp.value = "";
};

// Event listeners for button and input field
searchButton.addEventListener("click", handleSearch);

countryInp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
    countryInp.value = "";
  }
});
