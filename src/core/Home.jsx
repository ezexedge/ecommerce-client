import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'

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
        <Layout title="Home page" description="node react ecommerce" className="container-fluid">
                <h2 className="mb-4">New Arrivals</h2>
                <div className="row">
                    {productsByArrival.map((product, i)=>(
                        <Card key={i} product={product} />
                    ))}
                </div>

                <h2 className="mb-4">Best Sellers</h2>
                <div className="row">
                    { productsBySell.map((product, i)=>(
                        <Card key={i} product={product} />
                    ))}
                </div>
        </Layout>
     );
}
 
export default Home;