import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { getExercisesByMuscleGroup } from '../services/exerciseService'
import NavigationBar from '../components/NavigationBar';
import WorkoutDetails from '../components/WorkoutDetails';

export async function loader() {
    const exercisesByMuscleGroups = await getExercisesByMuscleGroup();
    return json(exercisesByMuscleGroups.data);
}

export default function AddWorkout() {
    const exercisesByMuscleGroup = useLoaderData();
    const [selectedMuscle, setSelectedMuscle] = useState(Object.keys(exercisesByMuscleGroup).length > 0 ? Object.keys(exercisesByMuscleGroup)[0] : null);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const toogleExercise = exercise => {
        if(selectedExercises.find(item => item.key == exercise.key)) {
            setSelectedExercises(selectedExercises.filter(item => item.key !== exercise.key));
            return;
        }
        setSelectedExercises([...selectedExercises, exercise]);
    }

    const changeMuscleGroup = (event) => {
        setSearchTerm('');
        setSelectedMuscle(event.target.value);
    }

    const muscleGroupIncluded = {};
    selectedExercises.forEach(item => {
        if(!Object.hasOwn(muscleGroupIncluded, item.muscleGroup)) {
            muscleGroupIncluded[item.muscleGroup] = 0;
        }
        muscleGroupIncluded[item.muscleGroup] += 1;
    });
    console.log(muscleGroupIncluded.length)

    const exercisesShown = searchTerm ? exercisesByMuscleGroup[selectedMuscle].exercises.filter(exercise => {
        return exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    }) : exercisesByMuscleGroup[selectedMuscle].exercises;
    
    return(
        <>
            <NavigationBar></NavigationBar>
            <div className='flex flex-col w-full md:w-2/6 m-auto gap-4 pt-8'>
                <div className='flex flex-col md:flex-row justify-around md:justify-between items-center gap-2 md:gap-0'>
                    <div className='flex flex-row gap-1'>
                        <img className='w-6 h-6' src='/icons8-magnifying-glass.png' alt='Dumbbell' />
                        <input 
                            className='bg-white border outline-gray-900/20 rounded text-gray-900 px-2' 
                            type='search' 
                            placeholder='Search...'
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}>
                        </input>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-white'>Search in</p>
                        <select name='musclegroups' defaultValue={selectedMuscle} onChange={(event) => changeMuscleGroup(event)} className='bg-gray-900 text-white cursor-pointer'>
                            { exercisesByMuscleGroup && Object.keys(exercisesByMuscleGroup).map(muscle => 
                                <option key={muscle} value={muscle}>
                                    {muscle}
                                </option>
                            )}
                        </select>
                    </div>
                </div>
                { 
                    Object.keys(muscleGroupIncluded).length > 0 ?
                    <div className='flex flex-row flex-wrap gap-1 px-2 md:px-0'>
                        { Object.entries(muscleGroupIncluded).map(muscleGroup => {
                            return(
                                <div key={muscleGroup[0]} className='flex flex-row justify-between items-center gap-2 py-1 px-2 rounded bg-brink-pink-400'>
                                    <span>{muscleGroup[0]}</span>
                                    <span className='text-white text-xs'>{muscleGroup[1]}</span>                    
                                </div>
                            );
                        })}
                    </div>
                    : <></>
                }
                <div className='flex flex-col gap-1 px-2 md:px-0'>
                    { exercisesShown && exercisesShown.map(exercise => 
                        <div key={exercise.key} className='flex flex-col'>
                            <button                                 
                                className='h-10 flex flex-row justify-between items-center bg-white rounded py-1 px-2 cursor-pointer hover:bg-brink-pink-400'
                                onClick={ () => toogleExercise(exercise) }>
                                <span>{exercise.name}</span>
                                {   
                                    selectedExercises.find(item => item.key === exercise.key) ?
                                    <img src='/icons8-check-mark-50.png' alt='checkmark' className='w-8 h-8'></img> : <></>
                                }
                            </button>
                            {
                                selectedExercises.find(item => item.key === exercise.key) ?
                                <div className='mt-1 w-full bg-white rounded'>
                                    <div className='flex flex-row justify-between items-center md:px-4'>
                                    <figure className='flex flex-row items-center md:w-1/3'>
                                        <img src="/icons8-hashtag-32.png" alt="#"/>
                                        {}
                                    </figure>
                                    <figure className='flex flex-row items-center md:w-1/3'>
                                        <img src="/icons8-weight-kg-32.png" alt="KG"/>
                                        {}
                                    </figure>
                                    <figure className='flex flex-row items-center md:w-1/3'>
                                        <img src="/icons8-repeat-32.png" alt="Reps"/>
                                        {}
                                    </figure>
                                </div>
                                </div> : <></>
                            }
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}