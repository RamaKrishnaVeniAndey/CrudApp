import React, { useEffect, useState } from 'react'
import './AddEdit.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast} from 'react-toastify'
const initialState={
    name:"",
    email:"",
    contact:""
}
function AddEdit() {
    const [state,setstate]=useState(initialState);
    const {name,email,contact}=state
    const navigate = useNavigate();
    const {id}=useParams();
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=>{
            setstate({...resp.data[0]})
        })
    },[id])
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(! name || !email||!contact){
            toast.error("Please provide value into each field")
        }
        else{
            if(!id){
            axios.post("http://localhost:5000/api/post",{name,email,contact})
            .then(()=>{
                setstate({name:"",email:"",contact:""})
            })
            .catch((err)=>{
                toast.error(err.response.data);
            })
            toast.success("Contact added successfully");
            setTimeout(()=>navigate('/'),500);
           }
           else{
            axios.put(`http://localhost:5000/api/put/${id}`,{name,email,contact})
            .then(()=>{
                setstate({name:"",email:"",contact:""})
            })
            .catch((err)=>{
                toast.error(err.response.data);
            })
            toast.success("Contact updated successfully");
            setTimeout(()=>navigate('/'),500);
           }
        }
    }
    const handleInputChange = (e) =>{
        const {name,value} =e.target;
        setstate({...state,[name]:value});
    }     
  return (
    <div style={{marginTop: '100px'}}>
    <form style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '400px',
        alignContent: 'center'
    }} onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' placeholder='Your Name....' value={name || ""} onChange={handleInputChange}/>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' placeholder='Your Email....' value={email||"" } onChange={handleInputChange}/>
        <label htmlFor='contact'>Contact</label>
        <input type='text' id='contact' name='contact' placeholder='Your Contact No....' value={contact||"" } onChange={handleInputChange}/>
        <input type='submit' value={id?"update": "Save"} /><br></br>
        <Link to="/">
            <input type='button' value='Back' />
        </Link>
    </form>
</div>
  )
}

export default AddEdit