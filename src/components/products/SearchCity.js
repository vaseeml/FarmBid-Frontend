import { useState,useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Select from 'react-select'
import {Col , Row , Container } from "react-bootstrap"
import {  faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setSelectedCity } from "../../actions/product-actions"
export default function SearchCity(){
    const [ selectCity , setSelectCity ] = useState([])
    const city = useSelector((state)=>{
        return state.products?.setCity
    })
    const dispatch = useDispatch()
    const handleChange=(e)=>{
        const selectedCity = e.value
        dispatch(setSelectedCity(selectedCity))
        // dispatch(getStartLiveProducts({setCity:selectedCity}))
    }
    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get('http://localhost:4000/api/getcity')
                const sortedCities = response.data.sort((a , b)=> a.localeCompare(b))// react select will automatically does the sorting
                setSelectCity(sortedCities.map(city => ({value:city , label:city})))
                // setSelectCity(response.data)
            } catch(err){
                console.log(err)
            }
        })();
    },[])
    return(
        <div className="d-flex align-items-center">
        <Col md={4}>
            <h5>Select Region</h5>
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
            <h6><FontAwesomeIcon style={{ marginLeft: '239px' }} icon={faLocationArrow}  />{city}</h6>
            
            </Col>
        )}
    </div>
    // <Container>
    //         <Row className="w-100">
    //             <Col md={4} className="d-flex justify-content-center align-items-center">
    //                 <h5>Select Region</h5>
    //             </Col>
    //             <Col md={3} className="d-flex align-items-center">
    //                 <Select
    //                     options={selectCity}
    //                     value={selectCity.value}
    //                     onChange={handleChange}
    //                     placeholder="Search for a district..."
    //                     isSearchable
    //                 />
    //             </Col>
    //             {city && (
    //                 <Col md={5} className="d-flex justify-content-right align-items-center">
    //                     <h6>
    //                         <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faLocationArrow} />
    //                         {city}
    //                     </h6>
    //                 </Col>
    //             )}
    //         </Row>
    //     </Container>
    )
}
