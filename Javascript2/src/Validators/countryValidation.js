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

    const rawPopulation = country.people_and_society?.population?.value?.total?.number || 0;
    const coordinates = country.government?.capital?.value?.coordinates;

    return {
        name: country.identity.names?.common || country.name || "Unknown",
        officialName: country.identity.names?.official || "Unknown",
        capital: country.government.capital?.value?.name?.string || "Unknown",
        region: country.identity.classification?.region || "Unknown",
        population: rawPopulation >= 1_000_000? `${(rawPopulation / 1_000_000).toFixed(1)} million`
        : rawPopulation,
        code: country.identity?.iso?.alpha2?.toLowerCase() || "xx",
        currency: country.identity.currency?.name || "Unknown",
        languages: country.people_and_society?.languages?.value? country.people_and_society.languages.value
        .filter(lang => lang.label !== "Other")
        .map(lang => lang.label)
        .join(", ") : "N/A",
        background: country.introduction?.background?.value?.string || "Unknown",
        lat: coordinates?.latitude ?? null,
        lon: coordinates?.longitude ?? null,
    };
}