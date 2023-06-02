import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import {useNavigate} from 'react-router-dom';
import { useStateValue } from "./StateProvider";

function Subtotal  () {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
 
  return (
    <div className='Subtotal'>
        <CurrencyFormat 
        renderText={(value) => (
            <>
            {/* problem   */}
            <p>
                Subtotal ({basket.length} items):  <strong>{value}</strong>
            </p> 
            <small className='subtotal_gift'>
                <input type='checkbox' /> This order contains a gift
            </small>
            </> 
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayTypes={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <button onClick={e => navigate('/')}>Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;