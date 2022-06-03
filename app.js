const express= require("express");
const path=require("path");
const app=express();
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port =80;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// FOR SPECIFIC STUFF)
app.set('engine view','pug'); //Set the engine template as pug
app.set('views',path.join(__dirname,'views')); //Set the views directory

// ENDPOINTS
app.get('/',(req,res)=>{
    const con="This is the best content";
    res.status(200).render('home.pug');
})
app.get('/contact',(req,res)=>{
    const con="This is the best content";
    res.status(200).render('contact.pug');
})

app.post('/contact', (req,res)=>{
    const myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
    res.status("Item was not saved to the database.")
    });
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})