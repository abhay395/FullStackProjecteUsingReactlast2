const passport = require("passport");

exports.isAuth = (req, res, next) => {
 return passport.authenticate('jwt')
};

exports.senitizeUser = (user)=>{
    return{id:user.id,role:user.role}
}
exports.cookieExtractor = function(req) {
    if (req && req.cookies) {
       return token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjViN2NiMGQwMzA4ZGI0NjhlYWI1OCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA2NTEzNTYzfQ.CAYQgNPkSopvi5qW4QH4yNF1eH9IUNEqpwoXu5R-K08";
    //    return token = req.cookies['jwt'];
    }
};