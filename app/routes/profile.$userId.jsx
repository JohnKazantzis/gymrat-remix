import { json } from '@remix-run/node';
import { useLoaderData, Form, useRouteError } from '@remix-run/react';
import { getUserData } from '../services/userService';
import NavigationBar from '../components/NavigationBar'

export async function loader({ params }) {
    const userId = params.userId;
    const userData = await getUserData(userId);
    
    return json(userData.data);
}

export default function Profile() {
    const userData = useLoaderData();
    console.log('userData', userData);
    
    
    return(
        <>
            <NavigationBar></NavigationBar>
            <Form className='flex flex-col justify-center items-center my-2'>
                <div className='w-4/5 md:w-3/12 bg-white text-gray-900 py-4 px-2 rounded flex flex-col gap-4'>
                    <div className='flex flex-col justify-center gap-1'>
                        <label className='font-bold' htmlFor='username'>Username</label>
                        <input className='bg-white h-10 border border-gray-900/50 rounded text-gray-900 px-2' name='username' type='text' value={userData.username}></input>
                    </div>
                    <div className='flex flex-col justify-center gap-1'>
                        <label className='font-bold' htmlFor='email'>Email</label>
                        <input className='bg-white h-10 border border-gray-900/50 rounded text-gray-900 px-2' name='email' type='email' value={userData.email}></input>
                    </div>
                    <div className='flex flex-row justify-center gap-1'>
                        <button className='bg-emerald-500 rounded w-full py-1 font-semibold'>Update</button>
                        <button className='bg-rose-500 rounded w-full py-1 font-semibold'>Logout</button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export function ErrorBoundary() {
    const errorData = useRouteError();
    const errorMessage = errorData.data || 'An unexpected error occured'

    return(
        <div>{errorMessage}</div>
    );
}