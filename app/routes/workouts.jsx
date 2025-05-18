import { json } from '@remix-run/node';
import { useLoaderData, NavLink } from '@remix-run/react';
import { getWorkoutsByUserId } from '../services/workoutService';
import NavigationBar from '../components/NavigationBar';

const DEFAULT_PAGE = '0';
const PAGINATION_PAGE_SIZE = 10;

export async function loader({ request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || DEFAULT_PAGE;

    const workouts = await getWorkoutsByUserId(page, PAGINATION_PAGE_SIZE, 5);
    
    return json(workouts.data);
}

export default function Workouts() {
    const workouts = useLoaderData();
    console.log('workouts', workouts);
    const currentPage = workouts.pageable.pageNumber;
    const pageStartNumber = currentPage * PAGINATION_PAGE_SIZE + 1 > workouts.totalElements ? workouts.totalElements : currentPage * PAGINATION_PAGE_SIZE + 1;
    const pageEndNumber = PAGINATION_PAGE_SIZE * (currentPage + 1) > workouts.totalElements ? workouts.totalElements : PAGINATION_PAGE_SIZE * (currentPage + 1);
    
    return(
        <>
            <NavigationBar></NavigationBar>
            <div className='pt-2 flex flex-col gap-2 justify-center items-center'>
                { workouts.content.map(workout => {
                    return(
                        <div className='flex flex-col md:flex-row justify-between items-center p-2 w-4/5 h-24 bg-red-400 rounded hover:bg-red-600 md:w-3/5 md:h-12 cursor-pointer' key={workout.id}>
                            <div className='text-gray-900 font-bold'>{(new Date(workout.workoutDate)).toLocaleDateString()}</div>
                            <div className='flex flex-wrap gap-0.5'>
                                {workout.muscleGroups && workout.muscleGroups.map((muscleGroup) => 
                                    <div className='inline-block px-2 bg-gray-900 text-white font-bold rounded md:h-6' key={muscleGroup}>
                                        {muscleGroup}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div className='flex flex-col-reverse md:flex-row justify-center items-center md:justify-between gap-2 w-4/5 md:w-3/5'>
                    <div className='flex items-center'>
                        <p>
                            Showing {pageStartNumber} to {pageEndNumber} of {workouts.totalElements} results
                        </p>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <button className='rounded border border-black disabled:bg-gray-300' disabled={workouts.first}>
                            {
                                !workouts.first ? 
                                <NavLink prefetch='intent' preventScrollReset to={`/workouts?page=${currentPage - 1}`} className='block py-1 px-4'>Previous</NavLink> : 
                                <span className='block py-1 px-4'>Previous</span>
                            }
                        </button>
                        <button className='rounded border border-black disabled:bg-gray-300' disabled={workouts.last}>
                            {
                                !workouts.last ? 
                                <NavLink prefetch='intent' preventScrollReset to={`/workouts?page=${currentPage + 1}`} className='block py-1 px-4'>Next</NavLink> : 
                                <span className='block py-1 px-4'>Next</span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}