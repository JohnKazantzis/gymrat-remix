import { json } from '@remix-run/node';
import { useLoaderData, Form, useRouteError } from '@remix-run/react';
import { getUserData } from '../services/userService';

export async function loader({ params }) {
    const userId = params.userId;
    const userData = await getUserData(userId);
    
    return json(userData.data);
}

export default function Profile() {
    const userData = useLoaderData();
    console.log('userData', userData);
    
    
    return(
        <Form>
            {userData.id}
        </Form>
    )
}

export function ErrorBoundary() {
    const errorData = useRouteError();
    const errorMessage = errorData.data || 'An unexpected error occured'

    return(
        <div>{errorMessage}</div>
    );
}