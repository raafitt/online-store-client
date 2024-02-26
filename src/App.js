import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "./index";
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";
import { fetchTypes, fetchBrands } from "./http/deviceApi";


const App=observer(()=>{

  const {user}=useContext(Context)
  
  const[loading, setLoading]=useState(true)


  const getTypes=async()=>{
    return await fetchTypes()
  }

  useEffect(()=>{
    if(localStorage.getItem('token')!=='null'){
      console.log('no null')
      check().then(()=>{
        user.setIsAuth(true)
      }).finally(()=>setLoading(false))
    } else{
      console.log('null')
      localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYWYiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDg5NTY3MDAsImV4cCI6MTcwOTA0MzEwMH0.4CGljFFxI9Rw3oD-RMLIzUFHmUL0NQvq9HjSjAjnUUg')
      setLoading(false)
    }
    
  },[])

  if(loading){
    return <Spinner animation="grow"/>
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
 
  );
})

export default App;
