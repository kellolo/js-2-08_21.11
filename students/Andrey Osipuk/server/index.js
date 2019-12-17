const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true });

const app = express();

const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(' ');
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Wrong token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token present' });
  }
}

const User = require('./models/user');
const Picture = require('./models/picture');

app.use(express.json());
app.use(cors());

app.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ email: username, password }).lean();
  if (user) {
    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }, 'secret');
    delete user.password;
    res.json({ token, user });
  } else {
    res.status(401).json({ message: 'Wrong credentials' });
  }
});

app.all('/api*', verifyToken);

// app.get('/api/photos', async (req, res) => {
//   const { limit = 15, count } = req.query;
//   const photos = await Picture.find()
//     .populate([
//       'comments.user',
//       'likes.user',
//       'owner'
//     ]).skip(+count).limit(+limit);
app.get('/api/photos', async (req, res) => {
  const { page = 1, limit = 15 } = req.query;
  const photos = await Picture.find()
    .populate([
      'comments.user',
      'likes.user',
      'owner'
    ]).skip(+limit * (+page - 1)).limit(+limit);
  const total = await Picture.countDocuments();
  res.json({
    page,
    total,
    photos,
  });
});

app.get('/api/users/:id', async (req, res) => {
  let user = await User.findById(req.params.id);
  user = user.toObject();

  // удаляем пароль
  delete user.password;

  res.json(user);
});

app.get('/api/photos/:id', async (req, res) => {
  const photo = await Picture.findById(req.params.id)
    .populate([
      'comments.user',
      'likes.user',
      'owner'
    ]);
  res.json(photo);
})

app.listen(8888, () => {
  console.log('Server has been started!');
});
