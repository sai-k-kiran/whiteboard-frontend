import axios from 'axios'

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})

export const saveUser = async (user) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/users`,
            user
            )
    }
    catch(err){
        console.log(err)
    }
}

export const deleteUser = async (id) => {
    try{
        return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${id}`,
        getAuthConfig()  
        )
    }
    catch (err){
        throw err
    }
}

export const updateUser = async (id, update) => {
    try{
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${id}`,
        update,
        getAuthConfig()      
        )
    }
    catch (err){
        throw err
    }
}
 
export const login = async (user) => {
    try{
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
        user
        )
    }
    catch (err){
        throw err
    }
}