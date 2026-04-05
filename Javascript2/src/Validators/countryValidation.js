export function validateCountriesMetadata(data) {
    if (!data || !data.countries) {
        throw new Error("Invalid countries metadata");
    }

    const countriesArray = Object.values(data.countries);

    return countriesArray.map((country) => ({
        name: country.name || "Unknown",
        capital: country.capital || "Unknown",
        region: country.region || "Unknown",
        slug: country.name.toLowerCase().replaceAll(" ", "-"),
    }));
}

export function validateCountry(country) {
    if (!country) {
        throw new Error("Invalid country data");
    }

    return {
        name: country.identity.names?.common || country.name || "Unknown",
        officialName: country.identity.names?.official || "Unknown",
        capital: country.government.capital?.value?.name?.string || "Unknown",
        region: country.identity.classification?.region || "Unknown",
        population: country.people_and_society.population?.value?.total?.number || 0,
        code: country.identity.iso?.alpha2 || "",
    };
}