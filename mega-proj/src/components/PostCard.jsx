import React from 'react'
import {Link} from "react-router-dom";
import service from '../appwrite/conf';
function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-400 rounded-xl p-4'>
            <div className='mb-2 justify-center w-full'>
              {featuredImage &&
                (<img src={service.getPreview(featuredImage)} alt={title} className='rounded-lg p-2' />)
              }
            </div>
                <h1 className='text-4xl font-bold'>{title}</h1>
        </div>
    </Link>
  )
}
export default PostCard

