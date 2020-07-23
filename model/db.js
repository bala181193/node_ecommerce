const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/EmployeeDB",{useNewUrlParser:true},(err)=>{

if(err){console.log('db not connected');}
else{
    console.log('db connected ok');
}

})
require('./employeeModel');

