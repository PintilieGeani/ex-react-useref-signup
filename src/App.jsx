import { useState } from "react"

function App() {

  const [nome, setNome] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [spec, setSpec] = useState("")
  const [exp, setExp] = useState(0)
  const [description, setDescription] = useState("")
  
  const handlePassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const handleExp = (e) => {
    e.preventDefault()
    if(e.target.value < 0){
      console.log("Esperienza negativa")
      return
    }else{
      setExp(e.target.value)
    }
  }

   const handleSpec = (e) => {
    e.preventDefault()
      setSpec(e.target.value)
  }

  const handleForm = (e) => {
    e.preventDefault()
    if(spec === ""){
      console.log("Seleziona la Specializzazione")
      return
    }
    console.log({
      nome: nome,
      username: username,
      password: password,
      specializzazione: spec,
      esperienza: exp,
      descrizione: description
    })
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleForm}>
        <input 
        type="text"
        placeholder="Nome Completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        />
        <input 
        type="text"
        autoComplete="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <input 
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={handlePassword}
        />
        <select 
        name="Seleziona specializzazione"
        id="Spec"
        value={spec}
        onChange={handleSpec}
        >
          <option value="">Specializzazione</option>
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="Full Stack">Full Stack</option>
        </select>
        <input 
        type="number"
        placeholder="Anni di esperienza"
        min={1}
        value={exp}
        onChange={handleExp}
        />
        <textarea 
        name="Text-area" 
        id="txt"
        placeholder="Breve descrizione dello sviluppatore"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        >

        </textarea>

        <button type="submit">Submit</button>
        </form>

      </div>
    </>
  )
}

export default App
