import React, { useEffect, useState } from "react";
import Navbar from "../Template/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loaderimg from "../../assets/loader.gif";

import Select from 'react-select';
import Home from "./Home";

const AddEntry = () => {
  const URL = process.env.REACT_APP_URL;

  const usertoken = sessionStorage.getItem('token')
  const navigate = useNavigate();

  const [data, setData] = useState({
    id: "",
    date: "",
    remark: "",
    amount: "",
  });
  const [filename, setfilename] = useState("");
  const [customer, setcustomer] = useState("");
  const [useramount, setuseramount] = useState(0);
  // const [dummyforchckdropdown, setdummyforchckdropdown] = useState('');
  // const [pendingAmt, setpendingAmt] = useState(0);
  const [showloader, setShowLoader] = useState("none");
  const [amount_given_To_user, setamount_given_To_user] = useState(false);
  const [amount_given_By_user, setamount_given_By_user] = useState(false);
  // const options = [
  //   { value: '1', label: 'Option 1' },
  //   { value: '2', label: 'Option 2' },
  //   { value: '3', label: 'Option 3' },
  //   { value: '4', label: 'Option 4' },
  //   { value: '5', label: 'Option 5' }
  // ];
  const [options, setOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange2 = selectedOption => {
 
    setSelectedOption(selectedOption?.value);
    // alert(selectedOption?.value);
    getCustomerdetailById(selectedOption?.value);
    console.log(`Option selected:`, selectedOption);
    // Perform further actions with the selected option
   
   
  };

  const getCustomer = () => {
    fetch(`${URL}/getcustomer`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setcustomer(data);
        const transformedOptions = data?.data?.map(item => ({
          value: item._id,
          label: item.name
        }));
        // Set the options state with the transformed data
        setOptions(transformedOptions);
      });
  };
  const getCustomerdetailById = (id) => {
    fetch(`${URL}/getCustomerbyId/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setuseramount(data?.data?.totalamount);
      });
  };

  const handelChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "id") {
      getCustomerdetailById(value);
    }
    if (name === "amttype") {
      if (value === "amount_given_To_user") {
        setamount_given_To_user(true);
        setamount_given_By_user(false);
      }
      if (value === "amount_given_By_user") {
        setamount_given_To_user(false);
        setamount_given_By_user(true);
      }
      if (value === "NoAmount") {
        setamount_given_To_user(false);
        setamount_given_By_user(false);
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleimageuopload = async (e) => {
    setShowLoader("block");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    var requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const fetchdata = axios.post(
      `${URL}/admin/imageUpload_Use/imageUpload`,
      formData,
      requestOptions
    );
    const response = await fetchdata;
    if (response.status === 200) {
      setShowLoader("none");
      setfilename(response?.data?.url);
      alert("image uploaded");
    } else {
      setShowLoader("none");
      console.log("ERROR");
    }
  };
  // console.log(amount_given_To_user);
  // console.log(amount_given_By_user);
  const Submit = async (e) => {
    e.preventDefault();
    const { id, date, remark, amount } = data;
    if (amount_given_By_user) {
      if (amount > useramount) {
        alert(`Please select Less Amount .Recovery Amount Required ${useramount}`);
        return;
      }
    }
    // console.log(amount_given_To_user);
    // console.log(amount_given_By_user);

    const fetchdata = fetch(`${URL}/addremark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedOption,
        // id: id,
        date: date,
        remark: remark,
        amount: amount,
        image: filename,
        amount_given_To_user: amount_given_To_user,
        amount_given_By_user: amount_given_By_user,
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
  }, []);

  if (!usertoken) {
    return <Home />
  }


  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        <div className="page-banner">
          <div className="banner-content-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="banner-heading-h2">Add Entryyy</h2>
                  <h3 className="banner-subheading-h3">
                    Home{" "}
                    <span className="mx-3">
                      <i class="fa-solid fa-angle-right"></i>
                    </span>
                    Daily Entry
                    <span className="mx-3">
                      <i class="fa-solid fa-angle-right"></i>
                    </span>
                    Add Entry
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-btm-img">
            <img src={require("../img/banner-btm-img.png")} alt="" />
          </div>
        </div>
      </div>
      <div className="container my-5 pb-5">
        <div className="card edit-customer-card">
          <div className="row">
            <div className="col-md-12 ">
              <div className="card-heading">
                <h4>Add Entry </h4>
              </div>

              <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label">
                  Cutomer Name :
                </label>
                <Select
                  value={selectedOption}
                  name="id" 
                  onChange={handleChange2}
                  options={options}
                  isSearchable={true}
                  class="form-control"
                  placeholder="Search..."
                />
                {/* <select class="form-control" name="id" onChange={handelChange}>
                  <option value="" disabled selected hidden>
                    Select Customer name
                  </option>
                  {customer?.data?.map((val, index) => {
                    return (
                      <option value={val._id} key={index}>
                        {val.name}
                      </option>
                    );
                  })}
                </select> */}
              </div>
              <div
                className="loader-container "
                style={{ display: showloader }}
              >
                <img src={loaderimg} alt="" className="loaderImage" />
              </div>
              <div
                className="mb-3 mt-3"
                style={{ display: showloader == "none" ? "block" : "none" }}
              >
                <label htmlFor="name" className="form-label">
                  Invoice Image :
                </label>
                <br />
                <img src="" alt="" className="imgremark" /> <br />
                <input
                  type="file"
                  name="file"
                  id=""
                  className="form-control"
                  onChange={handleimageuopload}
                />
                {/* <br />
                                <label htmlFor="name" className="form-label">Uploaded image :</label><br />
                                <img src={filename} alt="" className='imgremark' onChange={handelChange} /> <br /> */}
              </div>
              <label htmlFor="name" className="form-label">
                Pending Amount : <span style={{ color: "red" }}> <b>Rs : {useramount}</b></span>
              </label>
              <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label">
                  Amount :
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  placeholder="0"
                  value={data.amount}
                  onChange={handelChange}
                />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label">
                  Remark :
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="remark"
                  placeholder="Remark (if any)"
                  value={data.remark}
                  onChange={handelChange}
                />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label">
                  Date Give For Return Amount:
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={data.date}
                  onChange={handelChange}
                />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label">
                  Amount Type:
                </label>
                <select
                  class="form-control"
                  name="amttype"
                  onChange={handelChange}
                >
                  <option value="">Select Amount Type</option>

                  <option value="amount_given_To_user">CREDIT</option>
                  <option value="amount_given_By_user">DEBIT</option>
                  <option value="NoAmount">NoAmount</option>
                </select>
              </div>
              {/* <div className="mb-3 mt-3">
                                <label htmlFor="name" className="form-label ">Old Pending Amount: {pendingAmt}</label>
                            
                            </div> */}


              <button type="submit" className="btn btn-info" onClick={Submit}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEntry;
