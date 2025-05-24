import NavigationBar from '../components/NavigationBar';
import { useState } from 'react';

export default function AddWorkout() {
    const [exercisesByMuscleGroup, setExercisesByMuscleGroup] = useState({
        'Chest': {key: 1, exercises: ['Bench Press', 'Pec Dec', 'Dumbbel Bench Press', 'Incline Bench Press']},
        'Back': {key: 2, exercises: ['Pull-up', 'Lat Pull Down', 'Rows']},
        'Legs': {key: 3, exercises: ['Leg Press', 'Squat', 'Deadlift', 'Quad Extensions']}
    });

    
    
    return(
        <>
            <NavigationBar></NavigationBar>
            <div className='flex flex-col w-full md:w-2/6 m-auto gap-4 pt-8'>
                <div className='flex flex-col md:flex-row justify-around md:justify-between items-center gap-2 md:gap-0'>
                    <div className='flex flex-row gap-1'>
                        <img className='w-6 h-6' src='/icons8-magnifying-glass.png' alt='Dumbbell' />
                        <input className='bg-white border outline-gray-900/20 rounded text-gray-900 px-2' type='search' placeholder='Search...'></input>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-white'>Search in</p>
                        <select name='musclegroups' className='bg-gray-900 text-white cursor-pointer'>
                            <option value='Abdominals'>Abdominals</option>
                            <option value='Legs'>Legs</option>
                            <option value='Biceps'>Biceps</option>
                            <option value='Shoulders'>Shoulders</option>
                            <option value='Chest'>Chest</option>
                            <option value='Back'>Back</option>
                            <option value='Triceps'>Triceps</option>
                            <option value='Traps'>Traps</option>
                            <option value='Forearms'>Forearms</option>
                            <option value='Neck'>Neck</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-row flex-wrap gap-1 px-2 md:px-0'>
                    { exercisesByMuscleGroup && Object.keys(exercisesByMuscleGroup).map((muscle) => 
                        <div key={muscle} className='flex flex-row items-center gap-2 py-1 px-2 rounded bg-brink-pink-400'>
                            <span>{muscle}</span>
                            <span className='text-white text-xs'>2</span>                    
                        </div>)
                    }
                </div>
                <div></div>
            </div>
        </>
    );
}