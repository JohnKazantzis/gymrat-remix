import { createCookieSessionStorage } from '@remix-run/node';
import 'dotenv/config';

const {  } = createCookieSessionStorage({
    cookie: {
        name: 'gymrat-session',
        httpOnly: true,
        maxAge: 60,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SECRET],
        secure: true,
    }
})