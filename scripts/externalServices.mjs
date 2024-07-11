const baseURL = 'https://moviedatabase8.p.rapidapi.com/';

export async function getMovieTitle(title) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e86e8140c8mshfc71593547f7089p1cf7fcjsn2394f5b630b7',
            'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(`${baseURL}Search/${title}`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result.map(movie => ({
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average // Ensure this key is available in the API response
        }));
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function getTopRatedMovies() {
    const url = 'https://moviedatabase8.p.rapidapi.com/Filter?MinRating=8.0';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e86e8140c8mshfc71593547f7089p1cf7fcjsn2394f5b630b7',
            'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (!result || !Array.isArray(result)) {
            throw new Error('Unexpected response format');
        }
        return result.map(movie => ({
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average
        }));
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
} 