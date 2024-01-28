const passport = require("passport");

exports.isAuth = (req, res, next) => {
 return passport.authenticate('jwt')
};

exports.senitizeUser = (user)=>{
    return{id:user.id,role:user.role}
}
exports.cookieExtractor = function(req) {
    if (req && req.cookies) {
       return token = req.cookies['jwt'];
    }
};