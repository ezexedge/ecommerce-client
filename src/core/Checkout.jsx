import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {Link ,Redirect} from 'react-router-dom'

import {getProducts,getBraintreeClientToken,processPayment,createOrder} from './apiCore'
import {emptyCart} from './cartHelpers'
import Card from './Card'
import Dropln from "braintree-web-drop-in-react"
import {isAuthenticated} from '../auth'
const Checkout = ({products, setRun = f => f , run = false}) => {

    const [data,setData] = useState({
        success:false,
        clientToken: null,
        loading: false,
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

    const handleAddress = event => {
        setData({...data,address:event.target.value})
    }
    
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
                    debes iniciar sesion
                </button>
            </Link>
        )
    }

    let deliveryAddres = data.address
    
    const buy = () => {
        setData({ loading: true })
        let nonce
        let getNonce = data.instance
        .requestPaymentMethod()
        .then(response => {
           // console.log(data)
            nonce = response.nonce

          //  console.log('send ',nonce,getTotal(products))
           const paymentData = {
               paymentMethodNonce: nonce,
               amount: getTotal(products)
           } 

           processPayment(userId,token,paymentData)
           .then(response => {
               //console.log(response)
               //create order 

               const createOrderData = {
                   products: products, //props
                   transaction_id: response.transaction.id,
                   amount: response.transaction.amount,
                   address: deliveryAddres

               }
            createOrder(userId,token,createOrderData)
               .then(response => {
                   console.log(response)
                emptyCart(()=> {
                    console.log('carrito vacio')
                    setData({loading:false,success:true})
                    setRun(!run)
                   
                })  
               })

            //setData({...data,success: response.success})
         
               
        })
           .catch(error => { 
            console.log(error)
            setData({loading:false})

        })
           
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

                    <div className="gorm-group mb-3">
                        <label className="text-muted">domicilio para envios:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="ingresa tu domicilio."
                        />
                    </div>


                    <Dropln  options={{
                        authorization: data.clientToken,
                        paypal : {
                            flow: "vault"
                        }
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
            Muchas gracias por tu compra!
        </div>
    )

    const showLoading = (loading) => loading && <h2>Cargando...</h2>
    return (  
        <div>
            <h2>Total : ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
           {showCheckout()}
        </div>
    );  
}
 
export default Checkout;