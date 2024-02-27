import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch ,useSelector} from "react-redux"
import { ascncsignup } from "../redux/userauthslice"
import { useNavigate } from 'react-router-dom';



const signupSchema = yup.object({
    name: yup.string().required("Name is required for signup"),
    email: yup.string().email("Please write valid email address").required("Email is required for signup"),
    password: yup.string().required('Password is required'),
    confirm_password: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
   
  }).required();


const Signup = () => {

  const dispatch= useDispatch()
  const userInfo = useSelector((state) => state.userAuth);
  const navigator = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, } = useForm({
    resolver: yupResolver(signupSchema),
  });

  
  const onSubmit = (data) => {
    
    dispatch(ascncsignup(data))
  }
  useEffect(() => {
    if (userInfo.islogin === true) {
      navigator("/");
    }
  }, [userInfo.islogin]);
  return (
    <>
      <div className="card w-50 my-5 mx-auto">
        <div className="card-header"><h4 className="text-center">Signup Form</h4></div>
        <div className="card-body">
          <div className=' mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Enter name"
                  {...register("name")}
                />
                {
                  (errors.name) ? <p className='alert alert-danger p-1 mt-1 text-sm'>{errors.name?.message}</p> : null
                }
              </div>
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
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  {...register("confirm_password")}
                />
                {
                  (errors.confirm_password) ? <p className='alert alert-danger p-1 mt-1 text-sm'>{errors.confirm_password?.message}</p> : null
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
                (userInfo.SignupError !== null ) ? <div className='alert alert-danger'>{userInfo.SignupError}</div> : null
              }
              <button type="submit" className="btn btn-primary w-100">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup