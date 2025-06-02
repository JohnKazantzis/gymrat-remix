import { json } from '@remix-run/node';
import { useLoaderData, useSubmit, useActionData } from '@remix-run/react';
import { useState } from 'react';
import { getExercisesByMuscleGroup } from '../services/exerciseService';
import { addWorkout } from '../services/workoutService';
import NavigationBar from '../components/NavigationBar';
import WorkoutSubmitted from '../components/WorkoutSubmitted';

export async function loader() {
    const exercisesByMuscleGroups = await getExercisesByMuscleGroup();
    return json(exercisesByMuscleGroups.data);
}

export async function action({ request }) {
    const formData = await request.formData();
    let data = Object.fromEntries(formData)?.data;
    data = JSON.parse(data);
    const response = await addWorkout(data);

    return json(response.data);
}

export default function AddWorkout() {
    const exercisesByMuscleGroup = useLoaderData();
    const [selectedMuscle, setSelectedMuscle] = useState(exercisesByMuscleGroup.length > 0 ? exercisesByMuscleGroup[0].name : null);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const submit = useSubmit();
    const actionData = useActionData();

    const toogleExercise = exercise => {
        setSelectedExercises(
            selectedExercises.find(item => item.name == exercise) ? 
            selectedExercises.filter(item => item.name !== exercise) : 
            [...selectedExercises, { name: exercise, muscleGroup: selectedMuscle }]
        );
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

    let exercisesShown = exercisesByMuscleGroup.filter(muscleGroup => {
        return muscleGroup.name === selectedMuscle
    })[0].exercises;
    if(searchTerm) {
        exercisesShown = exercisesShown.filter(exercise => {
            return exercise.toLowerCase().includes(searchTerm.toLowerCase());
        })
    }

    const addSet = (exerciseName) => {
        const targetExercise = selectedExercises.find(exercise => exercise.name === exerciseName);
        if(!Object.hasOwn(targetExercise, 'sets')) {
            targetExercise.sets = [];
        }
        targetExercise.sets.push({ key: window.crypto.randomUUID(), setNumber: targetExercise.sets.length + 1, weight: '', reps: ''});
        setSelectedExercises([...selectedExercises.filter(exercise => exercise.name !== exerciseName), targetExercise]);
    }

    const deleteSet = (exerciseName, setKey) => {
        const targetExercise = selectedExercises.find(exercise => exercise.name === exerciseName);
        targetExercise.sets = targetExercise.sets.filter(set => set.key !== setKey);
        targetExercise.sets = targetExercise.sets.map((set, index) => {
            set.setNumber = index + 1
            return set;
        })
        setSelectedExercises([...selectedExercises.filter(exercise => exercise.name !== exerciseName), targetExercise]);
    }

    const updateSet = (exerciseName, setKey, event) => {
        const inputName = event.target.name;
        const targetExercise = selectedExercises.find(exercise => exercise.name === exerciseName);
        targetExercise.sets = targetExercise.sets.map(set => {
            if(set.key === setKey) {
                set[inputName] = event.target.value;
            }
            return set;
        });
        setSelectedExercises([...selectedExercises.filter(exercise => exercise.name !== exerciseName), targetExercise]);
    }

    const isUndefindedOrEmptyArray = (array) => {
        return !array || array.length == 0;
    }

    const removeAll = () => {
        setSearchTerm('');
        setSelectedExercises([]);
    }

    
    const logWorkout = () => {
        const formData = new FormData();
        formData.set("data", JSON.stringify(selectedExercises));
        submit(formData, {
            method: "post",
            encType: "application/x-www-form-urlencoded",
            preventScrollReset: false,
            replace: false,
            relative: "route",
        });
    }
    
    return(
        <>
            <NavigationBar></NavigationBar>
            { actionData ? <WorkoutSubmitted></WorkoutSubmitted> :
            <div className='flex flex-col w-full md:w-2/6 m-auto gap-1 pt-8'>
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
                            { exercisesByMuscleGroup && exercisesByMuscleGroup.map(muscle => 
                                <option key={muscle._id} value={muscle.name}>
                                    {muscle.name}
                                </option>
                            )}
                        </select>
                    </div>
                </div>
                { 
                    Object.keys(muscleGroupIncluded).length > 0 ?
                    <div className='flex flex-row flex-wrap gap-1 px-2 md:px-0 md:mt-2'>
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
                <div className='flex flex-col gap-1 px-2 md:px-0 mt-2 md:max-h-[35rem] md:scrollbar overflow-auto'>
                    { exercisesShown && exercisesShown.map(exercise => 
                        <div key={exercise} className='flex flex-col md:mr-1'>
                            <button                                 
                                className='h-10 flex flex-row justify-between items-center bg-white rounded py-1 px-2 cursor-pointer hover:bg-brink-pink-400'
                                onClick={ () => toogleExercise(exercise) }>
                                <span>{exercise}</span>
                                {   
                                    selectedExercises.find(item => item.name === exercise) ?
                                    <img src='/icons8-check-mark-50.png' alt='checkmark' className='w-8 h-8'></img> : <></>
                                }
                            </button>
                            {
                                selectedExercises.find(item => item.name === exercise) ?
                                <div className='mt-1 w-full flex flex-col bg-white rounded px-4 py-2 gap-1'>                                    
                                    {
                                        selectedExercises.find(item => item.name === exercise).sets ?
                                        selectedExercises.find(item => item.name === exercise).sets.map((set) => 
                                            <div key={set.key} className='flex flex-row justify-start items-center gap-4'>
                                                <figure className='flex flex-row items-center gap-1'>
                                                    <img src="/icons8-hashtag-32.png" alt="KG" className='w-6 h-6'/>
                                                    <input 
                                                        className='w-14 bg-white border outline-gray-900/20 rounded text-gray-900 px-2' 
                                                        disabled
                                                        name='setNumber'
                                                        value={set.setNumber}>                                                        
                                                    </input>
                                                </figure>
                                                <figure className='flex flex-row items-center gap-1'>
                                                    <img src="/icons8-weight-kg-32.png" alt="KG" className='w-6 h-6'/>
                                                    <input 
                                                        name='weight'
                                                        className='w-14 bg-white border outline-gray-900/20 rounded text-gray-900 px-2'
                                                        onChange={(event) => updateSet(exercise, set.key, event)}
                                                        value={set.weight}>
                                                    </input>
                                                </figure>
                                                <figure className='flex flex-row items-center gap-1'>
                                                    <img src="/icons8-repeat-32.png" alt="Reps" className='w-6 h-6'/>
                                                    <input 
                                                        className='w-14 bg-white border outline-gray-900/20 rounded text-gray-900 px-2'
                                                        name='reps'
                                                        onChange={(event) => updateSet(exercise, set.key, event)}
                                                        value={set.reps}>
                                                    </input>
                                                </figure>
                                                <button onClick={() => deleteSet(exercise, set.key)} className='w-6 h-6'>
                                                    <img src='/icons8-delete-button-48.png' alt='x' className='hover:bg-red-500 rounded-lg'></img>
                                                </button>
                                            </div>
                                        ) : <></>
                                    }
                                    <div className='flex flex-row justify-start items-center gap-4'>
                                        <button onClick={() => addSet(exercise)} className='flex flex-row flex-wrap gap-1 md:gap-2'>
                                            <img src='/icons8-add-button-24.png' alt='+' className='hover:bg-green-500 rounded-lg'></img>
                                            {
                                                isUndefindedOrEmptyArray(selectedExercises.find(item => item.name === exercise).sets) ?
                                                <span>No sets have been logged for this exercise</span> :
                                                <></>
                                            }
                                        </button>
                                    </div>
                                </div> : <></>
                            }
                        </div>
                    )}
                </div>
                <div className='flex flex-row justify-center gap-1 px-2 md:px-0 md:mr-4'>
                    <button className='bg-rose-500 rounded-md w-full py-2 font-semibold' onClick={() => removeAll()}>Remove All</button>
                    <button className='bg-emerald-500 rounded-md w-full py-2 font-semibold' onClick={() => logWorkout()}>Log Workout</button>
                </div>
            </div>}
        </>
    );
}