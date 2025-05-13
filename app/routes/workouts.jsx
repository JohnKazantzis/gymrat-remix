import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getWorkoutsByUserId } from '../services/workoutService';

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
    console.log(workouts);
    
    return(
        <div className='flex flex-col gap-2 justify-center items-center'>
            { workouts.content.map(workout => {
                return(
                    <div className='flex flex-col justify-between p-2 w-4/5 h-24 bg-red-400 rounded hover:bg-red-600 md:w-3/5' key={workout.id}>
                        <div className='text-gray-900 font-bold'>{(new Date(workout.workoutDate)).toLocaleDateString()}</div>
                        <div className='flex flex-wrap gap-0.5'>
                            {workout.muscleGroups && workout.muscleGroups.map((muscleGroup) => 
                                <div className='inline-block px-2 bg-gray-900 text-white font-bold rounded' key={muscleGroup}>
                                    {muscleGroup}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );

}