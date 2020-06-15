const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express();
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'dx9812',
      database : 'smartbrain'
    }
  });

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => {
    signin.handleSignin(req,res,db,bcrypt)
})

app.post('/register', (req, res) => {
    register.handleRegister(req,res,db,bcrypt)
})

app.get('/profile/:id', (req,res) =>{
    profile.handleProfile(req,res,db)
})

app.put('/image', (req, res) =>{
    image.handleImage(req,res,db)
})

app.put('/imageurl', (req, res) =>{
    image.handleImageAPI(req,res)
})


app.listen(3000);
