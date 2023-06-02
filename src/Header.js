import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from "react-router-dom";
import {useStateValue} from './StateProvider';
import { auth } from './firebase';
import Checkout from "./Checkout";

function Header () {

   const [{basket, user}, dispatch] = useStateValue();

   const handleAuthentication = () => {
      if (user) {
         auth.signOut();

      }
   }


  return (
    <div className='header'>
      <Link to='/'>
      <img className='header_logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'/>
      </Link>
       
        
        <div className='header_search'>
           <input className='header_searchInput' type='text' />
           <SearchIcon className="header_searchIcon" />
        </div>

        <div className='header_nav'>

         <Link to={!user && '/login'}>
        <div onClick={handleAuthentication}  className='header_option'>
         
           <span className='header_optionLineOne'>{user ? user.email : 'hello guest'}</span>
           <span className='header_optionLineTwo'>{user ? 'sign out' : 'sign In'}</span> 
            
        </div>
        </Link>

        <div className='header_option'>
        <span className='header_optionLineOne'>Returns</span>
           <span className='header_optionLineTwo'>& Orders</span> 
            
        </div>
        <div className='header_option'>
        <span className='header_optionLineOne'>Your</span>
           <span className='header_optionLineTwo'>Prime</span> 
            
        </div>

         <Link to='/checkout'>
        <div className='header_optionBasket'>
           <ShoppingCartIcon />
        <span className='header_optionLineTwo header_basketCount'>
            {basket?.length} {/*if basket value will undefine any case it wont freakout,it will handle the error gracefully */}
        </span>
        </div>
        </Link>  
        

    </div>

    </div>
  );
}

export default Header;
