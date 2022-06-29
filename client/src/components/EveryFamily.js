import React from 'react';
import {Link} from 'react-router-dom';

function EveryFamily(props) {
  return (
    <div className="card mb-3" style={{width: '18rem'}} key={props.role && props.role._id}>
      <div className="card-body">
        <h3 className="card-title">{props.role && props.role.name}</h3>
        <p className="card-text">{props.role && props.role.gender}</p>
        <div className="d-flex justify-content-around">
          <Link to={`/${props.role._id}`} className="btn btn-outline-primary">
            View
          </Link>
          <Link to={`/${props.role.role.replace(' ', '')}/${props.role._id}`} className="btn btn-outline-success">
            Edit
          </Link>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              props.delete(props.role && props.role._id);
            }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EveryFamily;
