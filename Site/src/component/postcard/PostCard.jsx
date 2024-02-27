import React from 'react'
import "./postcard.css";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleText } from "react-icons/pi";
import { PiShareFatFill } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";
import TimeAgo from 'react-timeago'
const PostCard = ({post}) => {
  return (
    <div className='postCard_ mt-4 pt-3 p-4 bg-white rounded'>
        <div className='d-flex justify-content-between'>
        <div className='d-flex gap-3 mb-3'>
            <div><img src="https://picsum.photos/200" className='d-inline profile__photo-small object-fit-cover' /></div>
            <div className=''>
                <h6>{post.authorId.name} <TimeAgo date={post.createdAt}/></h6>
                <p>{post.content}</p>
            </div>
        </div>
        <SlOptions className='fs-4'/>
        </div>
       
        <div className=''>
            <img className='img-fluid' src={post.imageUrl} />
        </div>
        <div className='postCard__icons d-flex align-items-center gap-3 mt-2'>
            <span><CiHeart style={{ fontSize: "20px" }} /></span>
            <span><PiChatCircleText style={{ fontSize: "20px" }} /></span>
            <span><PiShareFatFill style={{ fontSize: "20px" }} /></span>
        </div>
    </div>
  )
}

export default PostCard