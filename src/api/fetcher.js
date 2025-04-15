
export async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Fetching error:', response.status);
    }
    return response.json();
}
