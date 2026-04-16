import { getCountryBySlug } from "../api/countriesApi";

const data = await getCountryBySlug

const formatted = {
    name: data.name,
}