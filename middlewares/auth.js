const {getUser} = require("../service/auth");

function checkForAuthentication(req, res, next){
    const tokenCookie  = req.cookies?.token;
    req.user = null;

    if(!tokenCookie)
        return next();

    const token = tokenCookie;
    const user  = getUser(token);

    req.user = user;
    return next();
}


// async function restrictToLoggedinUserOnly(req, res, next){
//     // using cookie for userUid
//     // const userUid = req.cookies?.uid;
//     // using response autorizations

//     const userUid = req.headers["Authorization"];

//     if(!userUid) return res.redirect("/login");
//     const token = userUid.spilt("Bearer ")[1];
//     const user = getUser(token);

//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();

// }

// async function checkAuth(req, res, next){
//     const userUid = req.cookies?.uid;

//     const user = getUser(userUid);

//     req.user = user;

//     next();

// }

//Admin, user

function restrictTo(roles = []){
    return function(req, res, next){ 
    if(!req.user) return res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.end("UnAutherized");

    return next();
    };
}
module.exports = {
    checkForAuthentication,
    restrictTo,
}