import { Form } from '@remix-run/react';

export default function Login() {

    return(
        <Form>
            <input type='text' name='username'></input>
            <input type='password' name='password'></input>
        </Form>
    );
}