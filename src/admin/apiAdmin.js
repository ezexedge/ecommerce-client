import {API} from '../config'
export const createCategory = (userId,token,category) => {
return fetch(`http://localhost:8000/api/category/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}


export const createProduct2 = (userId,token,product) => {
return fetch(`http://localhost:8000/api/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
//            "Content-type": "application/json",  sacamos esto por que necesitamos publicar fotos
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}



export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}