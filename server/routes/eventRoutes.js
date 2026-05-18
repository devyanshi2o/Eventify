const express= require("express");
const Event=require("../models/event.model.js");
const router = express.Router();

//CREATE EVENT
router.post("/create",async(req,res)=>{
  try{
    const newEvent= new Event(req.body);
    await newEvent.save();

    res.status(201).json({
      message:"Event Created Succesfully0",
      newEvent,
    });
  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
  
});
//GET ALL EVENTS
router.get("/",async(req,res)=>{
  try{
    const events=await Event.find();
    res.status(200).json(events);
  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
});

//UPDATE EVENT
router.put("/:id",async(req,res)=>{
  try{
    const updatedEvent=await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    );
    res.status(200).json({
      message:"Event Updated",
      updatedEvent
    });
  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
});

//DELETE EVENT

router.delete("/:id",async(req,res)=>{
  try{
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message:"Event Deleted"
    });
  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
});

module.exports=router;