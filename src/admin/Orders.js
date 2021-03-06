import React , {useState, useEffect} from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import { listOrders,getStatusValues ,updateOrderStatus} from './apiAdmin'
import moment from 'moment'

const Orders = () => {
    
    const [orders,setOrders] = useState([])

    const [statusValues,setStatusValues] = useState([])


    const {user,token} = isAuthenticated()

    const loadOrders = () => {

        listOrders(user._id,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setOrders(data)
            }
        })

    }

    const loadStatusValues = () => {

        getStatusValues(user._id,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setStatusValues(data)
            }
        })

    }

    useEffect(()=>{
        loadOrders()
        loadStatusValues()
    },[])

    const showInput = (key,value) => ( 
        <div className="input-group mb-2 mr-sm-2">

        <div className="input-group-prepend">


        <div className="input-group-text">
        {key}
        </div>
        <input type="text" value={value} className="form-control" readOnly />
        
        
        </div>
        
        </div>
    )

    const showOrdersLength = () =>{
        if(orders.length > 0) {
          return (
              <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
          )  
        }else{
            return <h1 className="text-danger">No orders</h1>
        }
    }
    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );
    
    //{JSON.stringify(orders)}  ponelo en el return para visualizar

    return (
        <Layout title="Orders" description={`Gready to add a new category?`} >
            <div  className="row">

            
                 <div className="col-md-8 offset-md-2" >
                      {showOrdersLength()}
                      {orders.map((o,oIndex) => {
                          return(
                              <div className="mt-5" key={oIndex} style={{borderBottom: '5px solid indigo'}}>
                              
                                <h2 className="mb-5">
                                
                                    <span className="bg-primary">
                                        order id : {o._id}
                                    </span>

                                </h2>

                                <ul className="list-group mb-2" >

                                    <li className="list-group-item" >
                                   
                                    {showStatus(o)}
                                   
                                   
                                   
                                    </li>
                                      <li className="list-group-item" >
                                           transation: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item" >
                                    amount : ${o.amount}
                                   </li>
                                   <li className="list-group-item" >
                                   Ordered By : ${o.user.name}
                                  </li>

                                  <li className="list-group-item" >
                                  Ordered on : {moment(o.createdAt).fromNow()}
                                 </li>
                                 <li className="list-group-item" >
                                 Delivery Address : {o.address}
                                </li>

                                </ul>

                                <h3 className="mt-4 mb-4 font-italic">

                                total productos {" "}
                                {o.products.length}

                                </h3>
                                    {o.products.map((p,pIndex)=> (
                                        <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                        
                                        >

                                        {showInput('Producto name',p.name)}
                                        {showInput('Producto price',p.price)}
                                        {showInput('Producto total',p.count)}
                                        {showInput('Producto id',p._id)}


                                        
                                        </div>
                                    ))}
                              
                              </div>
                          )
                      })}
                </div>
            
            </div>
        </Layout>
    )
}
 
export default Orders;
