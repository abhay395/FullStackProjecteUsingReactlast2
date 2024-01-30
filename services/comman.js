const passport = require("passport");

exports.isAuth = (req, res, next) => {
 return passport.authenticate('jwt')
};

exports.senitizeUser = (user)=>{
    return{id:user.id,role:user.role}
}
exports.cookieExtractor = function(req) {
    if (req && req.cookies) {
       return token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjc2MjFkMjdlODVlM2RhNzlkZGNjOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjU5Mjc1M30.jzjSr2yX7BlFmmHGoJOIP8g50jh2biwSYoooa56QSsc";
    // //    return token = req.cookies['jwt'];
    }
};