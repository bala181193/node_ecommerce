const express=require('express');
const multer=require('multer');
const path=require('path');
const url=require('url');
const employee=require('./model/employee');
var ImageSchema = require('./model/imgSchema'); 

const fs=require('fs');
const { extname } = require('path');
const { Error } = require('mongoose');
const router=express.Router();
const app=express();

//app.use('/public/uploads/', express.static(path.join(__dirname + './public/uploads')));

router.use(express.static(__dirname+"./public/"));
//app.use('/public/uploads/', express.static('./public/uploads'));


router.get('/',(req,res,next)=>{
    employee.find((err,docs)=>{
        res.render('emphome',{employee:docs});

    }).catch((err)=>{
        console.log("something wrong");
    })
})

router.post('/add',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const mobile=req.body.mobile;
    const city=req.body.city;
    console.log(name,email,mobile);
    const emp=new employee({
        name,
        email,
        mobile,
        city
    })
    emp.save((err)=>{
        if(err){console.log("insert error" +err)}
        else{
            console.log("inserted");
            employee.find((err,docs)=>{
                res.render('edit',{employee:docs});
        
            }).catch((err)=>{
                console.log("something wrong");
            })
        }
    })
})

router.get('/edit/:id',(req,res,next)=>{
    console.log(req.params.id);
    employee.findOneAndUpdate({_id: req.params.id},req.body,{new:true},(err,doc)=>{
        if(err){
            console.log("not updated");
        }
        else{
            res.render('update',{employees:doc});

        }
    })
})

router.post('/update/:id',(req,res,next)=>{
    employee.findByIdAndUpdate({_id:req.params.id},req.body,(err,doc)=>{
        if(err){
            console.log('not updataed');
        }
        else{
            console.log("updated");
            employee.find((err,docs)=>{
                res.render('edit',{employee:docs});
        
            }).catch((err)=>{
                console.log("something wrong");
            })
        }
    })
   })

   router.get('/delete/:id',(req,res,next)=>{
    employee.findByIdAndDelete({_id:req.params.id},(err,doc)=>{
        if(err){
            console.log('not deleted');
        }
        else{
            console.log('deleted succes');
            employee.find((err,docs)=>{
                res.render('edit',{employee:docs});
        
            }).catch((err)=>{
                console.log("something wrong");
            })
        }
    })
})

var profileImage=[];
var storage = multer.diskStorage({
    destination:function(req,file,callback){
     callback(null,'./public/uploads');
    },
    filename:function(req,file,callback){
      var ext='';
      var name='';
      if(file.originalname){
        var p =file.originalname.lastIndexOf('.');
        ext=file.originalname.substring(p+1);
        var firstname=file.originalname.substring(0,p+1);
        name=Date.now()+'_'+firstname;
        name+=ext; 
      }
      profileImage=[];
      profileImage.push({'name':name});
      callback(null,name);
    }
  });
var upload=multer({storage:storage,limits:{filesize:10}}).array('image');

router.get('/upload',function (req, res) {
//res.render('upload_file');
var result;

ImageSchema.find({},function(e,result){
//console.log(result);
          res.render('upload_file', {
              "result" : result
          });
      });
  });
  
router.post('/upload',upload,(req,res,next)=>{
    var img=profileImage[0].name;
    new ImageSchema({
image:img
    }).save(function(err, doc){
//console.log(doc);
        var passDateJson = {};   
        if(err){
          passDateJson.resType='error';
          passDateJson.resMsg ='Error occured';
          passDateJson.err    = err;
        }else{
          passDateJson.resType='success';
          passDateJson.resMsg ='Record deleted Successfully';
      
        }
    res.json(passDateJson);
    
    });
    
  })


module.exports=router;