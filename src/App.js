import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route, }
from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

 
import Orders from './Orders';




function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
//will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('The USER IS >>>>', authUser);

       if (authUser){
        // the user just login
         dispatch({
          type: 'SET_USER',
          user: authUser
         })
       }else{
        //user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
       }

    })
  }, [])

  return (
    <Router>
    <div className="app">
    <Header/>
    
      <Routes>
      
      <Route path='/login' element={<Login />}/>
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/' element={<Home />}/>
      <Route path='/payment' element={<Payment />} />
      <Route path='/orders' element={<Orders />} />
     
     
      
      
      
      </Routes>
    </div>
    </Router>
  );
}

export default App;
