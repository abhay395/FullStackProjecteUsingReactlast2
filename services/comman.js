const passport = require("passport");

exports.isAuth = (req, res, next) => {
 return passport.authenticate('jwt')
};

exports.senitizeUser = (user)=>{
    return{id:user.id,role:user.role}
}
exports.cookieExtractor = function(req) {
    if (req && req.cookies) {
       return token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjc2MjFkMjdlODVlM2RhNzlkZGNjOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjc3NzM0OH0.JCXirh8Yw_wnqAnN2ncuZChBQE35crsxAhFKgzOUtSo";
    //    return token = req.cookies['jwt'];
    }
};