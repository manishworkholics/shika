import React, { useState } from 'react'
import Navbar from '../Template/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";



const Editentry = () => {

    const location = useLocation();
    const { data, name } = location.state
    const navigate = useNavigate();

    const [filename, setfilename] = useState('');

    const [editremark, seteditremark] = useState({ name: data.name, date: data.date, remark: data.remark, image: data.image })


    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        seteditremark({ ...editremark, [name]: value })
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
            //alert(response?.data?.url);
            alert('image uploaded')
        } else {
            console.log('ERROR')
        }
    };

    const handleSubmit = async () => {
        const { date, remark, image } = editremark
        const fetchdata = fetch(`http://206.189.130.102:4242/Api/v/updateremarkid/${data._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: date, remark: remark, image: filename ? filename : image })
        })
        const response = await fetchdata;
        if (response.status === 200) {
            alert("Update successfully");
            navigate('/shika/daily-entry')
        } else {
            alert("Invalid Credentials");
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
                                    <h2 className="banner-heading-h2">Edit Entry</h2>
                                    <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Daily Entry<span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Edit Entry</h3>
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
                                <h4>Edit Entry</h4>
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Cutomer Name :</label>
                                <input type="text" className="form-control" name="name" value={name} placeholder='Enter contact no.' />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Date :</label>
                                <input type="date" className="form-control" name="date" value={new Date(editremark.date).toISOString().split('T')[0]} placeholder='Enter contact no.' onChange={handelChange} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Remark :</label>
                                <input type="text" className="form-control" name="remark" value={editremark.remark} placeholder='Enter address' onChange={handelChange} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label">Invoice Image :</label><br />
                                <img src={editremark.image} alt="" className='imgremark' /> <br />
                                <br />
                                <input type="file" name="image" id="" className="form-control" onChange={handleimageuopload} />
                                {/* <br />
                                <label htmlFor="name" className="form-label">Uploaded image :</label><br />
                                <img src={filename} alt="" className='imgremark' onChange={handelChange} /> <br /> */}
                            </div>
                            <button type="submit" className="btn btn-info" onClick={handleSubmit} >Update</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Editentry