const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const mongoose  = require('mongoose')

const userSchema = mongoose.Schema({
    name : {type : String , required : true} , 
    email : {type : String , required : true , unique: true} , 
    password : {type : String , required : true},
    hasBooked : {
        type : Boolean,
        default : false
    },
    role:{ type:String, default:'user'},
    floor : { type : Number  } ,
    slot : { type : Number },
    tokens : [{"token" : {type : String}}] 
})
    userSchema.methods.generateToken = async function(){
        this.tokens = []
        const token = jwt.sign({ user : {id : this.id , name : this.name , email : this.email , role : this.role, 
            hasBooked : this.hasBooked , floor : this.floor , slot : this.slot}} , process.env.JWTKEY , { expiresIn: '1h' })
        this.tokens = this.tokens.concat({token})
        await this.save()
        return token
    }
userSchema.pre("save" , async function(){
    if(this.isModified("password"))
    this.password = await bcrypt.hash(this.password , 12)
})
module.exports =  userModel = mongoose.model("Users" , userSchema)
