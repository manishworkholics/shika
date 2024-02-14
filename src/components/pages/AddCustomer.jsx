import React, { useState } from 'react'
import Navbar from '../Template/Navbar'
import { useNavigate } from 'react-router-dom'



const AddCustomer = () => {

    const navigate = useNavigate();
    const [data, setdata] = useState({ name: '', mobile: '', address: '', businessAddress: '' })



    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setdata({ ...data, [name]: value })
    }

    const submit = async (e) => {
        e.preventDefault();
        const { name, mobile, address, businessAddress } = data
        const fetchData = fetch('http://206.189.130.102:4243/Api/v/insertcustomer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, mobile: mobile, address: address, businessAddress: businessAddress })
        });
        const response = await fetchData;
        const responseData=await response.json();
         if (response.status === 200) {
            navigate("/shika/customer");
        } else {
            console.error("Error:", responseData);
            alert("Internal Server Error");
        }
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
                                    <h2 className="banner-heading-h2">Add Customer</h2>
                                    <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Customer<span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Add Customer</h3>
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
                                <input type="text" className="form-control" name="name" value={data.name} onChange={handleChange} placeholder='Enter name' />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Cutomer Number :</label>
                                <input type="text" className="form-control" name="mobile" value={data.mobile} onChange={handleChange} placeholder='Enter contact no.' />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Cutomer Adress :</label>
                                <input type="text" className="form-control" name="address" value={data.address} onChange={handleChange} placeholder='Enter address' />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Business Adress :</label>
                                <input type="text" className="form-control" name="businessAddress" value={data.businessAddress} onChange={handleChange} placeholder='Enter business address' />
                            </div>
                            <button type="submit" className="btn btn-info" onClick={submit} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AddCustomer