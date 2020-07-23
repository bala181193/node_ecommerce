const mongoose=require('mongoose');
const schema=mongoose.Schema;

let employeeSchema=new schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('Employee',employeeSchema);