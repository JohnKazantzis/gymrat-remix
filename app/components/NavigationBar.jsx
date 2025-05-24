import { NavLink, useLocation } from "@remix-run/react";

const INACTIVE_BUTTON = 'text-white hover:text-brink-pink-400 border-b-2 hover:border-brink-pink-400 transition delay-50 duration-300 ease-in-out';
const ACTIVE_BUTTON = 'text-brink-pink-400 border-b-2 border-brink-pink-400';
const PATHS = {
    home: '/',
    workouts: '/workouts',
    addworkout: '/addworkout',
    profile: `/profile/${5}`
}

export default function NavigationBar() {
    const location = useLocation();

    return(
        <div className='flex justify-around items-center md:w-4/5 md:m-auto'>
            <figure>
                <img className='w-12 h-12 md:w-auto md:h-auto' src='/dumbbell-white.png' alt='Dumbbell'></img>
            </figure>
            <nav className='flex justify-center items-center text-base md:text-lg'>
                <button className={location.pathname == PATHS.home ? ACTIVE_BUTTON : INACTIVE_BUTTON}><NavLink className='pt-1 pb-2 px-1 md:px-4' prefetch='intent' to={PATHS.home}>Home</NavLink></button>
                <button className={location.pathname == PATHS.workouts ? ACTIVE_BUTTON : INACTIVE_BUTTON}><NavLink className='pt-1 pb-2 px-1 md:px-4' prefetch='intent' to={PATHS.workouts}>Workouts</NavLink></button>
                <button className={location.pathname == PATHS.addworkout ? ACTIVE_BUTTON : INACTIVE_BUTTON}><NavLink className='pt-1 pb-2 px-1 md:px-4' prefetch='intent' to={PATHS.addworkout}>Add Workout</NavLink></button>
            </nav>
            <figure>
                <NavLink prefetch='intent' to={PATHS.profile}>
                    <img className='w-12 h-12 md:w-auto md:h-auto' src='/account.png' alt='Account'></img>
                </NavLink>
            </figure>
        </div>
    );

}