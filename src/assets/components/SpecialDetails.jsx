import React from 'react';

const SpecialDetails = ({ customer, onBack }) => {
  const { specialOccasion, specialAssistance } = customer;

  return (
    <div>
      <h5 className="card-subtitle mb-2 tbs"><b>Special Details</b></h5>
      <ul className="list-group">
        {specialAssistance && (
          <li className="list-group-item">
            <b>Special Assistance Required:</b> {specialAssistance ? 'Yes' : 'No'}
          </li>
        )}
        {specialOccasion && (
          <li className="list-group-item">
            <b>Special Occasion:</b> {specialOccasion.type} on {specialOccasion.date}
          </li>
        )}
      </ul>
      <button onClick={onBack} className="btn btn-secondary">Back</button> {/* Updated button style */}
    </div>
  );
};

export default SpecialDetails;
