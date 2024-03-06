import React, { useState } from 'react'
import { Modal } from 'antd';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import LoaderBtn from '../loaderbtn/LoaderBtn';
import httpClient from '../../../httpClient';
const loginschema = yup.object({
    content: yup.string().required(),

}).required();

const PostModal = ({ isModalOpen, handleOk, handleCancel, setUpdatePosts }) => {
    // Modal Code
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginschema)
    });

    const onSubmit = (data) => {
        console.log(data)

        setIsLoading(true)
        httpClient.post("/post/create", {
            content: data.content,
            image: data.image[0]
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res)
            handleCancel();
            setUpdatePosts(true)
        }).catch(err => console.log(err.message))
            .finally(() => setIsLoading(false));
    }
    return (

        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' className='form-control mb-3' {...register('content')} />
                {
                    (errors.content) ? <p className='alert alert-danger p-1 fs-6'>{errors.content?.message}</p> : null
                }
                <input type="file" className='form-control mb-3' accept="image/*; capture=camera" {...register('image')} />
                <LoaderBtn btnTitle="Create Post" btnType="btn-outline-warning" loading={isLoading} type="submit" />
            </form>
        </Modal>

    )
}

export default PostModal