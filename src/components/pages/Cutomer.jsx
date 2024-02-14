import React, { useEffect, useState } from 'react'
import Navbar from '../Template/Navbar'
import Home from './Home';
import { Link } from 'react-router-dom';

const Cutomer = () => {
  // const usertoken = sessionStorage.getItem('token')
  // if (!usertoken) {
  //   return <Home />
  // }

  const [customer, setcustomer] = useState('')

  const getCustomer = () => {
    fetch('http://206.189.130.102:4243/Api/v/getcustomer')
      .then((res) => {
        return res.json()
      }).then((data) => {
        setcustomer(data)
      })
  }

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
                  <h2 className="banner-heading-h2">Customer</h2>
                  <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Customer</h3>
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
        <div className='row'>
          <div className='col-md-12'>
            <div className='d-flex justify-content-end'>
              <Link type="button" className="btn btn-info my-1" to="/shika/add-customer" >Add  <span><i class="fa-solid fa-plus"></i></span></Link>
            </div>
            <div className="card tbl-card mt-3">
              <div className="table-responsive">
                <table className="table table-striped tbl-blue-theme">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Address</th>
                      <th>Business Address</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer?.data?.map((val, index) => {
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <th>{val?.name}</th>
                          <th>{val?.mobile}</th>
                          <th>{val?.address}</th>
                          <th>{val?.businessAddress}</th>
                          <th>
                          <Link to={`/shika/edit-customer/${val?._id}`} state={{ data: val }} type="button" class="btn btn-warning mx-1" >Edit <span class="material-symbols-outlined">Edit</span></Link>
                          </th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>









    </>
  )
}



export default Cutomer