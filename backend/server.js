const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes= require("./routes/userRoutes");
const noteRoutes= require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewear/errorMiddlewear");



const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("API is Running");
})


// app.get('/api/notes',(req,res)=>{
//     res.json(notes);
// })


app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);


// app.get('/api/notes/:id',(req,res)=>{
//     const note=notes.find((n)=>n._id==req.params.id);
//     res.send(note);
// })

app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));