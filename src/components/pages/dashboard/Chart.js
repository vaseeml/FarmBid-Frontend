import React from 'react';
import { Bar , Pie } from 'react-chartjs-2';
import { useState , useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js'

import axios from 'axios';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  
export default function Chart() {
    const [ selectedProduct , setSelectedProduct ] = useState('')
    const [ bidsOnProduct , setBidsOnProducts ] = useState([])
    const [ customersData , setCutomersData ] = useState([])
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    }
    useEffect(()=>{
        // console.log(selectedProduct)
        (async()=>{
            try{
                const response = await axios.get(`http://localhost:4000/api/bids/on?search=${selectedProduct}` , {
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
                const usersData = await axios.get('http://localhost:4000/api/users/all' , {
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
                setCutomersData(usersData.data)
                const filterCurrentMonthBids = (bidsData)=>{
                    const currentDate = new Date()
                    const currentMonth = currentDate.getMonth()
                    const currentYear = currentDate.getFullYear()
                    
                    const currentMonthBids = bidsData.filter(bid=>{
                        const bidDate = new Date(bid.createdAt)
                        return bidDate.getMonth() === currentMonth && bidDate.getFullYear() === currentYear
                    })
                    return currentMonthBids
                }
                // const generateLabels = (time)=>{
                //     const labels = []
                //     const currentDate = new Date()
                //     const currentMonth = currentDate.toLocaleDateString('en-In' , { month:'long' })
                    
                //     for(let i = 6 ; i>=0; i--){
                //         const date = new Date(currentDate)
                //         date.setDate(date.getDate() - i )
                //         labels.push(`${date.getDate()} ${currentMonth}}`)
                //     }
                //     return labels
                // }
                const generateChartData = (bidsData) => {
                  // Group bids by day and calculate average bid amount for each day
                  const groupedBids = bidsData.reduce((acc, bid) => {
                      const bidDate = new Date(bid.createdAt).toLocaleDateString('en-US');
                      acc[bidDate] = acc[bidDate] || [];
                      acc[bidDate].push(bid.amount);
                      console.log(acc)
                      return acc;
                  }, {});
              
                  const labels = Object.keys(groupedBids);
                  const avgBidAmounts = labels.map((date) => {
                      const bids = groupedBids[date];
                      const total = bids.reduce((sum, bid) => sum + bid, 0);
                      return total / bids.length;
                  });
              
                  return {
                      labels,
                      datasets: [
                          {
                              label: 'Average Bids Placed',
                              data: avgBidAmounts,
                              backgroundColor: 'rgba(255, 99, 132, 0.5)',
                          },
                      ],
                  };
              };
                console.log('response.data' , response.data)
                const currentMonthBids = filterCurrentMonthBids(response.data)
                console.log('currentMonthbids' , currentMonthBids)
                const time = currentMonthBids?.map(bid => bid.createdAt)
                // const bidAmounts = currentMonthBids?.map(bid => bid.amount)
                const labels = generateChartData(currentMonthBids)
   
                // const data = {
                //     labels,
                //     datasets: [
                //         {
                //         label: 'Bids Placed',
                //         data: bidAmounts, // Example data (replace with your actual data)
                //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
                //     }
                //     ]
                // }
                // console.log(data)
                setBidsOnProducts(labels)
            } catch(err){
                console.log(err)
            }
        })();
    },[selectedProduct])
    const totalBuyers = customersData?.filter(buyer => buyer.role == 'buyer').length
    const totalSellers = customersData?.filter(seller => seller.role === 'seller').length

    const userData = {
        labels:['sellers' , 'buyers'],
        datasets:[
            {
                label:'user',
                data:[totalBuyers , totalSellers],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1,
            }
        ]
    }
  return (
    <Container>
    <Row>
      <Col>
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Select Product</Form.Label>
            <Form.Control as="select" custom onChange={(e) => setSelectedProduct(e.target.value)}>
              <option value=''>select product</option>
              <option value='methi'>Methi</option>
              <option value='kotombir'>Coriander leaves</option>
              <option value='potato'>potato</option>
            </Form.Control>
          </Form.Group>
        </Form>
        {selectedProduct && (
          <div style={{ width: '500px', height: '400px' }}>
            <Bar options={options} data={bidsOnProduct} />
          </div>
        )}
      </Col>
      <Col>
        <div style={{ width: '500px', height: '400px' }}>
          <Pie data={userData} />
        </div>
      </Col>
    </Row>
  </Container>
  )
}
