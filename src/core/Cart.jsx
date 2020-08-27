import React,{useState,useEffect} from 'react';
import {Link ,Redirect} from 'react-router-dom'
import Layout from './Layout'
import {getCart,removeItem} from './cartHelpers'
import Card from './Card'
import Search from './Search'
import Checkout from './Checkout'

const Cart = () => {
    const [items,setItems] = useState([])
    
    useEffect(()=>{
        setItems(getCart())
    },[items])


    const showItems = items => {
        return(
            <div>
                <h2>your cart hast {`${items.length}`} items</h2>

                <hr/>

                {items.map((product,i)=>(<Card key={i} product={product} 
                showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true}/>)
                )}
            </div>
        )
    }

    const noItemsMassage = () => (
        <h2>your cart is empty <br/> <Link to="/shop">Continue shiopping</Link></h2>
    )

    return ( 
        <Layout title="Shopping cart" description="agrega articulos al carro" className="container-fluid">
            <Search/>

        <div className="row">
            <div className="col-6">
                {items.length > 0 ? showItems(items) : noItemsMassage()}
            </div>

            <div className="col-6">
                <p>Show checkout options/shipping address/total/update quantity</p>
            <h2 className="mb-4">Your cart summary</h2>

            <hr/>
            <Checkout products={items} />

            </div>
        </div>
        </Layout>
     );
}
 
export default Cart;