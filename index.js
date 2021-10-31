const express =require('express');
const port=process.env.PORT || 3000;

const app=express();
const cookieParser=require('cookie-parser');
//layout
const expressLayouts=require('express-ejs-layouts');
//loaded the mongoose file here
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const candidatepassportLocal=require('./config/candidate-passport-local-strategy');
// const recruiterpassportLocal=require('./config/recruiter-passport-local-strategy');
// const MongoStore=require('connect-mongo')(session);
//importing connect-mongo module and specifically a arguement named 'session'. 
// const MongoStore=require('connect-mongo')(session);
//importing node-sass-middleware
const sassMiddleware=require('node-sass-middleware');

const env= require('./config/environment');
console.log(env);
const path= require('path');

//telling app to use it
app.use(sassMiddleware({
   src: path.join(__dirname, env.asset_path, '/scss'),
   dest: path.join(__dirname, env.asset_path, '/css'),
   debug:false,
   outputStyle:'extended',
   prefix:'/css'

}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('assets'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'jobportal',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
    //we are using here MongoStore instance
    // store: new MongoStore(
    //     {
    //         mongooseConnection:db,
    //         autoRemove:'disabled'
    //     },function(err){
    //         console.log(err || 'connect mongo set up ok');
    //     }
    //     )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        // console.log(err);
        //this is just interpolation `` -these backtics..
        //${} in these brackets the particular thing gets evaluated..
        //to include a variable inside a string .this is interpolation
        console.log(`error is : ${err}`);
    }
    console.log(`port is running on port no:: ${port}`);
});