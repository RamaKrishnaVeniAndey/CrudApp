const express=require("express");
const bodyparser=require("body-parser")
const cors=require("cors");
const mysql=require("mysql2");

const app=express();
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"mysql123",
    database:"cruddb",
})
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.get('/api/get',(req,res)=>{
    const sqlSelect = "select * from contact_details";
    db.query(sqlSelect,(error,result)=>{
        res.send(result);
    })
})
app.post("/api/post",(req,res)=>{
    const {name,email,contact} =req.body;
    const sqlInsert ="insert into contact_details(name,email,contact) values(?,?,?)";
        db.query(sqlInsert,[name,email,contact],(error,result)=>{
            console.log("error",error);
            console.log("result",result);
    })
})
app.delete("/api/remove/:id",(req,res)=>{
    const {id}=req.params;
    const sqlRemove ="delete from contact_details where id=?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})
app.get('/api/get/:id',(req,res)=>{
    const {id}=req.params
   
    const sqlSelect = "select * from contact_details where id=?";
    db.query(sqlSelect,id,(error,result)=>{
        res.send(result);
    })
})
app.put("/api/put/:id",(req,res)=>{
    const {id}=req.params;
    const {name,email,contact} =req.body;
    const sqlInsert ="update contact_details set name=?,email=?,contact=? where id=?";
        db.query(sqlInsert,[name,email,contact,id],(error,result)=>{
            console.log("error",error);
            console.log("result",result);
            res.send(result)
    })
})

app.get('/',(req,res)=>{
// //     const sqlInsert="insert into contact_details(name,email,contact) values('Navya','Navya123@gmail.com',9849023931)";
// //     db.query(sqlInsert,(error,result)=>{
// //     console.log("error",error);
// const sqlSelect="select * from contact_details";
// //     console.log("result",result);
// // })
// db.query(sqlSelect,(error,result)=>{
//     res.send(result);
})

// //res.send("Hello Express");
// })
app.listen(5000,()=>{
    console.log("server is running on port 5000");
})