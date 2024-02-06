import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  useEffect(() => {
    
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleBookNow = () => {
    setIsBookingFormOpen(true);
  };

  return (
    <div className="container mt-4">
      {show && (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: '20px', color: '#333' }}>{show.name}</h1>
          <div className="card mt-4" style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden' }}>
            <div className="card-body">
              <br />
              {show.image && (
                <img src={show.image.medium} alt={show.name} style={{ width: '150px', height: '225px', margin: '0 auto 20px', display: 'block' }} />
              )}
              <div style={{ textAlign: 'center', fontSize: '16px', marginBottom: '20px' }}>
                <p>Language: {show.language}</p>
                <p>Genre: {show.genres && show.genres.join(', ')}</p>
                <p>Rating: {show.rating && show.rating.average !== null ? show.rating.average : 'null'}</p>
                {show.officialSite && <p>Official Site: <a href={show.officialSite} target="_blank" rel="noopener noreferrer">{show.officialSite}</a></p>}
              </div>
              <p style={{ fontSize: '16px' }}><b>Summary:</b></p>
              <div dangerouslySetInnerHTML={{ __html: show.summary }} style={{ fontSize: '16px', textAlign: 'justify' }}></div>
              <button style={{ backgroundColor: 'yellow', marginTop: '20px', padding: '10px 20px', fontSize: '18px', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }} className="btn btn-primary" onClick={handleBookNow}>Book Now</button>
            </div>
          </div>
        </div>
      )}
      {isBookingFormOpen && <BookingForm showName={show.name} />}
    </div>
  );
};

export default ShowDetails;