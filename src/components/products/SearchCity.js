import { useState,useEffect } from "react"
import axios from 'axios'
import Select from 'react-select'
import {Col } from "react-bootstrap"
import {  faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function SearchCity(){
    const [ selectCity , setSelectCity ] = useState([])
    const [ city , setCity ] = useState('')
    const handleChange=(selectedCity)=>{
        setCity(selectedCity?.value)
    }
    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get('http://localhost:3000/api/getcity')
                setSelectCity(response.data.map(city => ({value:city , label:city})))
                // setSelectCity(response.data)
            } catch(err){
                console.log(err)
            }
        })();
    },[])
    return(
        <div className="d-flex align-items-center">
        <Col md={4}>
            <h3>Select Region</h3>
        </Col>
        <Col md={3}>
                    <Select
                        options={selectCity}
                        value={selectCity.value}
                        onChange={handleChange}
                        placeholder="Search for a district..."
                        isSearchable
                    />
        </Col>
        {city && (
          <Col md={5}>
            <h3><FontAwesomeIcon style={{ marginLeft: '239px' }} icon={faLocationArrow}  />{city}</h3>
            
            </Col>
        )}
    </div>
    )
}
