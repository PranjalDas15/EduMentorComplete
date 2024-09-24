import mongoose from "mongoose";

export const db = ()=> {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "EduMentor"
    }).then(()=> {
        console.log("Connected to MongoDB")
    }).catch(err=>{
        console.log("Not connected to MongoDB")
    })
};