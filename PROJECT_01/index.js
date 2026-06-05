const express = require('express');
const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/youTube-app-1").then(() => console.log("Mongo DB connected")); 
 
app.use(express.json()); //for getting json from POSTMAN
app.use(express.urlencoded({extended: false }));
app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter); // if request came on /api/users  
// use userRouter

app.listen(PORT,() => {
    console.log(`Server Started at Port ${PORT}`);
});
