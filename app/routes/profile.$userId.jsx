import { json, redirect } from '@remix-run/node';
import { useLoaderData, Form, useRouteError } from '@remix-run/react';
import { getUserData, updateUser } from '../services/userService';
import NavigationBar from '../components/NavigationBar'

export async function loader({ params }) {
    const userId = params.userId;
    const userData = await getUserData(userId);
    
    return json(userData.data);
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const updatedUser = Object.fromEntries(formData);
    updatedUser.id = params.userId;

    await updateUser(updatedUser);

    return redirect('/profile/5');
}

export default function Profile() {
    const userData = useLoaderData();
    
    return(
        <>
            <NavigationBar></NavigationBar>
            <Form method='put' className='flex flex-col justify-center items-center my-2'>
                <div className='w-4/5 md:w-4/12 bg-white text-gray-900 py-6 px-6 rounded-lg flex flex-col gap-6'>
                    <div className='flex flex-col justify-center gap-1'>
                        <label className='font-bold' htmlFor='username'>Username</label>
                        <input 
                            className='bg-white h-10 border outline-gray-900/20 rounded-lg text-gray-900 px-2' 
                            name='username' 
                            type='text' 
                            defaultValue={userData.username}>
                        </input>
                    </div>
                    <div className='flex flex-col justify-center gap-1'>
                        <label className='font-bold' htmlFor='email'>Email</label>
                        <input 
                            className='bg-white h-10 border outline-gray-900/20 rounded-lg text-gray-900 px-2' 
                            name='email' 
                            type='email' 
                            defaultValue={userData.email}>
                        </input>
                    </div>
                    <div className='flex flex-row justify-center gap-1'>
                        <button className='bg-emerald-500 rounded-md w-full py-2 font-semibold'>Update</button>
                        <button className='bg-rose-500 rounded-md w-full py-2 font-semibold'>Logout</button>
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