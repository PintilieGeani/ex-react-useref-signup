import { useState, useEffect, useRef } from "react"

function App() {
// Stati
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [description, setDescription] = useState("")
  const [pwdValid, setPwdValid] = useState(false)
  const [userValid, setUserValid] = useState(false)
  const [descriptionValid, setDescriptionValid] = useState(false)

  // Campi non controllati con useRef
  const nomeRef = useRef()
  const specRef = useRef()
  const expRef = useRef()


  // Array per le validazioni della password
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|; :'\\,.<>?/`~";

  const handlePassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  


  const handleForm = (e) => {
    e.preventDefault()
    if (specRef.current.value === "") {
      console.log("Seleziona la Specializzazione")
      return
    }
    if(!descriptionValid){
      console.log("Descrizione non valida")
      return
    }
    if(!userValid){
      console.log("Username non valido")
      return
    }
    if(!pwdValid){
      console.log("Password non valida")
      return
    }
    console.log({
      nome: nomeRef.current.value,
      username: username,
      password: password,
      specializzazione: specRef.current.value,
      esperienza: expRef.current.value,
      descrizione: description
    })
  }




  useEffect(() => {
    const validazionePwd = () => {
      const hasNumber = password.split("").some((num) => numbers.includes(num));
      const hasLetter = password.split("").some((lett) => lett.includes(lett));
      const hasSymbol = password.split("").some((elem) => symbols.includes(elem));
      if(hasNumber && hasLetter && hasSymbol){
        setPwdValid(true)
      }else{
        setPwdValid(false)
      }
    };

    validazionePwd();
  }, [password]);

  useEffect(() => {
    const validazioneUsername = () => {
      const hasSymbol = symbols.split("").some((elem) => username.includes(elem))
      if(username.length > 6 && hasSymbol === false){
        setUserValid(true)
      }else{
        setUserValid(false)
      }
    }
    validazioneUsername()
  }, [username])

  useEffect(() => {
    if(description.trim().length > 100 && description.trim().length < 1000){
      setDescriptionValid(true)
    }else{
      setDescriptionValid(false)
    }
  },[description])

  useEffect(() => {
    nomeRef.current.focus()
  },[])


  const handleReset = () => {
    setDescription("")
    setPassword("")
    setUsername("")
    nomeRef.current.value = ""
    expRef.current.value = ""
    specRef.current.value = ""
  }


  return (
    <>
      <div className="container">
        <h1>Inserisci i tuoi dati</h1>
        <form 
        className="glass"
        onSubmit={handleForm}
        >
          <input
            type="text"
            placeholder="Nome Completo"
            ref={nomeRef}
          />
          <input
            type="text"
            autoComplete="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className={userValid? "valid" : "invalid"}>{userValid ? "Username Valido" : "Username deve contenere almeno 6 caratteri alfanumerici senza simboli o spazi"}</p>
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={handlePassword}
          />
          <p className={password.length > 0 && pwdValid ? "valid" : "invalid"}>{password.length > 0 && pwdValid ? "Password valida" : "La password deve contenere almeno un numero"}</p>
          <select
            name="Seleziona specializzazione"
            id="Spec"
            ref={specRef}
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
            ref={expRef}
          />
          <textarea
            name="Text-area"
            id="txt"
            placeholder="Breve descrizione dello sviluppatore"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </textarea>
          <p className={descriptionValid ? "valid" : "invalid"}>{descriptionValid ? "Descrizione valida" : "La descrizione deve contenere almeno 100 caratteri ma meno di 1000"}</p>
          
          <div className="buttons">
          <button 
          type="submit"
          >Submit</button>
          <button 
          type="button"
          onClick={handleReset}
          >RESET</button>
          </div>
        </form>
      <div 
      onClick={() => nomeRef.current.focus()}
      className="arrow glass"
      >
        <p >&uarr;</p>
      </div>
      </div>
    </>
  )
}

export default App
