import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import {getCategories , getFilteredProducts} from './apiCore'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'

import {prices} from './fixedPrices'
const Shop = () => {

    const [myFilters,setFilters] = useState({
        filters: {category: [],price: []}
    })

    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)
    const [limit,setLimit] = useState(3)
    const [skip,setSkip] = useState(0)
    const [size,setSize] = useState(0)

    const [filteredResults,setFilteredResults] = useState([])


    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data)
            }
        })
    }

    const loadFilteredResults = (newFilters) => {
     //   console.log(newFilters)

     getFilteredProducts(skip,limit,newFilters).then(data=> {
         if(data.error){
             setError(data.error)
         }else{
            setFilteredResults(data.data)
            console.log(data)
            setSize(data.size)
            setSkip(0)
         }
     })
    }

    const loadMore = () => {
        //   console.log(newFilters)
        let toSkip = skip + limit

        getFilteredProducts(skip,limit,myFilters.filters).then(data=> {
            if(data.error){
                setError(data.error)
            }else{
               setFilteredResults([...filteredResults,...data.data])
               setSize(data.size)
               setSkip(toSkip)
            }
        })
       }

       const loadMoreButton = () => {
           return size > 0 && size >= limit && (
            <button onClick={loadMore} className="btn btn-warning mb-5">Ver mas</button>
           )
       }



    useEffect(()=>{
        init()
        loadFilteredResults(skip,limit,myFilters.filters)
        console.log(myFilters)
    },[])


    const handleFilters = (filters,filterBy) => {
        console.log(myFilters)
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters

        if(filterBy === "price"){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)
        setFilters(newFilters)
    }


    const handlePrice = value => {
        const data = prices
        let array = []
        for(let key in  data){
            if(data[key]._id  === parseInt(value)){
                array = data[key].array
            }
    
        }
        return array
    }


    return ( 
        <Layout title="Shop page" description="Search and find books" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>filtrar por categoria</h4>
                    <ul>
                    <Checkbox categories={categories} handleFilters={filters => handleFilters(filters,'category')} />

                    </ul>

                    <h4>filtrar por rango de precio</h4>
                    <div>
                    <RadioBox prices={prices} handleFilter={filters => handleFilters(filters,'price')} />

                    </div>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Productos</h2>
                    <div className="row">
                        {filteredResults.map((product,i)=>(
                                <div key={i} className="col-4 mb-3">
                                <Card  product={product} />
                                </div>             
                       ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
     );
}
 
export default Shop;