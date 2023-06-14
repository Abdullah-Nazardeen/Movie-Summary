import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieSummary from '../../../components/ManageSummary';
import { apiServer } from '../../../config';

const ManageMovieSummaries = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async (searchTerm) => {
    let url = `${apiServer}/api/movies`;
    if(searchTerm){
      url += `/search?s=${searchTerm}`;
    }
    const res = await axios(url);
    setMovies(res.data)
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    fetchMovies(searchTerm);
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
          <MovieSummary key={movie.id} movie={movie} refreshMovies={(term) => fetchMovies(term)} />
        ))}
      </div>
    </div>
  );
};

export default ManageMovieSummaries;

