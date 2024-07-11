import { getMovieTitle, getTopRatedMovies } from './externalServices.mjs';
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

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const topRatedMovies = await getTopRatedMovies();
        displayTopRatedMovies(topRatedMovies);
    } catch (error) {
        console.error('Error fetching top-rated movies:', error);
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

function displayTopRatedMovies(movies) {
    const topRatedMoviesDiv = document.querySelector('.top-rated-display');
    topRatedMoviesDiv.innerHTML = ''; // Clear any existing content
    
    if (movies.length === 0) {
        topRatedMoviesDiv.innerHTML = '<p>No top-rated movies found.</p>';
        return;
    }
    
    // Sort movies by vote_average in descending order
    movies.sort((a, b) => b.vote_average - a.vote_average);
    
    // Display up to the top 20 highest-rated movies
    const moviesToDisplay = movies.slice(0, 20);
    
    moviesToDisplay.forEach(movie => {
        const topRatedMovieDiv = document.createElement('div');
        topRatedMovieDiv.className = 'top-rated-movie';
    
        if (movie.poster_path) {
            const img = document.createElement('img');
            img.src = movie.poster_path;
            img.alt = movie.title;
            topRatedMovieDiv.appendChild(img);
        }
    
        const name = document.createElement('p');
        name.textContent = movie.title;
        name.className = 'top-rated-title';
        topRatedMovieDiv.appendChild(name);
    
        const rating = document.createElement('p');
        rating.textContent = `${movie.vote_average.toFixed(1)}`;
        rating.className = 'top-rated-rating';
        topRatedMovieDiv.appendChild(rating);
    
        topRatedMoviesDiv.appendChild(topRatedMovieDiv);
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
