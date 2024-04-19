import { useSelector } from 'react-redux'
export default function Customers() {
    const profiles = useSelector((state) => {
        return state.admin.profiles.filter(ele => ele.userId?.role == 'buyer')
    })
    console.log(profiles)
    return (
        <div>
            <h2>Total Customers/Buyers - {profiles?.length}</h2>
            <div>
                {
                    profiles.map((ele) => {
                        return <div key={ele._id}>
                            {ele.name} - {ele.phone}
                        </div>
                    })
                }
            </div>
        </div>
    )
}