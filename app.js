const express=require('express');
const app=express();
const mongoose=require('mongoose');
const {MONGOURI}=require('./keys')
const PORT=5000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


require('./models/user')
app.use(express.json())
app.use(require('./routes/auth'));

mongoose.connect(MONGOURI,{
     useNewUrlParser: true,
     useUnifiedTopology: true 
})
mongoose.connection.on('connected',()=>{
    console.log('DB connected')
})
mongoose.connection.on('error',(err)=>{
    console.log('error connecting',err)
})
app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
})