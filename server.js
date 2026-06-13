const express = require('express');
const taskRoutes = require('./routes/taskRoutes')
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const connectDB = require('./db');
connectDB();

app.get('/', (req, res) => {
res.send("welcome to task manager");
});

app.use('/api/tasks',taskRoutes);

//404 handler
app.use((req,res)=>{
  res.status(404).json({
    success:false,
    message:`Route ${req.originalUrl} not found`
  })
})

//Error handler
app.use((err,req,res,next)=>{
  const status = err.status || 500
  res.status(status).json({
    success : false,
    message : err.message || "Server error"
  })
})

app.listen(PORT, ()=>{
console.log(`server is running on port ${PORT}`)
})