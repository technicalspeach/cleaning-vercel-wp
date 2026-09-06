export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, any> = {},
  headers: Record<string, string> = {}
): Promise<T> {
  const url = "http://cleaningxpert.local";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 1 },
    });

    // Pehle text format mein check karenge taake HTML page aane par crash na ho
    const textData = await res.text();
    
    if (!textData.trim().startsWith("{")) {
      console.warn("WordPress returned HTML instead of JSON. Bypassing request.");
      return {} as T;
    }

    const json = JSON.parse(textData);

    if (json.errors) {
      console.warn("GraphQL Warnings/Errors bypassed:", json.errors);
    }

    return (json.data || {}) as T;

  } catch (error) {
    console.error("Network or Fetch Error:", error);
    return {} as T;
  }
}
