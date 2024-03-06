import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import LoaderBtn from '../loaderbtn/LoaderBtn';
import httpClient from '../../../httpClient';
import { useDispatch } from 'react-redux';
import { updateuserinfo } from "../../redux/userauthslice"


const loginschema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),

}).required();

const ProfileModal = ({ isModalOpen, handleOk, handleCancel, setUpdatePosts }) => {
    // Modal Code

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(loginschema)
    });

    const onSubmit = (data) => {
        // console.log(data)

        setIsLoading(true)
        httpClient.put("/user/profile", {
            name: data.name,
            email: data.email,
            photo: data.image[0]
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res.data.user, "update api response")
            localStorage.setItem("userinfo", JSON.stringify(res.data.user))
            setIsLoading(false)
            const user = JSON.parse(localStorage.getItem("userinfo"));
            handleCancel();
            dispatch(updateuserinfo(user))
            setUpdatePosts(true)
        }).catch(err => console.log(err.message))
            .finally(() => setIsLoading(false));
    }


    useEffect(() => {
        httpClient.get("/user/getuser").then((res) => {

            setValue("name", res.data.user.name)
            setValue("email", res.data.user.email)
        })
    }, [isModalOpen])
    return (

        <Modal title="update profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' className='form-control mb-3' {...register('name')} />
                {
                    (errors.name) ? <p className='alert alert-danger p-1 fs-6'>{errors.name?.message}</p> : null
                }
                <input type='email' className='form-control mb-3' {...register('email')} />
                {
                    (errors.email) ? <p className='alert alert-danger p-1 fs-6'>{errors.email?.message}</p> : null
                }
                <input type="file" className='form-control mb-3' accept="image/*; capture=camera" {...register('image')} />
                <LoaderBtn btnTitle="update profile" btnType="btn-outline-warning" loading={isLoading} type="submit" />
            </form>
        </Modal>

    )
}

export default ProfileModal