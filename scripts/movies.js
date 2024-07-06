import { getMovieTitle } from './externalServices.mjs';

document.getElementById('searchMovie').addEventListener('submit', async function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    try {
        const movies = await getMovieTitle(title);
        displayResults(movies);
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
});

function displayResults(movies) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (movies.length === 0) {
        resultsDiv.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';

        const name = document.createElement('h4');
        name.textContent = movie.title;
        resultDiv.appendChild(name);

        const overview = document.createElement('p');
        overview.textContent = movie.overview;
        resultDiv.appendChild(overview);

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Release Date: ${new Date(movie.release_date).toDateString()}`;
        resultDiv.appendChild(releaseDate);

        if (movie.poster_path) {
            const img = document.createElement('img');
            img.src = movie.poster_path;
            img.alt = movie.title;
            img.className = "movie-image"
            resultDiv.appendChild(img);
        }

        resultsDiv.appendChild(resultDiv);
    });
}
