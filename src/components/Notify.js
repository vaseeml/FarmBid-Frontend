import { toast } from "react-toastify"
export const loginNotify = ()=>{
    toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 2000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}

export const registrationNotify = ()=>{
    toast.success('Registration successful!', {
        position: 'top-right',
        autoClose: 2000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}

export const productCreatedNotify = ()=>{
    toast.success('Product created successful!', {
        position: 'top-left',
        autoClose: 2000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}

export const profileCreatedNotify = ()=>{
    toast.success('Profile created successful!', {
        position: 'top-right',
        autoClose: 2000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}
export const profileUpdateNotify = ()=>{
    toast.success('Profile update successful!', {
        position: 'top-right',
        autoClose: 2000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}
export const newBidPlacedNotify = ()=>{
    toast.success('New Bid!', {
        position: 'top-right',
        autoClose: 2000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}