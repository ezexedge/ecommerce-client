import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {Link ,Redirect} from 'react-router-dom'

import {getProducts,getBraintreeClientToken,processPayment} from './apiCore'
import Card from './Card'
import Dropln from "braintree-web-drop-in-react"
import {isAuthenticated} from '../auth'
const Checkout = ({products}) => {

    const [data,setData] = useState({
        success:false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token


    
    const getToken = (userId,token) => {
        getBraintreeClientToken(userId,token).then( data => {
            if(data.error){
                setData({...data,error: data.error})
            }else{
                setData({clientToken: data.clientToken})
            }
        })
    }

    useEffect(()=> {
        getToken(userId,token)
    },[])

    
    const getTotal = () => {
        return products.reduce((currentValue,nextValue)=>{
            return currentValue + nextValue.count * nextValue.price
        },0)
    }   
    const showCheckout = () =>{
          return  isAuthenticated() ? (
          <div>{showDropln()}</div>
        ): (
            <Link to="/signin">
                <button className="btn btn-primary">
                    Sign in to checkout
                </button>
            </Link>
        )
    }
    
    const buy = () => {
        let nonce
        let getNonce = data.instance
        .requestPaymentMethod()
        .then(data => {
           // console.log(data)
            nonce = data.nonce

          //  console.log('send ',nonce,getTotal(products))
           const paymentData = {
               paymentMethodNonce: nonce,
               amount: getTotal(products)
           } 

           processPayment(userId,token,paymentData)
           .then(response => {
               console.log(response)
               setData({...data,success: response.success})
           }
           
           )
           .catch(error => console.log(error))
           
        })
        .catch(error => {
          //  console.log('error:',error)
            setData({...data,error: error.message})
        })

    }

    const showDropln = () => (
        <div onBlur={()=> setData({...data,error:""})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <Dropln  options={{
                        authorization: data.clientToken
                    }}
                     onInstance={instance => (data.instance = instance)} />
                     <button onClick={buy} className="btn btn-success btn-block">Checkout</button>
                </div>
            ) : null}
        </div>
    )

    const showError = error => ( 
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

      const showSuccess = success => ( 
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            Thanks ! your payment was successful!
        </div>
    )

    return (  
        <div>
            <h2>Total : ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
           {showCheckout()}
        </div>
    );  
}
 
export default Checkout;