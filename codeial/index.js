const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const app=express();
const port=8000;
app.use(expressLayouts);
app.use(express.static('assets'));

//extract style and script from sub pages to layout page
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`server is running on port : ${port}`);
});