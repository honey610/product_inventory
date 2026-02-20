import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        
       
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:[true,"Email already exists"],
        lowercase:true,
        match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at least 6 characters long"],
        select:false,
        trim:true

    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    }
   


})

userSchema.pre("save",async function(){
    
        if(!this.isModified("password")){
            return 
        }
        this.password=await bcrypt.hash(this.password,10);
       return
    
});

userSchema.methods.comparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
};

const User=mongoose.model("User",userSchema);
export default User;