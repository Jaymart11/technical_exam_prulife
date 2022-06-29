const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const Family = require('./models/Family.model');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose
  .connect('mongodb+srv://jaymart:j123456@cluster0.xm9bw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

app.post('/familyadd', (req, res) => {
  const newFamily = new Family({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    role: req.body.role.toUpperCase(),
    occupation: req.body.occupation,
  });

  newFamily
    .save()
    .then(user => res.json('Success'))
    .catch(err => console.log(err));
});

app.get('/family', (req, res) => {
  Family.find()
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
});

app.get('/family/:role', (req, res) => {
  Family.find({role: req.params.role.toUpperCase()})
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
});

app.delete('/familydelete', (req, res) => {
  Family.findByIdAndDelete(req.body._id).then(() => {
    res.json('Deleted');
  });
});

app.put('/familyupdate', (req, res) => {
  Family.findOne({_id: req.body._id})
    .then(fam => {
      Object.assign(fam, {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        role: req.body.role.toUpperCase(),
        occupation: req.body.occupation,
      });

      fam.save().then(() => {
        res.json('Updated');
      });
    })
    .catch(err => console.log(err));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
