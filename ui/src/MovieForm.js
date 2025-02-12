import {useState} from "react";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState([]);
    const [surname, setSurname] = useState([]);

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
        // setName('');
        // setSurname('');
    }

    function addActor(event) {
        event.preventDefault();
        if (name.length === 0 || surname.length === 0) {
            return alert('Add actor name and surname, please');
        }
        props.onAddActor({name, surname});
        setName(...name, name);
        setSurname(...surname, surname);
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
        <button type="button" onClick={addActor}>+</button>
        <div>
            <label>Actor Name</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
            <label>Actor Surname</label>
            <input type="text" value={surname} onChange={(event) => setSurname(event.target.value)}/>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
