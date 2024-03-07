import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Template/Navbar'
import Home from './Home';

const EditCustomer = () => {

    const usertoken = sessionStorage.getItem('token')
    const location = useLocation();
    const { data } = location.state
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_URL;

    const [customer, setcustomer] = useState({ name: data.name, mobile: data.mobile, address: data.address, businessAddress: data.businessAddress })


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setcustomer({ ...customer, [name]: value })
    }


    // const handleSubmit = async () => {
    //     const { name, mobile, address, businessAddress } = customer;

    //     try {
    //         const response = await fetch(`http://206.189.130.102:4243/Api/v/editcustomer/${data._id}`, {
    //             method: 'PUT',

    //             body: JSON.stringify({ name, businessAddress, mobile, address })
    //         });

    //         if (response.ok) {
    //             alert("Update successfully");
    //             navigate('/shika/customer');
    //         } else {
    //             throw new Error('Failed to update customer');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert("An error occurred while updating customer");
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const { name, mobile, address, businessAddress } = customer;

        try {
            const response = await fetch(`${URL}/editcustomer/${data._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, businessAddress, mobile, address })
            });

            if (response.ok) {
                alert("Update successfully");
                navigate('/shika/customer');
            } else {
                throw new Error('Failed to update customer');
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while updating customer");
        }
    };
    if (!usertoken) {
        return <Home />
    }
    return (
        <>
            < Navbar />
            <div className="container-fluid p-0">
                <div className="page-banner">
                    <div className="banner-content-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="banner-heading-h2">Edit Customer</h2>
                                    <h3 className="banner-subheading-h3">Home<span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Customer<span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Edit Customer</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="banner-btm-img">
                        <img src={require("../img/banner-btm-img.png")} alt="" />
                    </div>
                </div>
            </div>

            <div className="container mb-5 edit-customer-card-container">
                <div className="card edit-customer-card">
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="card-heading">
                                <h4>Customer Details</h4>
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Cutomer Name :</label>
                                <input type="text" className="form-control" name="name" value={customer.name} onChange={handleChange} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Cutomer Number :</label>
                                <input type="text" className="form-control" name="mobile" value={customer.mobile} onChange={handleChange} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Cutomer Adress :</label>
                                <input type="text" className="form-control" name="address" value={customer.address} onChange={handleChange} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Business Adress :</label>
                                <input type="text" className="form-control" name="businessAddress" value={customer.businessAddress} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-info" onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCustomer