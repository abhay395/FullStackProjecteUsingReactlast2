const { User } = require("../model/User.models");

// // exports.createUser = async (req, res) => {
// //     const user = new User(req.body)
// //     try {
// //         const doc = await user.save();
// //     res.status(201).json(doc)
// //     } catch (error) {
// //       res.status(400).json(error);
// //     }
// //   };
  
exports.featchUserById = async (req, res) => {
  const {id} = req.user;
    try {
        const user = await User.findById(id).exec();
    res.status(201).json({email:user.email,fullName:user.fullName,addresses:user.addresses,role:user.role,orders:user.orders})
    } catch (error) {
      res.status(400).json(error);
    }
  };

  exports.updateUser = async (req,res)=>{
    const {id} = req.user
    try {
        const user = await User.findByIdAndUpdate(id,req.body,{returnDocument:"after",new:true});
        res.status(203).json(user)
    } catch (error) {
        res.status(400).json(error);
    }
}
  