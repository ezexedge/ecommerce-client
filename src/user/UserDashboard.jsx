import React , {useState,useEffect} from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'
import moment from 'moment'



const Dashboard = () => {

    const [history,setHistory] = useState([])

//es un destructurin de un json
    const  {
        user: {_id,name,email,role}
    } = isAuthenticated()
    const token = isAuthenticated().token

    const init = (userId,token) => {
        getPurchaseHistory(userId,token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setHistory(data)
            }
        })
    }
    
    useEffect(()=>{
        init(_id,token)
    },[])




    const userLink = () => {
        return(
            <div className="card">

                <h4 className="card-header">Link de usuario</h4>
                 <ul className="list-group">

                        <li className="list-group-item">

                            <Link className="nav-link" to="/cart">Mi carrito</Link>

                        </li>
                        <li className="list-group-item">

                        <Link className="nav-link" to={`/profile/${_id}`}>cambiar perfil</Link>

                        
                        </li>

                </ul>
            </div>
        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
                     <h3 className="card-header">Informacion de usuario</h3>
                <ul className="list-group">

                        <li className="list-group-item">{name}</li>
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">{role === 1 ? 'Admin' : 'Usuario registrado'}</li>

                </ul>
            </div>
        )
    }

    const purchaseHistory = history => (
            <div className="card mb-5">
                <h3 className="card-header">historial de compras</h3>
                <ul className="list-group" >
                        <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>nombre del producto: {p.name}</h6>
                                                <h6>
                                                    precio del producto: ${p.price}
                                                </h6>
                                                <h6>
                                                    datos de la venta:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                        </li>

                </ul>
            </div>
    )

    return (
        <Layout title="usuario" description={`Hola ${name}`} className="container-fluid">
            <div  className="row">

                <div className="col-3" >
                {userLink()}
                </div>
                 <div className="col-9" >
                 {userInfo()}
                 {purchaseHistory(history)}
                </div>
            
            </div>
        </Layout>
    )
}


export default Dashboard