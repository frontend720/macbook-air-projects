import {createContext, useState} from "react"

const ThemeContext = createContext()

function VaultContextProvider(props){

    const [passwordContext, setPasswordContext] = useState("")

    function getPasswords(password){
        setPasswordContext(password)
    }

    return(
        <ThemeContext.Provider value={{passwordContext, getPasswords}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, VaultContextProvider}