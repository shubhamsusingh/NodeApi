const express=require('express')
const mysql=require('mysql')
const app =express()
const dotenv=require('dotenv')
dotenv.config({path:'./.env'});
const db=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASES

});
db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Mysql connected")
    }
    
})
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use('/',require('./routs/pages'));
app.use('/auth',require('./routs/auth.js'));
app.get('/',(req,res)=>{
    res.send('<h1>Hello Shubham</h1>')
})

app.listen(3000,()=>{
    console.log("conneted")
})