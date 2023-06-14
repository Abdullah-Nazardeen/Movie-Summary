import { useState } from 'react';
import axios from 'axios';
import { apiServer } from '../config';

const MovieSummary = ({ movie, refreshMovies}) => {
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState(movie.summary);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiServer}/api/movies/movie/${movie.id}`);
      refreshMovies();
    } catch (err) {
      console.log(err)
    }

  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${apiServer}/api/movies/movie/${movie.id}`, { summary: summary });
      setShowModal(false);
      refreshMovies();
    } catch (err) {
      console.log(err)
    }

  };

  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <h2 className="font-bold text-xl text-black">{movie.title}</h2>
      <p className="text-black" >{movie.summary}</p>
      <button onClick={() => setShowModal(true)} className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded mr-2">
        Update
      </button>
      <button onClick={handleDelete} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
        Delete
      </button>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Update the summary for {movie.title}</h3>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 border rounded mt-1 text-black"
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleUpdate} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Update
                </button>
                <button onClick={() => setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSummary;
