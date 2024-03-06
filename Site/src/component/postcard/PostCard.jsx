import React, { useEffect, useRef, useState } from 'react'
import "./postcard.css";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleText } from "react-icons/pi";
import { PiShareFatFill } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";
import TimeAgo from 'react-timeago'
import Commentmodal from '../modal/Commentmodal';
import httpClient from '../../../httpClient';
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";





const PostCard = ({ post, setUpdatePosts }) => {
    console.log(post.totalLikes,"fsdf")
    
    const [isLIkedIcon, setIsLikedIcon] = useState(true);
    const [totalLikes, setTotalLikes] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLikeClick = async (postId, userId) => {
        // setIsLikedIcon(true)
        try {
            const response = await httpClient.post('/post/like', { postId: postId, userId: userId }); // replace '123' with the actual user ID
            
           
            if (response.data.isLiked == true) {
                setIsLikedIcon(true)
                setTotalLikes(response.data.totalLikes)
               
            } else if (response.data.isLiked == false) {
                setIsLikedIcon(false)
                setTotalLikes(response.data.totalLikes)

            }
        } catch (error) {
            console.error('Error adding like:', error);
        }

    };
    const showModal = () => {

        setIsModalOpen(true);
    };
    const handleOk = (data) => {
        console.log(data)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const states = useSelector((state) => state.userAuth);

    useEffect(() => {
        if (post.isLiked == true) {
            setIsLikedIcon(true)
        } else {
            setIsLikedIcon(false)
        }

        setTotalLikes(post.totalLikes)
    }, [])

    return (
        <div className='postCard_ mt-4 pt-3 p-4 bg-white rounded'>
            <Commentmodal postId={post._id} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} setUpdatePosts={setUpdatePosts} />
            <div className='d-flex justify-content-between'>
                <div className='d-flex gap-3 mb-3'>
                    <div>
                        {/* <img src="https://picsum.photos/200" className='d-inline profile__photo-small object-fit-cover' /> */}
                        {
                            (post.authorId.photo == null) ? <img src="https://picsum.photos/200" className='d-inline profile__photo-small object-fit-cover' /> : <img src={post.authorId.photo} className='d-inline profile__photo-small object-fit-cover' />
                        }
                    </div>
                    <div className=''>
                        <h6>{post.authorId.name} <TimeAgo date={post.createdAt} /></h6>
                        <p>{post.content}</p>
                    </div>
                </div>
                <SlOptions className='fs-4' />
            </div>

            <div className=''>
                <img className='img-fluid' src={post.imageUrl} />
            </div>
            <div className='d-flex justify-content-between' >
                <div className='fs-5'>Likes : {totalLikes}
                </div>
                <div className='fs-5'>comments : {post.comments.length}</div>
            </div>
            <div className='postCard__icons d-flex align-items-center gap-3 mt-2 '>


                <span onClick={() => handleLikeClick(post._id, post.authorId._id)}>

                    {
                        (isLIkedIcon) ? <FaHeart style={{ color: 'red' }} /> : <CiHeart style={{ fontSize: "20px" }} />

                    }


                </span>


                <span onClick={showModal}><PiChatCircleText style={{ fontSize: "20px" }} /></span>
                <span><PiShareFatFill style={{ fontSize: "20px" }} /></span>
            </div>
            <div className='mt-3'>
                {
                    post.comments.map((comment) => {
                        return <div className='d-flex justify-content-between'>
                            <div>{comment.comment}</div>
                            <div><TimeAgo date={comment.createdAt} /></div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default PostCard