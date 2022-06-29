import React, {useEffect, useState} from 'react';
import EveryFamily from './EveryFamily';
import {useNavigate} from 'react-router-dom';

function FamilyTree() {
  const [parents, setParents] = useState(null);
  const [grandParents, setGrandParents] = useState(null);
  const [childrens, setChildrens] = useState(null);

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
        setGrandParents(grandParents.filter(g => g._id !== id));
        console.log(res);
      });
  };

  useEffect(() => {
    fetch('http://localhost:5000/family/Grand Parent')
      .then(test => {
        return test.json();
      })
      .then(test => setGrandParents(test));

    fetch('http://localhost:5000/family/Parent')
      .then(test => {
        return test.json();
      })
      .then(test => setParents(test));

    fetch('http://localhost:5000/family/Children')
      .then(test => {
        return test.json();
      })
      .then(test => setChildrens(test));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center flex-column w-50 mx-auto">
      <h1 className="text-center m-5">Family Tree</h1>
      <div className="d-flex justify-content-center align-items-center bg-secondary rounded mb-3" style={{height: '80px'}} data-toggle="collapse" data-target="#container">
        <h4 style={{cursor: 'pointer'}} className="text-light w-100 text-center">
          Show Family Tree
        </h4>
      </div>
      <div id="container">
        <h5 style={{cursor: 'pointer', height: '50px'}} data-toggle="collapse" data-target="#GrandParents" className="bg-success text-center text-light">
          Show Grand Parents
        </h5>
        <div className="collapse" id="GrandParents">
          <div className="d-flex justify-content-around">
            {grandParents && grandParents.length >= 4 ? (
              ''
            ) : (
              <div className="card mb-3" style={{width: '18rem'}} onClick={() => navigate('/AddGP')}>
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h1>Add</h1>
                </div>
              </div>
            )}
            {grandParents && grandParents.map(gp => <EveryFamily role={gp} delete={handleOnDelete} />)}
          </div>
        </div>

        <h5 style={{cursor: 'pointer', height: '50px'}} data-toggle="collapse" data-target="#Parents" className="bg-success text-center text-light">
          Show Parents
        </h5>
        <div className="collapse" id="Parents">
          <div className="d-flex justify-content-around">
            {parents && parents.length >= 2 ? (
              ''
            ) : (
              <div className="card mb-3" style={{width: '18rem'}} onClick={() => navigate('/AddP')}>
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h1>Add</h1>
                </div>
              </div>
            )}
            {parents && parents.map(parent => <EveryFamily role={parent} delete={handleOnDelete} />)}
          </div>
        </div>
        <h5 style={{cursor: 'pointer', height: '50px'}} data-toggle="collapse" data-target="#Childrens" className="bg-success text-center text-light">
          Show Childrens
        </h5>
        <div className="collapse" id="Childrens">
          <div className="d-flex justify-content-around flex-wrap align-content-around">
            <div className="card mb-3" style={{width: '18rem'}} onClick={() => navigate('/AddC')}>
              <div className="card-body d-flex align-items-center  justify-content-center">
                <h1>Add</h1>
              </div>
            </div>
            {childrens && childrens.map(child => <EveryFamily role={child} delete={handleOnDelete} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamilyTree;
