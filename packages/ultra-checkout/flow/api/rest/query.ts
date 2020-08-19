interface QueryParams {
  endpoint: string;
  method: string;
  body?: object;
  query?: string;
}
export const query = async ({
  endpoint,
  method = 'GET',
  query,
  body,
}: QueryParams) => {
  const url = !query
    ? `http://localhost:3000/api/${endpoint}`
    : `http://localhost:3000/api/${endpoint}?${query}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return res.json();
};
