const express = require('express');
const fs = require('fs');// it makes the changes permanent in files

const mongoose = require('mongoose');
const app = express();
const PORT = 8000;

//connection
mongoose.connect('mongodb://127.0.0.1:27017/youTube-app-1')// name of database
.then(() => console.log("Mongo DB connected")) // return promise
.catch((err) => console.log("Mongo error", err))

//user schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,// means we MUST have to give this
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true, //unique email 
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
})

// create model
const User = mongoose.model('user', userSchema);


// Middle-Ware plugin
// which type of data is coming, how to parse that data
// coming from request(JSON,image file) and make available in req.body
app.use(express.urlencoded({extended: false }));
//
app.use((req,res,next) => {
    console.log("Hello from middleWare 1");// it neither ends response nor calls the next function
    // return res.json({msg:"Hello from middleware 1"});
    req.myUserName ="akashdev";
    next(); //automatically pass to next function (routes)
});

app.use((req,res,next) => {
    console.log("Hello from middleware 2",req.myUserName);
    // res.end("Hey");

    // Can also do this
    fs.appendFile("postmanAPI.txt",
        `\n${Date.now()}: ${req.method}: ${req.path}`,
        (err, data) =>{
            next();
        }
    )
    // next(); //imp
})

app.get('/',(req,res)=>{
    return res.end("Hello from Home-Page");
})

//Routes (JSON)
app.get('/api/users',async(req,res) => {
    const allDbUsers = await User.find({});

    // console.log("I am in get route api/users");
    //res.setHeader('X-myName','Akash'); //response(Custom) headers
    // console.log(req.headers); // request headers (Read and Set)
  
    
    return res.json(allDbUsers);//CSR
})

// Routes (HTML)
app.get("/users", async (req,res)=>{
    const allDbUsers = await User.find({}); // empty all users
    const html = `
    <ul>
    ${allDbUsers.map((user) =>
         `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});
 
//Dynamic path parameters id=>dynamic

app.route("/api/users/:id")
.get(async (req, res) => {
    const user = await User.findById(req.params.id);


    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id ===id);
    if(!user)return res.status(404).json({err:"User not found"});
    // console.log(`Username id is : ${id}`);
    
    return res.json(user);
})
.patch( async (req,res) =>{
    // Edit user with id
    await User.findByIdAndUpdate(req.params.id,{ lastName:"Changed"});
    return res.json({status: "success"});
    
    // const id = Number(req.params.id);
    // const body = req.body;
    // const userIndex = users.findIndex((user) =>user.id ===id);
    // if(userIndex === -1){
    //     return res.status(404).json({status: "User not found"});
    // // if user doesn't exist, send 404 response, stop execution
    // }
    // //update
    // users[userIndex] ={...users[userIndex],...body};// body contains new values coming from POSTMAN
    
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err) =>{
    //     if(err){
    //         return res.status(500).json({status: "error"});
    //     }
    //     return res.json({status: "success", updatedUser: users[userIndex]});
    // })
})
.delete(async(req,res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "success"});
    // const id= Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id ===id);
    // if(userIndex === -1){
    //     return res.status(404).json({status: "User not found"}); //404 Client mistake
    // }
    // const deletedUser = users.splice(userIndex,1);// it is an array of one [object] 
    // // splice() changes original array deletedUser is array, not object, splice return array [0]gives object
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err) =>{
    //     if(err){
    //         return res.status(500).json({status: "error"}); // 500 Server mistake
    //     }
    //     return res.json({status: "success,User deleted", deletedUser});
    // });
});

 
app.post('/api/users',async (req,res) => {
   // TODO: Create new user
   const body = req.body;
   if(!body || !body.first_name ||
    !body.last_name|| !body.email||
     !body.gender || !body.job_title){
    return res.status(404).json({err:"All fields are req..."});
}

    const result =  await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
   
    return res.status(201).json({msg: "success"});
});


app.listen(PORT,() => {
    console.log(`Server Started at Port ${PORT}`);
});




  //users.push({...body, id: users.length +1});
//    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err) => {
//     // json.stringify(users) converts JS array =>strings
    
//     if(err){
//         return res.status(500).json({status:"error",message:"failed to save user"});
//     }
//     return res.status(201).json({status:"success", id: users.length });
//    })
//   console.log("body",body);