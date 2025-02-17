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
        // console.log('actorFields2', actorFields)
        // actorFields.name = name;
        // actorFields.surname = surname;
        props.onMovieSubmit({title, year, director, description, actors});
        // console.log('movieIn', {title, year, director, description, actors: actorFields}); 
        // props.onMovieSubmit({title, year, director, description});
        setTitle('');
        setYear('');
        setDirector('');
        setDescription('');
        setActors([]);
        // setActorFields([]);
        // setName('');
        // setSurname('');
        // console.log('movieOut', {title, year, director, description, actorFields}); 
        console.log('movieOut', {title, year, director, description});
        //addActor(event) 

    }

    // function addActor(event) {
    //     event.preventDefault();
    //     // if (name.length === 0 || surname.length === 0) {
    //     //     return alert('Add actor name and surname, please');
    //     // }
    //     actorFields.name = name;
    //     actorFields.surname = surname;
    //     props.onAddActor(actorFields);
    //     setName(...name, name);
    //     setSurname(...surname, surname);
    //     setActorFields([]);
    //     console.log('actorOut', {actorFields});
    // }
    const handleAddActor = () => {
      const actor = { ...actorFields };
      console.log('actor', actor);
      setActors([...actors, actor]);
      setActorFields({ name: '', surname: '' });
      console.log('actorOut', actors);
    };



    return <form onSubmit={addMovie}>
        <h2>Add movie</h2>
        <div>
            <label>Tytuł</label>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
            <label>Year</label>
            <input type="text" value={year} onChange={(event) => setYear(event.target.value)}/>
        </div>
        <div>
            <label>Director</label>
            <input type="text" value={director} onChange={(event) => setDirector(event.target.value)}/>
        </div>
        <div>
            <label>Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
        </div>
        <h3>Actors</h3>

        <div >
        <label>
        Actors:
        <ul>
          {actors.map((actor, index) => (
            <li key={index}>
              {actor.name} {actor.surname}
            </li>
          ))}
        </ul>
      </label>
      <label>
        Add Actor:
        <input type="text" value={actorFields.name} onChange={(event) => setActorFields({ ...actorFields, name: event.target.value })} />
        <input type="text" value={actorFields.surname} onChange={(event) => setActorFields({ ...actorFields, surname: event.target.value })} />
        <button type="button" onClick={handleAddActor}> Add </button>
      </label>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
