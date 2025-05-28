import { NavLink } from '@remix-run/react';

export default function WorkoutSubmitted() {
    
    return(
        <div className="w-4/5 md:w-3/12 h-72 bg-white rounded m-auto mt-6 flex flex-wrap justify-center items-center">
            <img className='animate-bounce' src='/icons8-success-96.png' alt='success'></img>
            <span className='px-4 text-center'>Your workout has been logged successfully! Click <NavLink className='text-brink-pink-400' to='/' prefetch='intent'>here</NavLink> to go back to the home page</span>
        </div>
    );

}