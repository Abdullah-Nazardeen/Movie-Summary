import { useState } from 'react';
import MovieSearchResult from '../../../components/MovieSearchResult';
import axios from "axios"

const AddMovieSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios(`https://www.omdbapi.com/?apikey=7b8f2bc4&s=${searchTerm}`)
      setMovies(res.data.Search)
    } catch (err) {
      console.log(err)
    }

  };

  return (
    <div className="p-4 bg-white min-h-screen text-gray-100">
      <div className="mb-4 flex flex-row justify-center items-center space-x-4">
          <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-full bg-gray-800 white shadow rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
          onClick={handleSearch} 
          className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200"
          >
          Search
          </button>
      </div>
      <div>
          {movies.map((movie) => (
          <MovieSearchResult key={movie.imdbID} movie={movie} />
          ))}
      </div>
    </div>

  );
};

export default AddMovieSummary;
