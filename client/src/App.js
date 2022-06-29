import {useEffect, useState} from 'react';
import './App.css';
import AddForm from './components/AddForm';
import FamilyTree from './components/FamilyTree';
import Person from './components/Person';
import validation from './Validation';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EditForm from './components/EditForm';

function App() {
  const [family, setFamily] = useState(null);

  const [value, setValue] = useState({name: '', age: '', gender: '', occupation: '', role: '', _id: ''});

  const [errors, setErrors] = useState({});

  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/family')
      .then(test => {
        return test.json();
      })
      .then(test => setFamily(test));
  }, []);

  //console.log(family);

  const handleOnDelete = id => {
    fetch('http://localhost:5000/familydelete', {
      method: 'DELETE',
      body: JSON.stringify({_id: id}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setFamily(family.filter(g => g._id !== id));
      });
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    //setValue({name: e.target.name.value, age: e.target.age.value, gender: e.target.gender.value, occupation: e.target.occupation.value, role: e.target.role.value});

    setErrors({...validation(value).errors});

    if (Object.keys(validation(value).errors).length === 0) {
      // navigate('/todo');
      fetch('http://localhost:5000/familyadd', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          setValue({name: '', age: '', gender: '', occupation: '', role: ''});
          window.location.href = '/';
        });
    }
  };

  const handleOnUpdate = e => {
    e.preventDefault();

    setValue(() => ({
      name: e.target.name.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
      occupation: e.target.occupation.value,
      role: e.target.role.value,
      _id: e.target._id.value,
    }));

    console.log(value);

    setErrors({...validation(value).errors});

    if (Object.keys(validation(value).errors).length === 0) {
      // navigate('/todo');
      fetch('http://localhost:5000/familyupdate', {
        method: 'PUT',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          setValue({name: '', age: '', gender: '', occupation: '', role: '', _id: ''});
          window.location.href = '/';
        });
    }
  };

  const handleOnChange = e => {
    setValue(value => ({...value, [e.target.name]: e.target.value}));
  };

  // const getPerson = id => {
  //   setPerson(family.filter(f => f._id === id));
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FamilyTree />} />
        <Route path="/AddGP" element={<AddForm Submit={handleOnSubmit} change={handleOnChange} errors={errors} role={'Grand Parent'} />} />
        <Route path="/AddP" element={<AddForm Submit={handleOnSubmit} change={handleOnChange} errors={errors} role={'Parent'} />} />
        <Route path="/AddC" element={<AddForm Submit={handleOnSubmit} change={handleOnChange} errors={errors} role={'Children'} />} />

        <Route path="/grandparent/:id" element={<EditForm Submit={handleOnUpdate} change={handleOnChange} errors={errors} role={'Grand Parent'} family={family} />} />
        <Route path="/parent/:id" element={<EditForm Submit={handleOnUpdate} change={handleOnChange} errors={errors} role={'Parent'} family={family} />} />
        <Route path="/children/:id" element={<EditForm Submit={handleOnUpdate} change={handleOnChange} errors={errors} role={'Children'} family={family} />} />

        <Route path="/:id" element={<Person family={family} />} />
      </Routes>
    </Router>
  );
}

export default App;
