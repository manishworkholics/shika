import React, { useEffect, useState } from 'react'
import Navbar from '../Template/Navbar'
import Home from './Home';
import { Link } from 'react-router-dom';

const Cutomer = () => {
  const URL = process.env.REACT_APP_URL;
  // const usertoken = sessionStorage.getItem('token')
  // if (!usertoken) {
  //   return <Home />
  // }

  const [customers, setCustomers] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  const getCustomer = () => {
    
    fetch(`${URL}/getcustomer`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setCustomers(data.data)
      })
  }

  useEffect(() => {
    getCustomer();
  }, [])
  // Function to filter customers based on input field value
  const filterCustomers = (value) => {
    if (!value) {
      return customers;
    }
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

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
            <div className='d-flex justify-content-between'>
            <input
        type="text"
        placeholder="Search Customer"
        value={filterValue}
        onChange={handleInputChange}
      />
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
                      <th>Pending Amount</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterCustomers(filterValue)?.map((val, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{val?.name}</td>
                          <td>{val?.mobile}</td>
                          <td>{val?.address}</td>
                          <td>{val?.businessAddress}</td>
                          <td>{val?.totalamount}</td>
                          <td>
                          <Link to={`/shika/edit-customer/${val?._id}`} state={{ data: val }} type="button" class="btn btn-warning mx-1" >Edit <span class="material-symbols-outlined">Edit</span></Link>
                          <Link to={`/shika/entryBycustomerId/${val?._id}`}  type="button" class="btn btn-warning mx-1 mt-2" >View All Entries </Link>
                          </td>
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