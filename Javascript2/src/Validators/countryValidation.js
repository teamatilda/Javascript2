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
    code: country.code.iso2.toLowerCase() || "",
    type: country.type,
    population: country.population,
  }));
}

export function validateCountry(country) {
  if (!country) {
    throw new Error("Invalid country data");
  }

  const safe = (value, fallback = "Unknown") => value ?? fallback;

  const identity = country.identity || {};
  const government = country.government || {};
  const geo = country.geography || {};
  const society = country.people_and_society || {};

  const rawPopulation = society.population?.value?.total?.number ?? 0;
  const coordinates = government.capital?.value?.coordinates;

  return {
    name: identity.names?.common || country.name || "Unknown",
    officialName: safe(identity.names?.official),
    capital: safe(government.capital?.value?.name?.string),
    region: safe(identity.classification?.region),

    population: formatPopulation(rawPopulation),
    code: identity.iso?.alpha2?.toLowerCase() || "xx",
    currency: safe(identity.currency?.name),

    languages: formatLanguages(society.languages?.value),

    background: safe(country.introduction?.background?.value?.string),

    area: geo.area?.value?.total
      ? `${geo.area.value.total.measurement} ${geo.area.value.total.unit}`
      : "Unknown",

    climate: safe(geo.climate?.value?.string),
    terrain: safe(geo.terrain?.value?.string),

    ethnicity: safe(society.ethnic_groups?.value?.label),
    religion: safe(society.religions?.value?.note),

    economy: safe(country.economy?.overview?.value?.string),
    government: safe(government.government_type?.value?.string),
    holiday: safe(government.national_holiday?.value?.string),

    lat: government?.capital?.value?.coordinates?.latitude ?? null,
    lon: government?.capital?.value?.coordinates?.longitude ?? null,
  };

  function formatPopulation(pop) {
    if (pop >= 1_000_000) {
      return `${(pop / 1_000_000).toFixed(1)} million`;
    }
    return pop;
  }

  function formatLanguages(langs) {
    if (!langs) return "N/A";

    return langs
      .filter((lang) => lang.label !== "Other")
      .map((lang) => lang.label)
      .join(", ");
  }
}
