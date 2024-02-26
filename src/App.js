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

  if(localStorage.getItem('token') !== null) {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        check().then(data => {
            user.setIsAuth(true);
            user.setUser(true)
        }).finally(() => setLoading(false))
    },)
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
}

  

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
 
  );
})

export default App;
