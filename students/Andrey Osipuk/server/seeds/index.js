const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const faker = require('faker');
const request = require('request');

const User = require('../models/user');
const Picture = require('../models/picture');

const maxUsers = 10;
const maxPictures = 100;

function rand(max = 10) {
  return Math.floor(Math.random() * max);
}

function getImage() {
  return new Promise((resolve, reject) => {
    request({ url: 'https://picsum.photos/500/500', followRedirect: false }, (err, res, body) => {
      resolve(`https://picsum.photos${res.headers.location}`);
    });
  })
}

async function importSeeds() {
  await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true });

  await User.deleteMany({});
  await Picture.deleteMany({});

  const users = [];
  //users
  for (let i = 0; i < maxUsers; i++) {
    let user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: await getImage(),
      bio: faker.lorem.paragraph(),
      email: faker.internet.email(),
      password: 'qwerty',
    });

    user = await user.save();
    console.log(`Created user ${i}/${maxUsers} ${user.firstName} ${user.lastName}`);
    users.push(user);
  }
  //pictures
  for (let i = 0; i < maxPictures; i++) {
    const randOwner = users[rand()];

    const likes = [];
    const comments = [];

    const likesCount = rand(10);
    const commentsCount = rand();

    for (let j = 0; j < likesCount; j++) {
      const randUser = users[rand()];
      likes.push({
        user: randUser,
        timestamp: faker.date.past(),
      });
    }

    for (let j = 0; j < commentsCount; j++) {
      const randUser = users[rand()];
      comments.push({
        user: randUser,
        text: faker.lorem.sentence(),
        timestamp: faker.date.past(),
      });
    }

    const picture = new Picture({
      image: await getImage(),
      owner: randOwner,
      likes,
      comments,
    });

    await picture.save();

    console.log(`Created picture for ${i}/${maxPictures} ${randOwner.firstName} ${randOwner.lastName}`);
  }

  process.exit();
}

importSeeds();