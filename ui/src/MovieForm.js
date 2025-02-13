import {useState} from "react";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');

    const [actorFields, setActorFields] = useState([
        { name: '', surname: '' },
      ])
    
      const handleFormChange = (event, index) => {
        let data = [...actorFields];
        data[index][event.target.name] = event.target.value;
        setActorFields(data);
      }
    
      const submit = (e) => {
        e.preventDefault();
        console.log(actorFields)
      }
    
      const addActorFields = () => {
        let object = {
          name: '',
          surname: ''
        }
    
        setActorFields([...actorFields, object])
        console.log('actorFields', actorFields)    
      }
    
      const removeFields = (index) => {
        let data = [...actorFields];
        data.splice(index, 1)
        setActorFields(data)
      }
    
    function addMovie(event) {
        event.preventDefault();
        // if (title.length < 5) {
        //     return alert('Tytuł jest za krótki');
        // }
        console.log('actorFields2', actorFields) 
        props.onMovieSubmit({title, year, director, description, actors: actorFields});
        setTitle('');
        setYear('');
        setDirector('');
        setDescription('');
        setActorFields([{name: '', surname: ''}]);  

    }

    // function addActor(event) {
    //     event.preventDefault();
    //     if (name.length === 0 || surname.length === 0) {
    //         return alert('Add actor name and surname, please');
    //     }
    //     // props.onAddActor({name, surname});
    //     // setName(...name, name);
    //     // setSurname(...surname, surname);
    // }

    function AddNewActor(event) {
    
        const [inputFields, setInputFields] = useState([{name: '', surname: ''}]);
        // const addActorFields = () => {
        //     let newFileds = {name: '', surname: ''};
        //     setInputFields([...inputFields, newFileds]);
        //     // props.onAddActor({name, surname});
        //     // setName(...name, name);
        //     // setSurname(...surname, surname);
        // }
        console.log("log");
        return (<div>
            <div>
                <label>Actor Name</label>
                {/* <input type="text" value={props.name}/> */}
                <label>Actor Surname</label>
                {/* <input type="text" value={props.surname} /> */}
            </div>
        </div>);
        console.log("log2");
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
        <div>
        {actorFields.map((form, index) => {
          return (
            <div key={index}>
              <input
                name='name'
                placeholder='Name'
                onChange={event => handleFormChange(event, index)}
                value={form.name}
              />
              <input
                name='surname'
                placeholder='Surname'
                onChange={event => handleFormChange(event, index)}
                value={form.surname}
              />
              <button type="button" onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
      <button type="button" onClick={addActorFields}>Add More..</button>
      </div>
        {/* <button type="button" onClick={addAct}>+</button> */}

        {/* <div >
            <label>Actor Name</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
            <label>Actor Surname</label>
            <input type="text" value={surname} onChange={(event) => setSurname(event.target.value)}/>
        </div> */}
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
