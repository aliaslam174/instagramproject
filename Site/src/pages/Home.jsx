import React, { useEffect, useRef, useState } from 'react'
import Widget from '../component/sidewidgets/Widget'
import { Col, Row } from 'antd';

import PostCard from '../component/postcard/PostCard';
import httpClient from '../../httpClient';
import LoadingBar from 'react-top-loading-bar'
function Home() {
 

  const [posts, setPosts] = useState([]);
  const [updatePosts, setUpdatePosts] = useState(false);
  const loadingRef = useRef(null);
  
  useEffect(() => {
    loadingRef.current.continuousStart();
   
    setTimeout(function() {
      httpClient.get('/post/all').then((response) => {
        if (response.data.status == "success") {
          setPosts(response.data.posts);
        }
  
      }).catch(error => console.log(error.message))
        .finally(() => { 
          setUpdatePosts(false)
          loadingRef.current.complete();
        })
    }, 500);


  },[updatePosts]);
 
  return (
   <>
  <LoadingBar ref={loadingRef}/>
   <Row >
      <Col lg={6}  xs={24}>
      <Widget  setPosts={setPosts} setUpdatePosts={setUpdatePosts} posts={posts} />
      </Col>
      <Col lg={16} xs={24}>
       
        {
          posts.map(post => <PostCard key={post._id} post={post} setUpdatePosts={setUpdatePosts} />)
        }
      </Col>
    </Row>
   
   </>
  )
}

export default Home