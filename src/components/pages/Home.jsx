import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const navigate = useNavigate()

  const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData({ ...data, [name]: value });
  };


  const Submit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (!email || !password) {
      alert('Please enter All the fields');
      return;
    }
    const fetchdata = fetch("http://206.189.130.102:1200/api/v1/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const response = await fetchdata;
    const res = await response.json();

    if (response.status === 200) {
      sessionStorage.setItem("token", res.token);
      localStorage.setItem('permission', res.admindata.loginType.permission)
      navigate('/shika/customer')
    } else {
      alert("Invalid Credentials");
    }
  };

  console.log(data)

  return (
    <>
      <div className="container-fluid p-0">
        <div className="page-banner">
          <div className="banner-content-area">
            <div className="container">
              <div className="row">
                <div className="col-12 my-5">
                  <p className="navbar-brand" to="#">Shika Electrical</p>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-btm-img">
            <img src={require("../img/banner-btm-img.png")} alt="" />
          </div>
        </div>
      </div>
      <div className="main-container">
        <div className="wrapper">
          <main className='content px-3 py-2'>
            <div className='row d-flex justify-content-center'>
              <div className="col-12 col-md-6 col-lg-3">
                <div className='col-md-12 '>
                  <h3 className='login-title-h3 text-center'>Login</h3>
                </div>
                <div className="col-12">
                  <div className="card login-form-card">
                    <div className="row">
                      <div className="col-12">

                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label login-title-h5">email <span className='ms-2'><i class="fa-solid fa-user"></i></span></label>
                          <input type="text" class="form-control rounded-pill" name='email' aria-describedby="emailHelp" value={data.email} onChange={handleChange} />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label login-title-h5">Password <span className="ms-2"><i class="fa-solid fa-key"></i></span></label>
                          <input type="password" class="form-control  rounded-pill" name='password' value={data.password} onChange={handleChange} />
                        </div>
                        <div className='d-flex justify-content-center mt-3 mb-3'>
                          <button type="submit" class="btn btn-info" onClick={Submit}>Submit</button>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
