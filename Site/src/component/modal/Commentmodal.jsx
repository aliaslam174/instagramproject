import React, { useState } from 'react'
import { Modal } from 'antd';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import LoaderBtn from '../loaderbtn/LoaderBtn';
import httpClient from '../../../httpClient';
const loginschema = yup.object({
    comment: yup.string().required(),
    
  }).required();

const Commentmodal = ({isModalOpen, handleOk, handleCancel, setUpdatePosts, postId}) => {
    // Modal Code
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginschema)
      });

      const onSubmit = (data) => {
        console.log(data.comment,"create")

        setIsLoading(true)
        httpClient.post("/comment/create",{
            comment: data.comment,
            postId: postId
        }).then((res) => {
            console.log(res)
            handleCancel();
            setUpdatePosts(true)
        }).catch(err => console.log(err.message))
        .finally(() => setIsLoading(false));
    }
    return (

        <Modal title="Comments"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <input type='text' className='form-control mb-3' {...register('comment')}/>
                {
                    (errors.content) ? <p className='alert alert-danger p-1 fs-6'>{errors.content?.message}</p> : null
                }
            
                <LoaderBtn btnTitle="Create Comment" btnType="btn-outline-warning" loading={isLoading} type="submit" />
            </form>
        </Modal>

    )
}

export default Commentmodal