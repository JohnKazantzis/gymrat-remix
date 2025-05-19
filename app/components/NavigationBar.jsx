import { NavLink, useLocation } from "@remix-run/react";

const INACTIVE_BUTTON = 'text-white font-bold py-1 px-4 hover:text-brink-pink-400 border-b-2 hover:border-brink-pink-400 transition delay-50 duration-300 ease-in-out';
const ACTIVE_BUTTON = 'text-brink-pink-400 font-bold py-1 px-4 border-b-2 border-brink-pink-400';
const PATHS = {
    home: '/',
    workouts: '/workouts',
    profile: '/profile'
}

export default function NavigationBar() {
    const location = useLocation();

    return(
        <div className='flex justify-around'>
            <figure>
                <img src='/dumbbell-white.png' alt='Dumbbell'></img>
            </figure>
            <nav className='flex justify-center items-center'>
                <button className={location.pathname == PATHS.home ? ACTIVE_BUTTON : INACTIVE_BUTTON}><NavLink prefetch='intent' to={PATHS.home}>Home</NavLink></button>
                <button className={location.pathname == PATHS.workouts ? ACTIVE_BUTTON : INACTIVE_BUTTON}><NavLink prefetch='intent' to={PATHS.workouts}>Workouts</NavLink></button>
                <button className={location.pathname.includes(PATHS.profile) ? ACTIVE_BUTTON : INACTIVE_BUTTON}><NavLink prefetch='intent' to={PATHS.profile}>Profile</NavLink></button>
            </nav>
            <figure>
                <img src='/account.png' alt='Account'></img>
            </figure>
        </div>
    );

}