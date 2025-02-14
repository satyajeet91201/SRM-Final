import React from 'react';

const CustomerDetails = ({ customer, onBack }) => {
  const { name, email, phoneNumber, address } = customer;

  return (
    <div>
      <h5 className="card-subtitle mb-2 tbs"><b>Customer Details</b></h5>
      <ul className="list-group">
        {name && (
          <li className="list-group-item">
            <b>Name:</b> {name}
          </li>
        )}
        {email && (
          <li className="list-group-item">
            <b>Email:</b> {email}
          </li>
        )}
        {phoneNumber && (
          <li className="list-group-item">
            <b>Phone Number:</b> {phoneNumber}
          </li>
        )}
        {address && (
          <li className="list-group-item">
            <b>Address:</b> {address}
          </li>
        )}
      </ul>
      <button onClick={onBack} className="btn btn-secondary">Back</button> {/* Updated button style */}
    </div>
  );
};

export default CustomerDetails;
