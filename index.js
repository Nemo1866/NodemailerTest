const express=require("express")
const path=require("path")
const ejs=require("ejs")
const bodyParser=require("body-parser")
const app=express()
const nodemailer=require("nodemailer")

app.use("/public",express.static(path.join(__dirname,'public')))
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get("/",(req,res)=>{
    res.render("contact",{msg:"hello"})
})

app.post("/send",(req,res)=>{
    let output=`
<p>You have a contact request</p>
<h3>Contact Details</h3>
<ul>
<li>${req.body.name}</li>
<li>${req.body.company}</li>
<li>${req.body.email}</li>
<li>${req.body.phone}</li>
</ul>
<h3>Message</h3>
<p>${req.body.message}</p>
`

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'fabian.farrell68@ethereal.email',
        pass: 'CxeA6xbcwYhMrUYftZ'
    }
});
    

let mailOptions={
    from:'"NodeMailer Contact" <fabian.farrell68@ethereal.email>',

    to:"khannaeem0201@gmail.com",
    subject:"Node Mailer Contact",
    text:"Hello World !",
    html:output
}

transporter.sendMail(mailOptions,(err)=>{
    if(err){
        res.send(err)
    }else{
        res.render("contact",{
            msg:"Sucessfully sent an email"
        })
    }
})


})





app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})