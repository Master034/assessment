import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [jokes, setJokes] = useState([]);  // To store the fetched jokes
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch jokes from the API
  useEffect(() => {
    fetch('https://api.chucknorris.io/jokes/search?query=animal')  // Replace "animal" with any query/category
      .then(response => response.json())
      .then(data => {
        setJokes(data.result);  // Store the jokes in the state
        setLoading(false);  // Stop loading once data is fetched
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);  // Empty dependency array means this runs once when the component mounts

  // If data is loading
  if (loading) {
    return <p className="text-center">Loading jokes...</p>;
  }

  // If there was an error fetching the data
  if (error) {
    return <p className="text-center text-red-500">Error fetching jokes: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4 text-center">Test</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {jokes.map(joke => (
      <div key={joke.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
        {/* Image Section */}
        <img src={joke.icon_url} alt="Chuck Norris" className="w-16 h-16 rounded-full mb-4" />

        {/* Joke Text */}
        <p className="text-gray-800 text-center mb-4">{joke.value}</p>

        {/* Link */}
        <a 
          href={joke.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-auto text-blue-500 hover:text-blue-700 underline"
        >
          View Joke
        </a>
      </div>
    ))}
  </div>
</div>
  );
}

export default App;