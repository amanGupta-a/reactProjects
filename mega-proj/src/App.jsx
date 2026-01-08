import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import {Header, Footer} from './components';

function App() {
  const [loading, setLoading]=useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userDate)=>{
      if(userDate){
        dispatch(login(userDate));
      }
      else{
        dispatch(logout());
      }
    })
    .catch((error)=>{
      console.log("App::useEffect::getCurrentUser::error", error);
      dispatch(logout());
    })
    .finally(()=>setLoading(false));
  }, []);

  return !loading? 
    <div className='min-h-screen flex flex-wrap content-between bg-gray-700'>
      <div className='text-center w-full text-5xl font-bold p-4 bg-white rounded-xl'>
        <Header/>
        <main>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  :null;
}

export default App
