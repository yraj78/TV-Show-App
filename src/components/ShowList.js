import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ color: 'black', textAlign: 'center' }}>Show List</h1>
      {shows.map((show) => (
        <div key={show.show.id} style={{ margin: '0 auto 20px', maxWidth: '400px', border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
          <h2 style={{ color: 'green' }}>
            <Link to={`/show/${show.show.id}`} style={{ textDecoration: 'none', color: 'green' }}>
              {show.show.name}
            </Link>
          </h2>
          {show.show.image && (
            <img src={show.show.image.original} alt={show.show.name} style={{ maxWidth: '50%' }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowList;