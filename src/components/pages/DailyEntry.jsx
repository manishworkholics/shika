import React, { useEffect, useState } from 'react';
import Navbar from '../Template/Navbar'
import Home from './Home';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";


const DailyEntry = () => {
  // const usertoken = sessionStorage.getItem('token')

  // if (!usertoken) {
  //   return <Home />
  // }
  const [data, setdata] = useState('')

  const getdata = () => {
    fetch('http://206.189.130.102:4243/Api/v/getremark')
      .then((res) => {
        return res.json()
      }).then((data) => {
        setdata(data)
      })
  }

  useEffect(() => {
    getdata();
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
                  <h2 className="banner-heading-h2">Daily Entry</h2>
                  <h3 className="banner-subheading-h3">Home <span className='mx-3'><i class="fa-solid fa-angle-right"></i></span>Daily Entry</h3>
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
              <Link type="button" className="btn btn-info my-1" to="/shika/add-entry" >Add  <span><i class="fa-solid fa-plus"></i></span></Link>
            </div>
            <div className="card tbl-card mt-3">
              <div className="table-responsive">
                <table className="table table-striped tbl-blue-theme">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Remark</th>
                      <th>Bill</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((val, index) => {
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <th>{val?.id?.name}</th>
                          <th>{dateFormat(`${val?.date}`, "mmmm dS, yyyy")}</th>
                          <th>{val?.remark}</th>
                          <th><img src={val?.image} alt="img" className='imgremark' /></th>
                          <th>
                            <Link to={`/shika/edit-entry/${val?._id}`} state={{ data: val,name:val?.id?.name }} type="button" class="btn btn-warning mx-1" >Edit <span class="material-symbols-outlined">Edit</span></Link>
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
  );
};

export default DailyEntry;
