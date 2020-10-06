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

export const listOrders = (userId,token) => {
    return fetch(`${API}/order/list/${userId}`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
//            "Content-type": "application/json",  sacamos esto por que necesitamos publicar fotos
            Authorization: `Bearer ${token}`
        },
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}



export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateOrderStatus = (userId,token,orderId,status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
           "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status,orderId})
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}