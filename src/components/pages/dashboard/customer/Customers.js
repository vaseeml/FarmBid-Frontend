import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Customers(){
    const [ searchQuery , setSearchQuery] = useState('')
    const navigate = useNavigate()
    const profiles = useSelector((state)=>{
        return state.admin.profiles.filter(ele=>ele.userId?.role == 'buyer')
    })
    const filterSearchProfiles =  profiles.filter(ele=>ele.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const handleActions = (id)=>{
        alert(`clicked the user of id ${id}`)
        navigate(`/view/${id}/customer`)
    }
    const columns=[
        {
            name:'Name',
            selector:row=>row.name,
            sortable:true
        },
        {
            name:'Address',
            selector:row=>row.address,
            sortable:true
        },
        {
            name:'Phone',
            selector:row=>row.phone,
            sortable:true
        },
        {
            name:'description',
            selector:row=>row.description,
            sortable:true
        },
        {
            name:'image',
            cell: (row) => <img src={`http://localhost:4000/${row.image}`} alt="User" style={{ width: '100px', height: '90px' }} />
        },
        {
            name:'Actions',
            cell: (row) => <button className='btn btn-primary' onClick={()=>handleActions(row._id)}>View Details</button>
        }
        
    ]
    return (
        <div>
            <h2>Total Customers/Buyers - {profiles?.length}</h2>
            <input 
            type='text'
            placeholder='search by name...'
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            />
            <DataTable
                    columns={columns}
                    data={filterSearchProfiles}
                    pagination
            ></DataTable>
        </div>
    )
}