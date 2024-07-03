const baseURL = 'https://moviedatabase8.p.rapidapi.com/Search/';

export async function getMovieTitle(title) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e86e8140c8mshfc71593547f7089p1cf7fcjsn2394f5b630b7',
            'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(`${baseURL}${title}`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
