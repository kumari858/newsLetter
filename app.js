const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
//GIT PRACTICE BY PANKAJ
//LEARNING GIT

app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html");
});
app.post("/", function(req, res){
    const firstName= req.body.fname;
    const lastName = req.body.lname;
    const  email= req.body.email;
    const data = { 
        members :[
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]

    };
    const jsonData = JSON.stringify(data);
    
    const url ="https://us2.api.mailchimp.com/3.0/lists/96eeb38fb2";
    const options = {
        method: "POST",
        auth: "pink:d12fae43b884917722cc86772a0cc51e-us2"
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");

        }
        else{
            res.sendFile(__dirname +"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
    //console.log(firstName,lastName,email);
});


app.post("/failure",function(req,res){
    res.redirect("/")
});
app.listen (process.env.PORT||3002, function(){
    console.log("server running..");
});
//list id 
//96eeb38fb2
//api key
//d12fae43b884917722cc86772a0cc51e-us2
