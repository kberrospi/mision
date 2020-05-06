const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/User");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');


mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/users', { 
  useNewUrlParser: true, useUnifiedTopology: true  
});
mongoose.connection.on("error", function(e) { 
  console.error(e); 
});

app.use( express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, ()=>{
    return console.log("Listening on port 3000");
});

app.get("/users",  async(req, res)=>{
  const users = await User.find({});
  res.send(JSON.stringify(users));
});

app.post("/register", async function(req, res){
  let usr = req.body.userName;
  let email = req.body.correo;
  let pwd = req.body.pass; 
  const salt = bcrypt.genSaltSync(1);
  let crypt = bcrypt.hashSync(pwd,salt);
  
  try {
    await User.create({userName: usr, correo: email, pass: crypt });
    return res.sendStatus(200);
  } catch(e) {
    return res.status(500).send('Se presento un error' + e.message);
  }
  
});
