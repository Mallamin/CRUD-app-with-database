const { create } = require('domain')
const { json, response } = require('express')
const express = require('express')
const app= express()
const PORT= 3000

//Setting up mongoose
const mongoose = require('mongoose')
const connectionString='mongodb://localhost:27017/addressapp'
app.use (express.json())
mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false

    },(err)=>{
        if (err){
            console.log(err)
        } else{
            console.log('Database connected')
        }
    
})
//Creating a schema
const addressSchema = new mongoose.Schema({
    name:String,
    email:String,
    country:String
})
const Address = mongoose.model('Address', addressSchema)

//POST request /address to create a new address
app.post("/address", function(req, res){

})

// Get request to / address to fetch all addresses 
app.get("./address",(req, res)=>{
})
    //Fetch all addresses
    Address.find({},(err,addresses)=>{
        if (err){
            return res.status(500).json({message:err})
        } else{
            return res.status(200).json({addresses})
        }
    })    

Address.create({
    name:req.body.name,
    email:req.body.email,
    country:req.body.country

},(err, newAddress)=>{
if (err){ 
    return res.status(500).json({message:err})

} else{
    return res.status(500).json ({message:"New address created",newAddress})
}
})
// Send response to client
// Get request to /address/: to fetch the address
app.get("/address/:id",(req, res)=>{



Address.findById(req.params.id,(err, address)=>{
    if (err){
        return res.status(500).json({message:err})
        }
        else if (!address){
            res.status(404).json({message:"wrong address"})
    }
     else{
        return res.status(200).json({address})
    }
})
})
// PUT request to /address/: to update address 
app.put("/address/:id",(req, res)=>{
    Address.findByIdAndUpdate(req.params.id,{
       name: req.body.name,
       country:req.body.country 
    },(err,address)=>{
        if (err){
            return res.status(500).json({message:err})
        } else if (!address){
            return res.status(404).json({message:"wrong address"})
        } else{
            address.save((err, saveAddress)=>{
                if (err){
                    return res.status(400).json({message:err})
                } else{
                    res.status(200).json({message:"Address updated"})
                }
            });

        } 
    })

})

// DELETE REQUEST to /address/: to delete
app.delete("/address",(req,res)=>{
    findByIdAndDelete(req.params.id),(err,address)=>{
        if (err){
            return res.status(500).json({message:err})
        }
        else if (!address){
            return res.status(404).json({message:"wrong book"})
        }
        else{
            return res.status(200).json({message:"address deleted permanently"})
        }
    }
})
app.listen(PORT,()=>console.log(`App is listening on port ${PORT}`))
