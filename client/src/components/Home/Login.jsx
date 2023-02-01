import React from 'react'

const Login = () => {
    //const [username, setUsername] = useState
    //const [email, setEmail] = useState
    //const [password, setPassword] = useState
//
    //const setUsername = ()=> {
//
    //}
  return (
    <form className='grid bg-blue-600 border rounded border-blue-600 p-5'>
        <label className='' for='username'>Username</label>
        <input className='my-1 px-1.5 py-0.5' /*value={username}*/ type='name' placeholder='Username' id='name' name='name'></input>
        <label className='' for='email'>Email</label>
        <input className='my-1 px-1.5 py-0.5' /*value={email}*/ type='email' placeholder='email@gmail.com' id='email' name='email'></input>
        <label className='' for='password'>Password</label>
        <input className='my-1 px-1.5 py-0.5' /*value={password}*/ type='password' placeholder='password' id='password' name='password'></input>
        <button className='bg-orange-400 border-orange-400 border rounded my-1'>Log In</button>
        <button className='bg-orange-400 border-orange-400 border rounded my-1'>Log In As Guest</button>
        <button className='bg-orange-400 border-orange-400 border rounded my-1'>Create an Accout</button>
    </form>
  )
}

export default Login