const User = require("../models/users");
const{v4: uuidv4} = require('uuid');
const {setUser, getUser} = require('../service/auth');
async function handleUserSignup(req, res) {

    const {name, email, password } = req.body;

    await User.create({
        name: name, 
        email: email, 
        password: password,
    });
    return res.redirect("/login");
}

async function handleUserLogin(req, res){
    const{email, password } = req.body;

    const user = await User.findOne({email, password});

    if(!User)
     return res.render("login", {
        error: "Invalid Username or Password",
    });

    // const sessionId = uuidv4();

    // setUser(sessionId, user);
    const token = setUser(user);
    // using cookie as token
    res.cookie("token" , token);

    // using res to hold token
    return res.redirect("/");
}


module.exports = { handleUserSignup,
                   handleUserLogin
}