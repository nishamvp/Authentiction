import React, { useEffect } from 'react'
import PostContainer from './PostContainer'
// import useFetch from '../helpers/api'

const Home = () => {
 
  return (
    <div className='flex items-center justify-center bg-gray-600 h-svh'>
      <PostContainer/>
    </div>
  )
}

export default Home