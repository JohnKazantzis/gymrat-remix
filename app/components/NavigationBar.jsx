import { NavLink, useLocation } from "@remix-run/react";

const INACTIVE_BUTTON = 'text-white font-bold py-1 px-4 rounded hover:bg-red-400 hover:text-black';
const ACTIVE_BUTTON = 'text-black font-bold py-1 px-4 rounded bg-red-400';
const PATHS = {
    home: '/',
    workouts: '/workouts',
    profile: '/profile'
}

export default function NavigationBar() {
    const location = useLocation();

    return(
        <div className='bg-gray-900 flex justify-around'>
            <figure>
                <img src='/dumbbell-white.png' alt='Dumbbell'></img>
            </figure>
            <nav className='flex justify-center items-center gap-1 md:gap-8'>
                <button className={location.pathname == PATHS.home ? ACTIVE_BUTTON : INACTIVE_BUTTON}><NavLink to={PATHS.home}>Home</NavLink></button>
                <button className={location.pathname == PATHS.workouts ? ACTIVE_BUTTON : INACTIVE_BUTTON}><NavLink to={PATHS.workouts}>Workouts</NavLink></button>
                <button className={location.pathname.includes(PATHS.profile) ? ACTIVE_BUTTON : INACTIVE_BUTTON}><NavLink to={PATHS.profile}>Profile</NavLink></button>
            </nav>
            <figure>
                <img src='/account.png' alt='Account'></img>
            </figure>
        </div>
    );

}