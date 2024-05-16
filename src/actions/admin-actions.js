import axios from 'axios'
export const startGetAllProfiles = ()=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get('http://localhost:4000/api/profiles/all' , {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(setProfiles(response.data))
        } catch(err){
            console.log(err)
        }
    }
}

const setProfiles = (data)=>{
    return {
        type:'SET_PROFILES',
        payload:data
    }
}