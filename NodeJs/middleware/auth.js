const userModel = require("../models/userModel")
const { resHandler } = require("../helper/helper")
const {verify} = require("jsonwebtoken")
const auth = async(req, res, next)=>{
    try{
        const token = req.header("Authorization").replace("bearer ", "")
        const decodedToken = verify(token, process.env.JWTKEY)
        const userData = await userModel.findOne({
            _id: decodedToken._id,
            "tokens.token":token
        })
        if(!userData) throw new Error("unauth !! user has no access")
        req.user = userData
        req.token = token
        req.role = userData.role
        next()
    }
    catch(e){
        resHandler(res, 500, false, e.message, "unauthorized")
    }
}
module.exports = auth