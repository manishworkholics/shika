import React, { useEffect, useState } from 'react'
import Navbar from '../Template/Navbar'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const AddEntry = () => {

    const navigate = useNavigate();


    const [data, setData] = useState({ name: '', date: '', remark: '' });
    const [filename, setfilename] = useState('')
    const [customer, setcustomer] = useState('')



    const getCustomer = () => {
        fetch('http://206.189.130.102:4242/Api/v/getcustomer')
            .then((res) => {
                return res.json()
            }).then((data) => {
                setcustomer(data)
            })
    }

    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    }

    const handleimageuopload = async (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        var requestOptions = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const fetchdata = axios.post(
            `http://206.189.130.102:4242/api/v1/admin/imageUpload_Use/imageUpload`,
            formData,
            requestOptions
        );
        const response = await fetchdata;
        if (response.status === 200) {
            setfilename(response?.data?.url);
            alert('image uploaded')
        } else {
            console.log('ERROR')
        }
    };

    const Submit = async (e) => {
        e.preventDefault();
        const { name, date, remark } = data;

        const fetchdata = fetch("http://206.189.130.102:4242/Api/v/insertremark",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name, date: date, remark: remark, image: filename
                }),
            });
        const response = await fetchdata;
        const responseData = await response.json();
        if (response.status === 200) {
            navigate("/shika/daily-entry");
        } else {
            console.error("Error:", responseData);
            alert("Internal Server Error");
        }
    };

    useEffect(() => {
        getCustomer();
    }, [])


    return (
        <>
            < Navbar />
            <div className="container-fluid p-0">
                <div className="page-banner">
                    <div className="banner-content-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="banner-heading-h2">Add Entry</h2>
                                    <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Daily Entry<span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Add Entry</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="banner-btm-img">
                        <img src={require("../img/banner-btm-img.png")} alt="" />
                    </div>
                </div>
            </div>
            <div className='container my-5 pb-5'>
                <div className="card edit-customer-card">
                    <div className='row'>
                        <div className="col-md-12 ">
                            <div className="card-heading">
                                <h4>Add Entry</h4>
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Cutomer Name :</label>
                                <select
                                    class="form-control"
                                    name="category"
                                    onChange={handelChange}
                                >
                                    <option value="" disabled selected hidden>
                                        Select Category
                                    </option>
                                    {customer?.data?.map((val, index) => {
                                        return (
                                            <option value={val._id} key={index}>
                                                {val.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Date :</label>
                                <input type="date" className="form-control" name="date" value={data.date} onChange={handelChange} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Remark :</label>
                                <input type="text" className="form-control" name="remark" placeholder='Remark (if any)' value={data.remark} onChange={handelChange} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Invoice Image :</label><br />
                                <img src='' alt="" className='imgremark' /> <br />
                                <input type="file" name="image" id="" className="form-control" onChange={handleimageuopload} />
                                {/* <br />
                                <label htmlFor="name" className="form-label">Uploaded image :</label><br />
                                <img src={filename} alt="" className='imgremark' onChange={handelChange} /> <br /> */}
                            </div>
                            <button type="submit" className="btn btn-info" onClick={Submit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AddEntry