import { Form, NavLink } from '@remix-run/react';
import { signUp } from '../services/authService';

export async function action({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    console.log('sign up data', user)

    const signUpResponse = await signUp(user);
    console.log('signUpResponse: ', signUpResponse.data);

    return null;
}

export default function Signup() {
    return(
        <Form method='post' className='h-screen flex flex-col justify-center items-center'>
            <div className='w-4/5 md:w-4/12 bg-white text-gray-900 py-6 px-6 rounded-lg flex flex-col gap-2'>
                <div className='flex flex-col justify-center gap-1'>
                    <label className='font-bold' htmlFor='username'>Username</label>
                    <input 
                        className='bg-white h-10 border outline-gray-900/20 rounded-lg text-gray-900 px-2' 
                        name='username' 
                        type='text'>
                    </input>
                </div>
                <div className='flex flex-col justify-center gap-1'>
                    <label className='font-bold' htmlFor='username'>Email</label>
                    <input 
                        className='bg-white h-10 border outline-gray-900/20 rounded-lg text-gray-900 px-2' 
                        name='email' 
                        type='email'>
                    </input>
                </div>
                <div className='flex flex-col justify-center gap-1'>
                    <label className='font-bold' htmlFor='email'>Password</label>
                    <input 
                        className='bg-white h-10 border outline-gray-900/20 rounded-lg text-gray-900 px-2' 
                        name='password' 
                        type='password'>
                    </input>
                </div>
                <div className='flex flex-col justify-center gap-1'>
                    <button className='bg-emerald-500 rounded-md w-full py-2 font-semibold'>Sign Up</button>
                    <p className='text-gray-900 W-1/4'>If you already have an account please <NavLink className='text-brink-pink-400' to='/login'>log in</NavLink></p>
                </div>
            </div>
        </Form>
    );
}