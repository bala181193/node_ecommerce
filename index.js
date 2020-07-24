const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const employeerouter=require('./routers');
const path=require('path');
const app=express();
mongoose.connect('mongodb://localhost:27017/mydbs', { useNewUrlParser: true}); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
  console.log("connection succeeded"); 
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); 

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
  extended: true
})); 


app.use('/',employeerouter);
app.listen(2000, () => console.log('server is running'));
// app.use(bodyParser.urlencoded({ extended: false }))
// //app.use('/public/uploads/', express.static('./public/uploads'));
// //app.set(express.static('./public'));

// // parse application/json
// app.use(bodyParser.json())

// app.set('view engine','ejs');


// mongoose.connect('mongodb://localhost:27017/EmployeeDB',{ useNewUrlParser: true, useUnifiedTopology: true });
// const db=mongoose.connection;
// db.on('error',()=>{console.log('error db connection')});
// db.once('open',()=>{
//     console.log('db connected');

//}); 


