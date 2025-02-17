import {useState} from "react";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [actors, setActors] = useState([]);
    const [actorFields, setActorFields] = useState( { name: '', surname: '' })


    function addMovie(event) {
        event.preventDefault();
        // if (title.length < 5) {
        //     return alert('Tytuł jest za krótki');
        // }

        props.onMovieSubmit({title, year, director, description, actors});

        setTitle('');
        setYear('');
        setDirector('');
        setDescription('');
        setActors([]);
        console.log('movieOut', {title, year, director, description});
    }

    
    const handleAddActor = () => {
      const actor = { ...actorFields };
      console.log('actor', actor);
      setActors([...actors, actor]);
      setActorFields({ name: '', surname: '' });
      console.log('actorOut', actors);
    };

    const handleRemoveActor = (index) => {
      let actor = [...actors ];
      actor.splice(index, 1);
      setActors(actor);
    };



    return <form onSubmit={addMovie}>
        <h2>Add movie</h2>
        <div>
            <label>Tytuł</label>
            <input type="text" placeholder="title more than 5 characters" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
            <label>Year</label>
            <input type="text" placeholder="year *" value={year} onChange={(event) => setYear(event.target.value)}/>
        </div>
        <div>
            <label>Director</label>
            <input type="text" placeholder="director *" value={director} onChange={(event) => setDirector(event.target.value)}/>
        </div>
        <div>
            <label>Description</label>
            <textarea value={description} placeholder="description (optional)"  onChange={(event) => setDescription(event.target.value)}/>
        </div>

        <h3>Actors:</h3>

        <div >
          <ul>
            {actors.map((actor, index) => (
              <li key={index}>
                {actor.name} {actor.surname}
                <button type="button" onClick={() => handleRemoveActor(index)}>Remove</button>
              </li>
           ))}
          </ul>
          <label>
            Add Actor:
            <input type="text" placeholder="name" value={actorFields.name} onChange={(event) => setActorFields({ ...actorFields, name: event.target.value })} />
            <input type="text" placeholder="surname" value={actorFields.surname} onChange={(event) => setActorFields({ ...actorFields, surname: event.target.value })} />
            <button type="button" onClick={handleAddActor}> Add </button>
          </label>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
