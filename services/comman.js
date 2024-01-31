const passport = require("passport");

exports.isAuth = (req, res, next) => {
 return passport.authenticate('jwt')
};

exports.senitizeUser = (user)=>{
    return{id:user.id,role:user.role}
}
exports.cookieExtractor = function(req) {
    if (req && req.cookies) {
       return token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjllZWY5ZGY2YzBjMDdkNWIxOTA1MyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA2Njg0MTUzfQ.FTGwYvZVzAQJsGtOcpGdymw5gn5mwxgtwcZJSMTkplo";
    //    return token = req.cookies['jwt'];
    }
};