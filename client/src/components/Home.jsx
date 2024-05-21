import React, { useEffect } from 'react'
import PostContainer from './PostContainer'
// import useFetch from '../helpers/api'

const Home = () => {
  // const api = useFetch()
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await fetch(`http://localhost:3000/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        console.log("Access token refreshed:", data.accessToken);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    refreshToken();
  }, []);
  return (
    <div className='flex justify-center items-center h-svh bg-gray-600'>
      <PostContainer/>
    </div>
  )
}

export default Home