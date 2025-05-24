import NavigationBar from '../components/NavigationBar';
import { useState } from 'react';

export default function AddWorkout() {
    const [muscleGroupsSelected, setMuscleGroupsSelected] = useState([
        {key: 1, name: 'Chest'}, 
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
        {key: 2, name: 'Legs'},
    ]);
    
    return(
        <>
            <NavigationBar></NavigationBar>
            <div className='mt-2 w-11/12 md:w-6/12 m-auto flex flex-row items-center justify-center'>
                <div className='w-full flex flex-col flex-wrap gap-2'>
                    <div className='flex flex-col md:flex-row gap-6 items-center'>
                        <div className='flex flex-row flow-wrap gap-1 w-1/4 justify-start'>
                            <img className='w-6 h-6' src='/icons8-magnifying-glass.png' alt='Dumbbell' />
                            <input className='rounded placeholder:pl-2' type='search' placeholder='Search...'></input>
                        </div>
                        <div className='flex flex-row flow-wrap gap-1 w-1/4 justify-start'>
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
                    <div className='flex flex-row flex-wrap gap-1 justify-start w-2/4'>
                        { muscleGroupsSelected && muscleGroupsSelected.map(muscle => 
                            <div key={muscle.key} className='py-1 px-2 rounded bg-brink-pink-400'>
                                {muscle.name}
                            </div>)
                        }
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
}