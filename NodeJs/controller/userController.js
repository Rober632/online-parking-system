const helper = require('../helper/helper')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
class Users{
    static home = (req , res) =>{
        res.send("home")
    }
    static register = async( req , res) => {
        try{
        const userData = new userModel(req.body)
        await userData.save()
        helper.resHandler(res , 200 ,true, userData , "User added successfuly")
        }
        catch(e){
            helper.resHandler(res , 500 ,false, {} , e.message)
        }
    }
    static login = async ( req , res ) => {
        try{
            const userData = await userModel.findOne({"email" : req.body.email})
            if(!userData) throw new Error("User not found")
        const matched = await bcrypt.compare(req.body.password , userData.password)
            if(!matched) throw new Error("wrong password")
            const token =await userData.generateToken() 
            console.log('logged in');
        helper.resHandler(res , 200 ,true, {userData , token} , "User logged in  successfuly")
        }
        catch(e){
            helper.resHandler(res , 500 ,false, {} , e.message)
        }
    }
}
module.exports = Users