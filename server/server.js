const express = require('express');




const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("This is server")
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})