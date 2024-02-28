import React, { useRef, useState } from 'react'
import "./style.css";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { BsFillSignpostSplitFill } from "react-icons/bs";
import { RiUserSettingsFill } from "react-icons/ri";
import { MdCreateNewFolder } from "react-icons/md";
import { BiAtom } from "react-icons/bi";
import PostModal from '../modal/PostModal';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Button } from 'antd';
import httpClient from '../../../httpClient';
import LoadingBar from 'react-top-loading-bar'

const Widget = ({ image, name, bio, setPosts, setUpdatePosts, posts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loadingRef = useRef(null);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = (data) => {
        console.log(data)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleMyPosts = () => {

        loadingRef.current.continuousStart();
        // alert(localStorage.getItem("accessToken"));
        httpClient.get("/post/my").then((res) => {
            -                  console.log(res)
            if (res.data.status == 'success') {
                setPosts(res.data.posts);
            }
        }).catch(err => console.log(err.message))
            .finally(() => {
                loadingRef.current.complete();
            })
    }



    const states = useSelector((state) => state.userAuth)
    console.log(states)
    return (

        <div className='mt-4 pt-3 p-4'>
            <LoadingBar ref={loadingRef} />
            <PostModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} setUpdatePosts={setUpdatePosts} />
            <div className='mx-auto text-center'>
                <img src={image} className='d-inline sidewidget__photo object-fit-cover' />
            </div>
            <h3 className='fs-4 text-center mt-4'>{states.name}</h3>
            <p className='fs-6 text-center w-75 mx-auto'>{bio}</p>

            <div className='mt-4 d-flex justify-content-around'>
                <div className='text-center'>
                    <h6>{posts.length}</h6>
                    <p className='fs-6 fw-bold'>Posts</p>
                </div>
                <div className='text-center'>
                    <h6>454</h6>
                    <p className='fs-6 fw-bold'>Followers</p>
                </div>
                <div className='text-center'>
                    <h6>213</h6>
                    <p className='fs-6 fw-bold'>Following</p>
                </div>
            </div>

            <div className='navLinks py-2'>
                <button onClick={() => setUpdatePosts(true)} className="btn btn-outline-dark fs-5 px-3 py-2 align-items-center gap-2 text-start d-flex mb-2 ">
                    <HomeOutlined />
                    <span>Home</span>
                </button>
                <Link to='/' onClick={handleMyPosts} className="btn btn-outline-dark fs-5 px-3 py-2 align-items-center gap-2 text-start d-flex mb-2">
                    <BsFillSignpostSplitFill />
                    <span>My Posts</span>
                </Link>
                <Link to='/' className="btn btn-outline-dark fs-5 px-3 py-2 align-items-center gap-2 text-start d-flex mb-2">
                    <RiUserSettingsFill />
                    <span>Edit Profile</span>
                </Link>
                <button onClick={showModal} className="btn btn-outline-danger w-100 fs-5 px-3 py-2 align-items-center gap-2 text-start d-flex mb-2">
                    <PlusCircleOutlined />
                    <span>New Post</span>
                </button>
                {/* <input type="file" accept="capture=camera,image/*" /> */}
            </div>
        </div>
    )
}

export default Widget