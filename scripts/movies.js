import { getMovieTitle, getTopRatedMovies, getTopActionMovies, getTopRomanceMovies } from './externalServices.mjs';
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
        // displayRecentRelease(topRatedMovies);
        loadWatchLaterList(); // Load the watch later list when the page loads
    } catch (error) {
        console.error('Error fetching top-rated movies:', error);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const RecentReleaseMovies = await getTopActionMovies();
        displayRecentRelease(RecentReleaseMovies);
        loadWatchLaterList(); // Load the watch later list when the page loads
    } catch (error) {
        console.error('Error fetching top-rated movies:', error);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const RomanceMovies = await getTopRomanceMovies();
        displayRomanceMovies(RomanceMovies);
        loadWatchLaterList(); // Load the watch later list when the page loads
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

        const name = document.createElement('h4');
        name.textContent = movie.title;
        resultDiv.appendChild(name);
        
        const button = document.createElement('button');
        button.textContent = 'Watch Later';
        button.className = 'watch-later-button';
        button.addEventListener('click', () => {
            addToWatchLater(movie);
        });
        resultDiv.appendChild(button);

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

    // Sort the movies by vote average in descending order
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

function displayRecentRelease(movies) {
    const recentDisplayDiv = document.querySelector('.recent-display');
    recentDisplayDiv.innerHTML = ''; // Clear any existing content
    
    if (movies.length === 0) {
        recentDisplayDiv.innerHTML = '<p>No recent releases found.</p>';
        return;
    }
    

    const filteredMovie =  movies.sort((a, b) => b.vote_average - a.vote_average);

    // Sort movies by release date in descending order
    // filteredMovie.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    
    // Display up to the top 20 most recent movies
    const moviesToDisplay = filteredMovie.slice(0, 20);
    
    moviesToDisplay.forEach(movie => {
        const recentReleaseMovieDiv = document.createElement('div');
        recentReleaseMovieDiv.className = 'recent-release-movie';
    
        if (movie.poster_path) {
            const img = document.createElement('img');
            img.src = movie.poster_path;
            img.alt = movie.title;
            recentReleaseMovieDiv.appendChild(img);
        }
    
        const name = document.createElement('p');
        name.textContent = movie.title;
        name.className = 'recent-release-title';
        recentReleaseMovieDiv.appendChild(name);
    
        const rating = document.createElement('p');
        rating.textContent = `${movie.vote_average.toFixed(1)}`;
        rating.className = 'recent-release-rating';
        recentReleaseMovieDiv.appendChild(rating);
    
        recentDisplayDiv.appendChild(recentReleaseMovieDiv);
    });
}

function displayRomanceMovies(movies) {
    const recentDisplayDiv = document.querySelector('.romance-display');
    recentDisplayDiv.innerHTML = ''; // Clear any existing content
    
    if (movies.length === 0) {
        recentDisplayDiv.innerHTML = '<p>No recent releases found.</p>';
        return;
    }
    

    const filteredMovie =  movies.sort((a, b) => b.vote_average - a.vote_average);

    // Sort movies by release date in descending order
    // filteredMovie.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    
    // Display up to the top 20 most recent movies
    const moviesToDisplay = filteredMovie.slice(0, 20);
    
    moviesToDisplay.forEach(movie => {
        const recentReleaseMovieDiv = document.createElement('div');
        recentReleaseMovieDiv.className = 'romance-movie';
    
        if (movie.poster_path) {
            const img = document.createElement('img');
            img.src = movie.poster_path;
            img.alt = movie.title;
            recentReleaseMovieDiv.appendChild(img);
        }
    
        const name = document.createElement('p');
        name.textContent = movie.title;
        name.className = 'romance-title';
        recentReleaseMovieDiv.appendChild(name);
    
        const rating = document.createElement('p');
        rating.textContent = `${movie.vote_average.toFixed(1)}`;
        rating.className = 'romance-rating';
        recentReleaseMovieDiv.appendChild(rating);
    
        recentDisplayDiv.appendChild(recentReleaseMovieDiv);
    });
}

function addToWatchLater(movie) {
    const watchLaterMovies = getLocalStorage('watchLaterMovies') || [];
    watchLaterMovies.push(movie);
    setLocalStorage('watchLaterMovies', watchLaterMovies);
    loadWatchLaterList(); // Update the display after adding a movie
}

function loadWatchLaterList() {
    const watchLaterMovies = getLocalStorage('watchLaterMovies') || [];
    const watchDisplay = document.querySelector('.watch-display');
    watchDisplay.innerHTML = ''; // Clear any existing content

    watchLaterMovies.forEach(movie => {
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
    });
}


