import  {Fragment} from 'react';
import React, { useState } from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router';

function Checkout  ()  {
  const navigate=useNavigate();
  const [{basket, user, drawer}, dispatch] = useStateValue();

  return (
    <Fragment>
    <div className='checkout'>
        <div className='checkout_left'>
            <img className='checkout_ad' src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg' />

        <div>
            <h3>Hello, {user?.email}</h3>
            <h2 className='checkout_title'>
                your shopping basket
            </h2>
        </div>
        <FinalProducts />
        </div>
      <div className='checkout_right'>
        <Subtotal />
       <h2>subtotal</h2>
      </div>
    </div>
    </Fragment>
  );
}

const FinalProducts = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <Fragment>
      {basket.map((item) => (
        <CheckoutProduct
          id={item.id}
          price={item.price}
          rating={item.rating}
          image={item.image}
          title={item.title}
        />
      ))}
    </Fragment>
  );
};

export default Checkout;
