let searchButton = document.getElementById("search-button");
const baseEndPoint = "https://api.nationalize.io/";
const nameEndPoint = `${baseEndPoint}?name=`;
const searchInput = document.getElementById("name-input");
const resultsPara = document.getElementById("results-para");
const resulstsContainer = document.getElementById("results-div");
const resultsList = document.getElementById("results-list");

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  //check if the input is empty
  if (searchInput.value.trim() === "") {
    resultsPara.textContent = "Please enter a name to search.";
    return;
  }
  console.log("Searching...");
  let searchName = searchInput.value;
  await apiCall(searchName);
});

async function apiCall(searchName) {
  console.log("Fetching data for:", searchName);
  try {
    const response = await fetch(nameEndPoint + searchName);
    const data = await response.json();
    console.log(data.country);
    //Display all the countries and their probabilities
    displayResults(searchName, data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    searchInput.value = "";
  }
}

function displayResults(searchName, data) {
  resultsPara.textContent = `${searchName} is most likely from the following countries:`;
  resultsList.innerHTML = "";

  data.country.forEach((country) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${getCountryName(country.country_id)} - ${(country.probability * 100).toFixed(0)}%`;
    resultsList.appendChild(listItem);
  });
}

function getCountryName(countrycode) {
  let countryName = new Intl.DisplayNames(["en"], { type: "region" });
  return countryName.of(countrycode);
}
