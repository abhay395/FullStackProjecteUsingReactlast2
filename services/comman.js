const passport = require("passport");

exports.isAuth = (req, res, next) => {
 return passport.authenticate('jwt')
};

exports.senitizeUser = (user)=>{
    return{id:user.id,role:user.role}
}
exports.cookieExtractor = function(req) {
    if (req && req.cookies) {
       return token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjc2N2Q3NGMzY2JmMzYyOWI3NzliOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA2NTE4NDg3fQ.-i9JSVsEDI-QV2xRhpYx82Pfb6q-XRm0R1_WIy_P6D0";
    //    return token = req.cookies['jwt'];
    }
};