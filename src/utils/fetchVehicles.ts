import { Vehicle } from "types";

const GRAPHQL_ENDPOINT = 'https://vortex.korabli.su/api/graphql/glossary/';

const VEHICLES_QUERY = `
  query Vehicles($languageCode: String) {
    vehicles(lang: $languageCode) {
      title
      description
      icons {
        large
      }
      level
      type {
        title
      }
      nation {
        title
        color
      }
    }
  }
`;

interface GraphQLError {
  message: string;
}

interface GraphQLResponse {
  data: {
    vehicles: Vehicle[];
  };
  errors?: GraphQLError[];
}

export const fetchVehicles = async (languageCode = 'ru'): Promise<Vehicle[]> => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: VEHICLES_QUERY,
      variables: { languageCode},
    }),
  });

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.statusText}`);
  }

  const { data, errors }: GraphQLResponse = await response.json();

  if (errors) {
    throw new Error(`GraphQL ошибки: ${errors.map((e) => e.message).join(', ')}`);
  }

  return data.vehicles || [];
};
