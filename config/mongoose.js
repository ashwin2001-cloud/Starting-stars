const mongoose=require('mongoose');

const env= require('./environment');

mongoose.connect(process.env.MONGODB_URI ||`mongodb+srv://${env.username}:${env.password}@cluster0.gnh6y.mongodb.net/${env.db}?retryWrites=true&w=majority`,
{ useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true,});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting to Mongodb'));

db.once('open',function(){
    console.log('Connected to Database:: Mongodb');
});
module.exports=db;