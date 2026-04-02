import { validateCountriesMetadata, validateCountry } from "../Validators/countryValidation";

const BASE_URL = "https://countries.altoal.com/api/v1";

export async function getAllCountries() {
    const response = await fetch(`${BASE_URL}/metadata.json`);

    if (!response.ok) {
        throw new Error("Failed to fetch countries metadata");
    }

    const data = await response.json();

    // Sends raw data to validator
    return validateCountriesMetadata(data);
}

export async function getCountryBySlug(slug) {
    const response = await fetch(`${BASE_URL}/name/${slug}.json`);

    if (!response.ok) {
        throw new Error("Failed to fetch country");
    }

    const data = await response.json();
    
    return ValidateCountry(data.data);
}