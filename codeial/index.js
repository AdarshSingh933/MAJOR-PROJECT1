const session=require('express-session');
const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');

const MongoStore = require('connect-mongo');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const sassMiddleware=require('sass-middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    OutputStyle:'extended',
    prefix:'/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('assets'));

//extract style and script from sub pages to layout page
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

// const sessionStore = new mongoStore({
//     mongooseConnection:db,
//     autoremove:'disabled'
//    },
//    function(err){
//     console.log(err || 'connect-mongodb setup ok');
//    });

// app.use(session({
//     name:'codeial',
// // TODO change the secret before deployment
//     secret:'blahsomething',
//     saveUninitialized:false,
//     resave:false,
//     cookie:{
//       maxAge:(1000*60*100)
//     },
//     store:sessionStore
// }));
const sessionStore = MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/codeial', // Replace with your MongoDB connection URL
    // collectionName: 'sessions',
    // mongooseConnection: db,
    autoRemove: 'disabled'
  }, (err) => {
    console.log(err || 'connect-mongodb setup ok');
  });
  
  app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: (1000 * 60 * 100)
    },
    store: sessionStore
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`server is running on port : ${port}`);
});