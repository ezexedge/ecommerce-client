import React , {useState} from 'react';
import {Link ,Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem,updateItem,removeItem} from './cartHelpers'

const Card = ({product, showViewProductButton = true, showAddToCartButton = true,cartUpdate=false,showRemoveProductButton=false}) => {
    const [redirect,setRedirect] = useState(false)
    const [count,setCount] = useState(product.count)
    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <button className="btn btn-success mt-2 mb-2 mr-3">
                    Ver Producto
                </button>
            ) 
        )
    }

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value)

        if(event.target.value >= 1){
            updateItem(productId ,event.target.value)
        }
    }
    const addToCart = () => {
        addItem(product,()=>{
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = showAddToCartButton => {
        return(
            showAddToCartButton && ( 
            <button onClick={addToCart} className="btn btn-outline-success  mt-2 mb-2">
            Agregar a carro
        </button>
            )
        )
    }

    const showRemoveButton = showRemoveProductButton => {
        return(
            showRemoveProductButton && ( 
            <button onClick={()=> removeItem(product._id)} className="btn btn-outline-danger mt-2 mb-2">
            Eliminar Producto
        </button>
            )
        )
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Ajustar cantidad</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
            </div>
        </div>
    }

    const showStock = (quantity) => {
        return quantity > 0 ? <span className="badge badge-primary badge-pill">Hay stock</span> : <span className="badge badge-primary badge-pill">No hay stock</span>
    }
    return(
       
            <div className="card">
                  <div className="card-header name">{product.name}</div>
                  <div className="card-body">
                      {shouldRedirect(redirect)}
                      <ShowImage item={product} url="product" />
                      <p className="lead mt-2" >{product.description}</p>
                        <p className="black-10">${product.price}</p>
                        <p className="black-8">Categoria: {product.category && product.category.name}</p>
                        <p className="black-8">
                            creado  {moment(product.createdAt).fromNow()}
                        </p>

                        {showStock(product.quantity)}
                            <br/>
                        <Link to={`/product/${product._id}`}>
                        
                                {showViewButton(showViewProductButton)}
                        
                        </Link>

                        {showAddToCart(showAddToCartButton)}
                        {showRemoveButton(showRemoveProductButton)}
                        {showCartUpdateOptions(cartUpdate)}
                  </div>
            </div>
 
    )
}

export default Card