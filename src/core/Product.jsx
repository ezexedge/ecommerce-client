import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProducts,read} from './apiCore'
import Card from './Card'


const Product = (props) => {
    const [product,setProduct] = useState({})
    const [error, setError] = useState(false)

    const loadingSingleProduct = productId => {
        read(productId).then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)
            }
        })
    }

    useEffect(()=>{
        const productId = props.match.params.productId
        loadingSingleProduct(productId)
    },[])

    return ( 
        <Layout title={product.name} description={product && product.description && product.description.substring(0,50) + '....'} className="container-fluid">
            <p>Product page</p>

            <h2 className="mb-4">Single Product</h2>
            <div className="row">
            <div className="col-4 mb-3">
            {product && product.description && <Card product={product} showViewProductButton={false} />}

                       </div>
            </div>
        </Layout>
     );
}
 
export default Product;