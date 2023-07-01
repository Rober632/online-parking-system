const bcrypt = require("bcrypt")
const fs = require('fs')
class helper{
    static resHandler = (res , statusCode , ApiStatus , data ,message) => {
        res.status(statusCode).send({ApiStatus  , data  , message })
    }
    static fileHandler = (req)=>{
        const ext = req.file.originalname.split(".").pop()
        const newName = req.file.path+"."+ext
        fs.renameSync(req.file.path, newName)
        return ext
    }
}


module.exports = helper