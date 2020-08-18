import React , {useState} from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {createCategory} from './apiAdmin'


const AddCategory = () => {
    const [name,setName] = useState('')
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)


    const {user,token} = isAuthenticated()


    const handleChange = (e) => {

        setError('')
        setName(e.target.value)


    }
    const clickSubmit = (e) => {

        e.preventDefault()
        setError('')
        setSuccess(false)
//el name va entre llaves por que es un objeto que luevo lo convertimos en un json 
//importante que lleve llaves
        createCategory(user._id, token ,  {name})
        .then(data => {
            if(data.error){
                setError(true)
            }else{
                setError('')
                setSuccess(true)
            }
        })

    }

    const newCategoryForm = () => ( 
        <form  onSubmit={clickSubmit}>
            <div className="form-group" >
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus />
            </div>
                            <button className="btn btn-primary">Create category</button>

        </form>
    )


    const showSuccess = () => {
        if(success){
            return <h3 className="text-success">{name} is created</h3>
        }
    }

       const showError = () => {
        if(error){
            return <h3 className="text-danger">Error la categoria debe ser unica</h3>
        }
    }

     return (
        <Layout title="Add new category" description={`G'day ${name},ready to add a new category?`} >
            <div  className="row">

            
                 <div className="col-md-8 offset-md-2" >
                        {showError()}
                        {showSuccess()}
                        {newCategoryForm()}
                </div>
            
            </div>
        </Layout>
    )


}
 
export default AddCategory;