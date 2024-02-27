import React from 'react'
import Navbar from '../Template/Navbar'
import Home from './Home';


const Reports = () => {
  // const usertoken = sessionStorage.getItem('token')
  const URL = process.env.REACT_APP_URL;

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
                  <h2 className="banner-heading-h2">Reports</h2>
                  <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Reports</h3>
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
         




        </div>
      </div>
    </>
  )
}

export default Reports