// api.ts q será consumida

export const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
}

export const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}

const BASE_URL = 'https://www.theaudiodb.com/api/v1/json/2';
export async function getArtista(nome: string) {
    const response = await fetch(`${BASE_URL}/search.php?s=${nome}`);
    const data = await response.json();
    return data.artists ? data.artists[0] : null;
}