import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import axios from 'axios'
export default function Admin(){
    const [cdata,setCdata]=useState([])

    useEffect(()=>{
        (async()=>{
            try{
                const response=await axios.get('http://localhost:3000/api/profiles',{
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
            // console.log(response.data)
        
            setCdata(response.data)
            }catch(err){
                console.log(err)
            }
        })()
    },[])
    
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
            cell: (row) => <img src={`http://localhost:3000/${row.image}`} alt="User" style={{ width: '100px', height: '90px' }} />
        }
        
    ]
    // const staticData=[cdata]
    return (
        <div>
            <h2>Total Customers</h2>            
                <DataTable
                    columns={columns}
                    data={cdata}
                    pagination
                ></DataTable>
            
        </div>
    )
}