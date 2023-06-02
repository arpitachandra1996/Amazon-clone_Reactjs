import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';

import { CardElement,  } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from 'axios';
import { db } from './firebase';

function Payment  ()  {
  const [{basket, user}, dispatch] = useStateValue();
  const navigate = useNavigate();

  

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(''); 
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useState(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //Stripe expects the total in a currencies subunits
        url: '/payments/create?total=${getBasketTotal(basket) * 100}'
      });
      setClientSecret(response.data.clientSecret)
    };
    getClientSecret();
  }, [basket]);

  

  const handleSubmit = e => {
   //after one click of buy button it'll block ,we cant click it multiple times

   
   
    }
   
  const handleChange = e => {
    //Listen for changes in the Card details
    //and display any errors as the customer types their card details
   
  }

  return (
    <div className='payment'>
        <div className='payment_container'>
         <h1> 
        Checkout (<Link to='/checkout'>{basket?.length} item</Link>) {/*after clicking the number of items, it will back to the checkout page*/}
         </h1> 
            {/* Payment section-delivery address */}
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment_address'>
                     <p>{user?.email}</p>
                     <p>123 React Lane</p>
                     <p>Los Angles, CA</p>
                </div>
            </div>
            {/* Payment sec-review item */}
            <div className='payment_section'>
              <div className='payment_title'>
                <h3>Reveiw items and delivery</h3>
              </div>
             <div className='payment_items'>
                {basket.map(item => (
                    <CheckoutProduct 
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    />
                ))}
            </div> 
            </div>
            {/* payment sec-payment method */}
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>payment method</h3>
                </div>
                <div className='payment_details'>
                    <form>
                      <CardElement />
                      </form>
                      <div className='payment_priceContainer'>
                        <CurrencyFormat 
                        renderText={(value) => (
                          <h3>Order Total: {value}</h3>
                        )}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        />
                        <button disabled={processing || disabled || succeeded}></button>
                        <span>{processing ? <p>Processing</p> :
                        'Buy Now'}</span>
                      </div>

                      {/* Errors */}
                      {error && <div>{error}</div>}

                     
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Payment
