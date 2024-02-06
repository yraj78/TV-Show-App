import React, { useState } from 'react';

const BookingForm = ({ showName }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to book the ticket?');
    if (isConfirmed) {
      const bookedTicket = {
        showName: showName,
        userName: formData.userName,
        email: formData.email,
      };

      const bookedTickets = JSON.parse(localStorage.getItem('bookedTickets')) || [];
    
      bookedTickets.push(bookedTicket);
      
      localStorage.setItem('bookedTickets', JSON.stringify(bookedTickets));
  
      window.alert('Thanks for the booking. Your ticket has been successfully booked.');
    }
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
      <h3 className="mb-4">Book Show Ticket</h3>
      <form onSubmit={handleFormSubmit} style={{ textAlign: 'center' }}>
        <div className="mb-3" style={{ marginBottom: '15px' }}>
          <label htmlFor="showName" className="form-label">
            Show Name :
          </label>
          <input type="text" id="showName" value={showName} className="form-control" disabled />
        </div>
        <div className="mb-3" style={{ marginBottom: '15px' }}>
          <label htmlFor="userName" className="form-label">
            User Name :
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3" style={{ marginBottom: '15px' }}>
          <label htmlFor="email" className="form-label">
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button style={{ backgroundColor: 'yellow', marginTop: '10px', padding: '10px 20px', fontSize: '18px', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type="submit" className="btn btn-primary" >
          Proceed
        </button>
      </form>
    </div>
  );
};

export default BookingForm;