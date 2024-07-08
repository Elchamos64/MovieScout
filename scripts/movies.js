import { getMovieTitle } from './externalServices.mjs';
import { setLocalStorage, getLocalStorage } from './utils.mjs';

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

        const overview = document.createElement('p');
        overview.textContent = movie.overview;
        overview.className = "movie-overview";
        resultDiv.appendChild(overview);

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Release Date: ${new Date(movie.release_date).toDateString()}`;
        releaseDate.className = "release-date";
        resultDiv.appendChild(releaseDate);

        if (movie.poster_path) {
            const img = document.createElement('img');
            img.src = movie.poster_path;
            img.alt = movie.title;
            img.className = "movie-image";
            resultDiv.appendChild(img);
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'content-wrapper';

        const name = document.createElement('h4');
        name.textContent = movie.title;
        contentDiv.appendChild(name);
        
        const button = document.createElement('button');
        button.textContent = 'Watch Later';
        button.className = 'watch-later-button';
        button.addEventListener('click', () => {
            addToWatchLater(movie);
            saveToWatchLaterJSON(movie);
        });
        contentDiv.appendChild(button);

        resultDiv.appendChild(contentDiv);
        resultsDiv.appendChild(resultDiv);
    });
}

function addToWatchLater(movie) {
    const watchDisplay = document.querySelector('.watch-display');

    const watchItem = document.createElement('div');
    watchItem.className = 'watch-item';

    if (movie.poster_path) {
        const img = document.createElement('img');
        img.src = movie.poster_path;
        img.alt = movie.title;
        img.className = "movie-image";
        watchItem.appendChild(img);
    }

    const name = document.createElement('p');
    name.textContent = movie.title;
    watchItem.appendChild(name);

    watchDisplay.appendChild(watchItem);
}


function saveToWatchLaterJSON(movie) {
    let watchLaterMovies = getLocalStorage('watchLaterMovies') || [];
    watchLaterMovies.push(movie);
    setLocalStorage('watchLaterMovies', watchLaterMovies);
}