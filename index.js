
const express=require("express")
const { connection } = require("./config/db.js")
const { authenticate } = require("./middleware/Authentication.middleware")
const { noteRouter } = require("./routes/Note.route")
const { userRouter } = require("./routes/User.routes")
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("HOme PAge")
})

app.use("/user",userRouter)

app.use(authenticate)
app.use("/note",noteRouter)
app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log(" Cannot connected to DB");
        console.log(error);
    }
    console.log("Running the server at port 8080");
})