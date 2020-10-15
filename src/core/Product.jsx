import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProducts,read,listRelated} from './apiCore'
import Card from './Card'


const Product = (props) => {
    const [product,setProduct] = useState({})
    const [relatedProduct,setRelatedProduct] = useState([])

    const [error, setError] = useState(false)

    const loadingSingleProduct = productId => {
        read(productId).then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                console.log(data)
                setProduct(data)
                listRelated(data._id).then(data => {
                    if(data.error){
                        setError(data.error)
                    }else{
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(()=>{
        const productId = props.match.params.productId
        loadingSingleProduct(productId)
    },[props])

    return ( 
        <Layout title={product.name} description={product && product.description && product.description.substring(0,50) + '....'} className="container-fluid">
            <p>Pagina de producto</p>

            <h2 className="mb-4">Producto</h2>
            <div className="row">
                <div className="col-8">
                
                    {product && product.description && <Card product={product} showViewProductButton={false} />}

                       
                </div>
                <div className="col-4">
                    <h4>Productos relacionados</h4>
                    {relatedProduct.map((p,i)=>(
                        <div className="mb-3">
                            <Card key={i} product={p}/>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
     );
}
 
export default Product;