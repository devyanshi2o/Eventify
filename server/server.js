const express = require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MOGO_URL)
.then(()=> console.log("Mongoose Connected"))
.catch((err)=>console.log(err));

app.get("/",(req,res)=>{
  res.send("Server Running");
});

const userRoutes=require("./routes/userRoutes");
app.use("/api/users",userRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});