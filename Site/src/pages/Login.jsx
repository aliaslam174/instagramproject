import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch ,useSelector} from "react-redux"
import { ascnclogin } from "../redux/userauthslice"
import { useNavigate } from 'react-router-dom';


const loginschema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
}).required();


function Login() {
  const dispacher = useDispatch()
  const userInfo = useSelector((state) => state.userAuth);
  const accessToken = localStorage.getItem("accessToken")
  const navigator = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(loginschema)
  });
  const onSubmit = (data) => {
    console.log(data)
    dispacher(ascnclogin(data))
  };
  useEffect(() => {
    if (accessToken !== null) {
      navigator("/");
    }else{
      navigator("/");

    }
  }, [accessToken]);
  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div className="col-md-5 m-auto ">
            <div className='bg-white p-4 my-5 rounded shadow'>

              
            <h2 className="text-center mb-4 fs-5 fw-bold">Login Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  {...register("email")}
                />
              </div>
              {
                (errors.email) ? <p className='alert alert-danger'>{errors.email?.message}</p> : null
              }
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password")}
                />
              </div>
              {
                (errors.password) ? <p className='alert alert-danger'>{errors.password?.message}</p> : null
              }
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            </div>

          </div>
        </div>
      </div> */}
      <div className="card w-50 my-5 mx-auto">
        <div className="card-header"><h4 className="text-center">Login Form</h4></div>
        <div className="card-body">
          <div className=' mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
             
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  {...register("email", { autoComplete: false })}
                />

                {
                  (errors.email) ? <p className='alert alert-danger p-1 mt-1 text-sm'>{errors.email?.message}</p> : null
                }
              </div>

              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Enter password"
                  {...register("password")}
                />
                {
                  (errors.password) ? <p className='alert alert-danger p-1 mt-1 text-sm'>{errors.password?.message}</p> : null
                }
              </div>
            
              {/* <div className="mb-3">
                <label htmlFor="inputImage" className="form-label">
                  Image
                </label>
                <input className="form-control" type="file" id="inputImage" {...register("image")} />
                {
                  (errors.image) ? <p className='alert alert-danger p-1 mt-1 text-sm'>{errors.image?.message}</p> : null
                }
              </div> */}
              {
                (userInfo.loginError !== null ) ? <div className='alert alert-danger'>{userInfo.loginError}</div> : null
              }
              <button type="submit" className="btn btn-primary w-100">
               Login
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login