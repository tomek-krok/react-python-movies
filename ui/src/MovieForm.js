import {useState} from "react";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [actorName, setActorName] = useState('');
    const [actorSurname, setActorSurname] = useState('');

    function addMovie(event) {
        event.preventDefault();
        if (title.length < 5) {
            return alert('Tytuł jest za krótki');
        }
        props.onMovieSubmit({title, year, director, description});
        setTitle('');
        setYear('');
        setDirector('');
        setDescription('');
    }

    function addActor(event) {
        event.preventDefault();
        if (actorName.length === 0 || actorSurname.length === 0) {
            return alert('Add actor name and surname, please');
        }
        props.onAddActor({name: actorName, surname: actorSurname});
        setActorName('');
        setActorSurname('');
    }

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
        <button type="button" onClick={() => props.onAddActor({name: actorName, surname: actorSurname})}>+</button>
        <div>
            <label>Actor Name</label>
            <input type="text" value={actorName} onChange={(event) => setActorName(event.target.value)}/>
            <label>Actor Surname</label>
            <input type="text" value={actorSurname} onChange={(event) => setActorSurname(event.target.value)}/>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
