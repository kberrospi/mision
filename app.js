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
//app.use(express.static("public"));



app.listen(3000, ()=>{
    return console.log("Listening on port 3000");
});

app.get("/",  (req, res)=>{

});

app.post("/", async function(req, res){
    let usr = req.body.userName;
    let email = req.body.correo;
    let pwd = req.body.pass; 
    const salt = bcrypt.genSaltSync(1);
    let crypt = bcrypt.hashSync(pwd,salt);
    
    await User.create({userName: usr, correo: email, pass: crypt });

    await User.find({}, (err, user)=>{
        console.log(JSON.stringify(user));
        return res.send(JSON.stringify(user));
       
    }); 
});
