export default function WorkoutDetails({ exercises }) {
    return(
        <div className='w-4/5 md:w-3/5 px-2 py-1 bg-white rounded text-black'>
            { exercises ? exercises.map(item => 
                <div key={item.id} className='flex flex-col justify-start'>
                    <p>{item.exerciseName}</p>
                    { item.workoutSets && item.workoutSets.map(
                        set => {
                            return(
                                <div key={set.setNumber} className='flex flex-row justify-between items-center md:px-4'>
                                    <figure className='flex flex-row items-center md:w-1/3'>
                                        <img src="/icons8-hashtag-32.png" alt="#"/>
                                        {set.setNumber}
                                    </figure>
                                    <figure className='flex flex-row items-center md:w-1/3'>
                                        <img src="/icons8-weight-kg-32.png" alt="KG"/>
                                        {set.weight}
                                    </figure>
                                    <figure className='flex flex-row items-center md:w-1/3'>
                                        <img src="/icons8-repeat-32.png" alt="Reps"/>
                                        {set.reps}
                                    </figure>
                                </div>
                            );
                        }
                    ) }
                </div>
            ) : <p>No exercises were registered to this workout</p> }
        </div>
    );
}