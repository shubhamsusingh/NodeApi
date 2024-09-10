const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config(); // Ensure correct path if required

const db=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE

});

exports.register=(req,res)=>{
    console.log(req.body);
    
    const {name,email,password}=req.body;
    db.query('SELECT email FROM users WHERE email=?', [email],async(error,results)=>{
        if(error){
            console.log(error);
            return res.status(500).send('Server error');

        }
        if(results.length > 0){
            return res.status(400).send('<h1>This email is already in use</h1>');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 8);
            console.log('Hashed password:', hashedPassword);
            // Proceed with storing the new user in the database
            // Example: db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => { ... });
            db.query('INSERT into users set ?',{name:name,email:email,password:hashedPassword},(error,results)=>{
                if(error){
                    console.log(error);
        
                }else{
                    const token = jwt.sign(
                        { id: results.insertId, email: email }, // Payload
                        process.env.JWT_SECRET, // Secret key (stored in .env)
                        { expiresIn: '1h' } // Options
                    );
                    res.json({
                        message: 'User registered successfully',
                        token: token
                    });
                }
              })
        } catch (hashError) {
            console.error('Hashing error:', hashError);
            res.status(500).send('Server error');
        }
      
       
    })

    
}