import React, {useState, useEffect} from 'react';

const API = process.env.REACT_APP_API;

export const Users = () => {

    const [fecha_nac, setFechaNac] = useState('')
    const [num_celular, setNumMov] = useState('')
    const [sede, setSede] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [password, setPassword] = useState('')
    const [correo, setCorreo] = useState('')

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const [users, setUsers] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!editing){
            console.log(API)
            const response = await fetch(`${API}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    fecha_nac,
                    num_celular,
                    sede,
                    nombre,
                    apellido,
                    password,
                    correo
                })
            })
            const data = await response.json();
            console.log(data)
        } else {
            const res = await fetch(`${API}/users/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    fecha_nac,
                    num_celular,
                    sede,
                    nombre,
                    apellido,
                    password,
                    correo
                })
            })
            const data = await res.json();
            console.log(data)
            setEditing(false);
            setId('');
        }



        await getUsers();

        setFechaNac('')
        setNumMov('')
        setSede('')
        setNombre('')
        setApellido('')
        setPassword('')
        setCorreo('')
    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`)
        const data = await res.json();
        setUsers(data)
    }

    useEffect( () => {
        getUsers();
    }, [])

    const editUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`)
        const data = await res.json();

        setEditing(true);

        setId(data._id)

        setFechaNac(data.fecha_nac)
        setNumMov(data.num_celular)
        setSede(data.sede)
        setNombre(data.nombre)
        setApellido(data.apellido)
        setPassword(data.password)
        setCorreo(data.correo)
  

    }

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Desea eliminar el usuario?')
        if (userResponse) {
            const res = await fetch(`${API}/users/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            console.log(data)
            await getUsers();
        }
    }



    return(
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">

                    <div className="form-group">
                        <input type="text" 
                        onChange={e => setFechaNac(e.target.value)} 
                        value={fecha_nac} 
                        className="form-control"
                        placeholder="Fecha de Nacimiento"
                        />
                    </div>

                    <div className="form-group">
                        <input type="text" 
                        onChange={e => setNumMov(e.target.value)} 
                        value={num_celular} 
                        className="form-control"
                        placeholder="Numero Movil"
                        pattern="[0-9]{9}"
                        />
                    </div>

                    <div className="form-group">
                        <input type="text" 
                        onChange={e => setSede(e.target.value)} 
                        value={sede} 
                        className="form-control"
                        placeholder="Sede"
                        />
                    </div>

                    <div className="form-group">
                        <input type="text" 
                        onChange={e => setNombre(e.target.value)} 
                        value={nombre} 
                        className="form-control"
                        placeholder="Nombre"
                        autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <input type="text" 
                        onChange={e => setApellido(e.target.value)} 
                        value={apellido} 
                        className="form-control"
                        placeholder="Apellido"
                        autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <input type="password" 
                        onChange={e => setPassword(e.target.value)} 
                        value={password} 
                        className="form-control"
                        placeholder="Password"
                        pattern=".{8,}" title="Ocho o mas caracteres"
                        />
                    </div>

                    <div className="form-group">
                        <input type="email" 
                        onChange={e => setCorreo(e.target.value)} 
                        value={correo} 
                        className="form-control"
                        placeholder="Correo"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                    </div>
                    
                    <button className="btn btn-primary btn-block">
                        {editing ? 'Editar Usuario' : 'Crear Usuario'}
                    </button>

                </form>
            </div>
            <div className="col-md-8">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Sede</th>
                            <th>Numero Celular</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map( user => (
                        <tr key={user._id}>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.correo}</td>
                            <td>{user.sede}</td>
                            <td>{user.num_celular}</td>
                            <td>{user.fecha_nac}</td>
                            <td>
                                <button 
                                    className="btn btn-secondary btn-sm btn-block"
                                    onClick={(e) => editUser(user._id)}>
                                        Editar
                                </button>

                                <button 
                                    className="btn btn-danger btn-sm btn-block"
                                    onClick={(e) => deleteUser(user._id)}>
                                        Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}