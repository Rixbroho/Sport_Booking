require('dotenv').config();
const express=require('express');
const { sequelize,connectDB } = require('./database/db');
const app=express();
const port=3000;
const bookingRoutes = require("./routes/bookingRoute");

const cors=require('cors');
app.use(cors({
    origin:['http://localhost:5173', 'http://localhost:5174'],
    // methods:['GET','POST','PUT','DELETE'],
    credentials:true
}));

app.use(express.json());
app.use('/api/user/',require('./routes/route'));
app.use('/api', require('./routes/venueRoute'));
app.use("/api", bookingRoutes);
// app.use('/api/user/',require('./routes/productRoute'));


app.get('/',(req,res)=>{
    res.json({message:'Welcome to the Home Page from backend! change vayo wow'});
});


const startServer=async()=>{
    await connectDB();
    await sequelize.sync({ alter:true });
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });
}

startServer();
