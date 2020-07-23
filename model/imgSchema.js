var mongoose=require('mongoose');

var imageSchema = new mongoose.Schema({ 
    image: {  type: String,
        required: true
    }
}); 
  
//Image is a model which has a schema imageSchema 
  
module.exports =  mongoose.model('image', imageSchema); 
