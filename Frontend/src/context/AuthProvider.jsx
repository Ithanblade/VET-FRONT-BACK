import axios from "axios"
import { createContext, useEffect, useState } from "react"
import jwt from 'jsonwebtoken'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    console.warn(auth)
    
    const perfil = async(token) => {
        const {rol} = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET)
        const url = rol=="paciente"
            ? `${import.meta.env.VITE_BACKEND_URL}/paciente/perfil`
            : `${import.meta.env.VITE_BACKEND_URL}/perfil`
        
        try {
            const options={ 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url,options)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])

    const actualizarPerfil = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/${datos.id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            perfil(token)
            return {respuesta:respuesta.data.msg,tipo:true}
        } catch (error) {
            return {respuesta:error.response.data.msg,tipo:false}
        }
}


const actualizarPassword = async (datos) => {
    const token = localStorage.getItem('token')
    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/actualizarpassword`
        const options = {
            headers: {
                method: 'PUT',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const respuesta = await axios.put(url, datos, options)
        return { respuesta: respuesta.data.msg, tipo: true }
    } catch (error) {
        return { respuesta: error.response.data.msg, tipo: false }
    }
}
    
    return (
        <AuthContext.Provider value={
            {
                auth,
                setAuth,
                actualizarPerfil,
                actualizarPassword            
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext