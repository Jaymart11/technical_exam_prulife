import React from 'react';

function validation(value) {
  let errors = {};

  if (!value.name) {
    errors.name = 'Name is required';
  }

  if (!value.age) {
    errors.age = 'Age is required';
  }

  if (!value.gender) {
    errors.gender = 'Gender is required';
  }

  if (!value.occupation) {
    errors.occupation = 'Occupation is required';
  }

  if (!value.role) {
    errors.role = 'Role is required';
  }

  return {errors};
}

export default validation;
