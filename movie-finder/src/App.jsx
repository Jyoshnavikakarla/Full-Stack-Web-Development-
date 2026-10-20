import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const API_KEY = 'Enter your API Key'; 

const MovieFinder = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  
  const searchMovies = (e) => {
    e.preventDefault();
    if (!query) {
      setMessage('Please enter a movie name');
      return;
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setMessage(data.results.length === 0 ? 'No movies found' : '');
        setQuery('');
      })
      .catch(() => {
        setMessage('Error fetching movies');
        setMovies([]);
      });
  };

  
  const handleMovieClick = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error('Error fetching movie details:', err);
    }
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ width: '100vw', height: '100vh', background: '#f4f7fb', overflow: 'hidden' }}
    >
      <div
        className="search-container d-flex flex-column align-items-center"
        style={{
          justifyContent: movies.length === 0 ? 'center' : 'flex-start',
          flexGrow: 0,
          transition: 'all 0.3s ease',
          paddingTop: movies.length === 0 ? '0' : '20px',
        }}
      >
        <div className='position-relative mb-4' style={{width:'100%',maxWidth:'1200px',margin:'0 auto'}}
        >
        <h1 className=" text-center m-0 "style={{fontSize:'4rem',fontWeight:'bold', marginTop:'40px'}}>🎬 Movie Finder</h1>
        
        </div>
        <form
          className="d-flex flex-column align-items-center mb-3"
          onSubmit={searchMovies}
        >
          <input
            type="text"
            placeholder="Enter movie name"
            className="form-control mb-3 w-100"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
          <button type="submit" className="btn btn-primary btn-lg">
            Search
          </button>
        </form>
        {message && <div className="text-danger mb-3">{message}</div>}
      </div>

      
      {movies.length > 0 && (
        <div
          className="d-flex flex-wrap justify-content-center movie-grid"
          style={{
            gap: '20px',
            overflowY: 'auto',
            flexGrow: 1,
            padding: '10px 20px',
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
          }}
        >
          {movies.map((movie) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/200x300?text=No+Image';
            return (
              <div
                key={movie.id}
                className="card"
                style={{
                  minWidth: '200px',
                  maxWidth: '250px',
                  flex: '1 1 200px',
                  cursor: 'pointer',
                }}
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={posterUrl}
                  className="card-img-top"
                  alt={movie.title}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body text-left p-2">
                  <h5 className="card-title" style={{ fontSize: '1rem' }}>
                    {movie.title}
                  </h5>
                  <p className="mb-1" style={{ fontSize: '0.85rem' }}>
                    <b>Year:</b> {movie.release_date?.slice(0, 4) || 'N/A'}
                  </p>
                  <p className="mb-1" style={{ fontSize: '0.85rem' }}>
                    <b>Rating:</b> {movie.vote_average}
                  </p>
                  <p className="mb-1" style={{ fontSize: '0.85rem' }}>
                    <b>Language:</b> {movie.original_language.toUpperCase()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      
      {selectedMovie && (
        <Modal show={true} onHide={() => setSelectedMovie(null)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-wrap">
            <img
              src={
                selectedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={selectedMovie.title}
              style={{
                width: '300px',
                height: '450px',
                objectFit: 'cover',
                marginRight: '20px',
                marginBottom: '20px',
              }}
            />
            <div style={{ maxWidth: 'calc(100% - 320px)' }}>
              <p><b>Release Date:</b> {selectedMovie.release_date || 'N/A'}</p>
              <p><b>Rating:</b> {selectedMovie.vote_average} ({selectedMovie.vote_count} votes)</p>
              <p><b>Genres:</b> {selectedMovie.genres.map(g => g.name).join(', ')}</p>
              <p><b>Language:</b> {selectedMovie.original_language.toUpperCase()}</p>
              <p><b>Popularity:</b> {selectedMovie.popularity}</p>
              <p><b>Overview:</b> {selectedMovie.overview || 'No description available.'}</p>
              {selectedMovie.videos?.results?.length > 0 && (
                <Button
                  variant="danger"
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${selectedMovie.videos.results[0].key}`,
                      '_blank'
                    )
                  }
                >
                  🎬 Watch Trailer
                </Button>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedMovie(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default MovieFinder;