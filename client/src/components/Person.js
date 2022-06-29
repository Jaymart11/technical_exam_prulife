import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

function Person(props) {
  let location = useLocation();
  let id = location.pathname.slice(1);

  console.log(id);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    if (props.family) {
      setPerson(() => props.family.filter(f => f._id === id));
    }
  }, []);

  return (
    <div>
      <div className="w-50 mx-auto my-5">
        <a href="/" className="btn btn-secondary mx-3">
          Back
        </a>
      </div>
      {person &&
        person.map(p => (
          <div className="card mx-auto my-5 " style={{width: '50%'}}>
            <div className="card-body">
              <h3 className="card-title">Name: {p.name}</h3>
              <p className="card-text">Age: {p.age}</p>
              <p className="card-text">Occupation: {p.occupation}</p>
              <p className="card-text">Gender: {p.gender}</p>
              <p className="card-text">Role: {p.role}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Person;
