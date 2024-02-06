import React from 'react'
import Navbar from '../Template/Navbar'
import Home from './Home';

const Cutomer = () => {
  // const usertoken = sessionStorage.getItem('token')
  // if (!usertoken) {
  //   return <Home />
  // }

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
              <button type="button" className="btn btn-info my-1" >Add <span><i class="fa-solid fa-plus"></i></span></button>
            </div>
            <div className="card tbl-card mt-3">
              <div className="table-responsive">
                <table className="table table-striped tbl-blue-theme">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Name</th>
                      <th>Number</th>
                      <th>Product</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    
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