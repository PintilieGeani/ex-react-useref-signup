import { useState, useEffect } from "react"

function App() {

  const [nome, setNome] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [spec, setSpec] = useState("")
  const [exp, setExp] = useState(0)
  const [description, setDescription] = useState("")
  const [pwdValid, setPwdValid] = useState(false)
  const [userValid, setUserValid] = useState(false)
  const [descriptionValid, setDescriptionValid] = useState(false)

  // Array per le validazioni della password
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|; :'\\,.<>?/`~";

  const handlePassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const handleExp = (e) => {
    e.preventDefault()
    if (e.target.value < 0) {
      console.log("Esperienza negativa")
      return
    } else {
      setExp(e.target.value)
    }
  }

  const handleSpec = (e) => {
    e.preventDefault()
    setSpec(e.target.value)
  }

  const handleForm = (e) => {
    e.preventDefault()
    if (spec === "") {
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



  useEffect(() => {
    const validazionePwd = () => {
      const hasNumber = numbers.split("").some((num) => password.includes(num));
      const hasLetter = letters.split("").some((lett) => password.includes(lett));
      const hasSymbol = symbols.split("").some((elem) => password.includes(elem));
      if(hasNumber && hasLetter && hasSymbol){
        setPwdValid(true)
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
          <p className={descriptionValid ? "valid" : "invalid"}>{descriptionValid ? "Descrizione valida" : "La descrizione deve contenere almeno 100 caratteri ma meno di 1000"}</p>

          <button type="submit">Submit</button>
        </form>

      </div>
    </>
  )
}

export default App
