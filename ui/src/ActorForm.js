import {useState} from "react";

export default function ActorForm(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
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
    
   
    function addActor(event) {
        event.preventDefault();
        // if (name.length === 0 || surname.length === 0) {
        //     return alert('Add actor name and surname, please');
        // }
        props.onAddActor({name, surname});  
        // setActorFields([{name: '', surname: ''}]); 
        setName(...name, name);
        setSurname(...surname, surname);
    }


    return <form onSubmit={addActor}>
        <h3>Actors</h3>
        <div>
        <label>Name</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
        </div>
        <div>
            <label>Surname</label>
            <input type="text" value={surname} onChange={(event) => setSurname(event.target.value)}/>
        {/* {actorFields.map((form, index) => {
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
      <button type="button" onClick={addActorFields}>Add More..</button> */}
      </div>
    <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}