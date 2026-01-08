import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import {Logo, Input, Button} from "./index"
export default function Signup() {
    const {register, handleSubmit}=useForm();
    const [error, setError]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const signup=async(data)=>{
        try {
            const account=await authService.createAccount(data);
            if(account){
                const userData=await authService.getCurrentUser();
                if(userData)dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg text-xl bg-blue-200 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-25">
                    <Logo width='40px' />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 text-center mt-8'>{error}</p>}
                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-4'>
                        <Input 
                        label="Full Name"
                        placeholder="Enter Your Name"
                        {...register("name",{
                            required:true
                        })}
                        />
                        <Input
                        label="Email:"
                        type="email"
                        placeholder="Enter Your Email"
                        {...register("email",{
                            required:true,
                            validate:{
                            matchPattern: (value)=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(value)||
                            "Email Address Must Be Valid"
                        }
                        })}/>
                        <Input
                        label="password"
                        type="password"
                        placeholder="Enter Your Password"
                        {...register("password",{
                            required:true,
                        })}    />
                        <Button type='submit' classname='w-full text-center' >Create Account</Button>
                    </div>
                </form>
        </div>
        </div>
    )
}


// export default function Signup() {
//   return (
//     <div>
//       <h1 style={{ color: "red", fontSize: "32px" }}>
//         THIS IS SIGNUP PAGE
//       </h1>
//     </div>
//   );
// }
