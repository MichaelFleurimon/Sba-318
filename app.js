const express =require('express');
const app = express();
const PORT = 5000;
///////
app.get('/',(req ,res) =>{
    res.send("hi I work");
})
///////
app.listen(PORT, (req,res) => {
   res.send();
  });