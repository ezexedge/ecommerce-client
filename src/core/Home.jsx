import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'

const Home = () => {
        const [productsBySell,setProducsBySell] = useState([])
        const [productsByArrival,setProducsByArribal] = useState([])
        const [error,setError] = useState(false)

        const loadProductBySell = () => {
            getProducts('sold').then(data => {
                if(data.error){
                    setError(data.error)
                }else{
                    setProducsBySell(data)
                }
            })
        }

        const loadProductByArrival = () => {
            getProducts('createdAt').then(data => {
                if(data.error){
                    setError(data.error)
                }else{
                    setProducsByArribal(data)
                }
            })
        }

    useEffect(()=>{
        loadProductBySell()
        loadProductByArrival()
    },[])

    return ( 
        <Layout title="Membresias xbox" description="venta de membresias xbox" className="container-fluid">
            <Search/>
                <h2 className="mb-4">Recien ingresados</h2>
                <div className="row">
                    {productsByArrival.map((product, i)=>(
                       <div key={i} className="col-4 mb-3">
                            <Card  product={product} />
                       </div>
                    ))}
                </div>

                <h2 className="mb-4">Mas vendidos</h2>
                <div className="row">
                    { productsBySell.map((product, i)=>(
                         <div key={i} className="col-4 mb-3">
                         <Card  product={product} />
                    </div>
                    ))}
                </div>
        </Layout>
     );
}
 
export default Home;