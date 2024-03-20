import React, { useEffect, useState } from 'react';
import Navbar from '../Template/Navbar'
import Home from './Home';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";


const DailyEntry = () => {
  const URL = process.env.REACT_APP_URL;
  const usertoken = sessionStorage.getItem('token')


  const [data, setdata] = useState('')

  const getdata = () => {
    fetch(`${URL}/getremark`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setdata(data)
      })
  }

  useEffect(() => {
    getdata();
  }, [])

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    // Add one day
    date?.setDate(date?.getDate() + 1);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date?.toLocaleDateString('en-US', options);
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
                      <th>Amount</th>
                       <th>Remark</th>
                      <th>For Date</th>
                      <th>Created Date</th>
                      <th>Bill</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((val, index) => {
                      return (
                        <tr>
                          <td className={val?.amount_given_To_user ? 'tb_bg_red' : val?.amount_given_By_user ? 'tb_bg_green':'tb_bg_blue'}>{index + 1}</td>

                          <td>  <Link to={`/shika/entryBycustomerId/${val?.id?._id}`} className="text-black" >{val?.id?.name} </Link>
                          </td>
                          <td>{val?.amount}</td>
                          <td>{val?.remark}</td>
                          {/* {val?.date.split('T')[0]} */}
                          <td> {val?.date? formatDate2(val?.date?.split('T')[0]):"No Date Selected"}</td>
                          <td> {formatDate2(val?.createdAt?.split('T')[0])}</td>
                        
                          {/* <td> {dateFormat(`${val?.createdAt}`, "mmmm dS, yyyy")}</td> */}
                          <td><img src={val?.image} alt="img" className='imgremark' /></td>
                          <td>
                            <Link to={`/shika/edit-entry/${val?._id}`} state={{ data: val, name: val?.id?.name }} type="button" class="btn btn-warning mx-1" >Edit <span class="material-symbols-outlined">Edit</span></Link>
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
  );
};

export default DailyEntry;
