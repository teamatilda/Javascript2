export function validateCountriesMetadata(data) {
    if (!data || !data.countries) {
        throw new Error("Invalid countries metadata");
    }

    const countriesArray = Object.values(data.countries);

    return countriesArray.map((country) => ({
        slug: country.slug,
        name: country.names?.common || "Unknown",
    }));
}

export function validateCountry(country) {
    if (!country || !country.metadata) {
        throw new Error("Invalid country data");
    }

    const metadata = country.metadata;

    return {
        name: metadata.names?.common || "Unknown",
        officialName: metadata.names?.official || "Unknown",
        capital: metadata.capital?.[0] || "Unknown",
        region: metadata.region || "Unknown",
        population: metadata.population || 0,
    };
}