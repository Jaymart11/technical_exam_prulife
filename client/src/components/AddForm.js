import React from 'react';
import {Link} from 'react-router-dom';

function AddForm(props) {
  return (
    <form onSubmit={props.Submit} className="w-50 mx-auto">
      <h1 className="text-center">Add {props.role}</h1>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" className="form-control" onChange={props.change} />
        {props.errors.name && <div className="text-danger">{props.errors.name}</div>}
      </div>
      <div className="form-group">
        <label>Age:</label>
        <input type="number" name="age" className="form-control" onChange={props.change} />
        {props.errors.age && <div className="text-danger">{props.errors.age}</div>}
      </div>
      <div className="mb-3">
        <label>Gender:</label>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={props.change} />
          <label className="form-check-label" htmlFor="male">
            Male
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onChange={props.change} />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
        {props.errors.gender && <div className="text-danger">{props.errors.gender}</div>}
      </div>
      <div className="form-group">
        <label>Occupation:</label>
        <input type="text" name="occupation" className="form-control" onChange={props.change} />
        {props.errors.occupation && <div className="text-danger">{props.errors.occupation}</div>}
      </div>
      <div className="form-group d-flex flex-column">
        <label>Role:</label>
        <select class="form-select form-control" name="role" onChange={props.change}>
          <option value="">Select Role</option>
          <option value={props.role}>{props.role}</option>
        </select>
        {props.errors.role && <div className="text-danger">{props.errors.role}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <a href="/" className="btn btn-secondary mx-3">
        Back
      </a>
    </form>
  );
}

export default AddForm;
