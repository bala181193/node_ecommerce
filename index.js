const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const employeerouter=require('./routers');
const app=express();



app.use(bodyParser.urlencoded({ extended: false }))
//app.use('/public/uploads/', express.static('./public/uploads'));
//app.set(express.static('./public'));

// parse application/json
app.use(bodyParser.json())

app.set('view engine','ejs');


mongoose.connect('mongodb://localhost:27017/EmployeeDB',{ useNewUrlParser: true, useUnifiedTopology: true });
const db=mongoose.connection;
db.on('error',()=>{console.log('error db connection')});
db.once('open',()=>{
    console.log('db connected');

}); 

app.use('/',employeerouter);
app.listen(2000, () => console.log('server is running'));