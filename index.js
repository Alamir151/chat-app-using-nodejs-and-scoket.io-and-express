const { log } = require('console');
const { argv } = require('process');
const bodyParser = require("body-parser")
const express=require('express');


const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));





const server=require('http').Server(app);
const io=require('socket.io')(server);
const port=3000;
app.set('view engine', 'ejs');
server.listen(port,()=>{
console.log(`server is running on port ${port}`);
});

// app.use(express.urlencoded())


// app.get("/main",(req,res)=>{
// const {name}=req.body;
//     console.log(name);
//     res.render(__dirname+'/views/index',{name});
// });
app.post('/main', (req, res) => {
    const name = req.body.name||"Unknown Person";
    console.log(name)
    // do something with the request data
    console.log(name);
    res.render(__dirname+'/views/index',{name});
  });

  //login page to enter you name
app.get("/",(req,res)=>{
    
    res.render(__dirname+'/views/login');
});
//langauges chat pages 
app.get("/javascript",(req,res)=>{
    const name=req.body||"Unknown";
    res.render(__dirname+'/views/javascript',{name});
});
app.get("/css",(req,res)=>{
    const name=req.params||"Unknown";
    res.render(__dirname+'/views/css',{name});
});
app.get("/swift",(req,res)=>{
    const name=req.body||"Unknown";
    res.render(__dirname+'/views/swift',{name});
});
const tech=io.of('/tech');


tech.on("connection",(socket)=>{
    socket.on("join",(data)=>{
        
        socket.join(data.room);
        tech.in(data.room).emit('message',`New User Joined ${data.room} room.`);
    })
socket.on('message',(data)=>{
console.log(`message: ${data.message} `);
tech.in(data.room).emit('message',data.message);
});
socket.on('disconnect',()=>{
    console.log('user disconnected');
    tech.emit('message','user disconnected');
})
})