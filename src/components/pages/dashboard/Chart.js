// import { Line } from 'react-chartjs-2'
// import { useEffect , useState } from 'react'
// import axios from 'axios';
// export default function Chart(){
//     const [ allBids , setAllBids ] = useState([])
//     const [ selectedVeg , setSelectedVeg ] = useState('')
//     const selectedVegetable = allBids.filter(veg=>veg.productId?.productName.toLowerCase().includes(selectedVeg.toLowerCase()))
//     console.log('selectedVeg' , selectedVegetable)
//     const chartData = {
//         labels: selectedVegetable.map(bid => new Date(bid.createdAt)), // Convert createdAt to Date objects
//         datasets: [
//             {
//                 label: 'Bid Amount',
//                 data: selectedVegetable.map(bid => bid.amount),
//                 borderColor: 'rgb(75, 192, 192)',
//                 fill: false,
//             }
//         ],
//     };
//     useEffect(()=>{
//         (async()=>{
//             try{
//                 const response = await axios.get('http://localhost:3000/api/bids/all' , {
//                     headers:{
//                         'Authorization':localStorage.getItem('token')
//                     }
//                 })
//                 console.log('response.data' , response.data)
//                 setAllBids(response.data)
//             } catch(err){
//                 console.log(err)
//                 alert('error while loading chart data!')
//             }
//         })();
//     },[])
//     return(
//         <div>
//             <h4>Recent Trends Of Vegetables</h4>
//             <select value={selectedVeg} onChange={(e)=>setSelectedVeg(e.tager.value)}>
//                 <option value='methi'>methi</option>
//                 <option value='kotombir'>cooriander leaves</option>
//             </select>
//             {selectedVegetable.length > 0 ? (
//                 <Line data={chartData} />
//             ) : (
//                 <p>No data available for the selected vegetable.</p>
//             )}
//         </div>
//     )
// }
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js/auto';
import 'chartjs-adapter-moment';

// Register the required components
registerables.forEach((item) => Chart.register(item));

export default function ChartComponent() {
    const [allBids, setAllBids] = useState([]);
    const [selectedVeg, setSelectedVeg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/bids/all', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                setAllBids(response.data);
            } catch(err) {
                console.log(err);
                alert('Error while loading chart data!');
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Filter data based on selected vegetable
        const selectedVegetable = allBids.filter(veg => veg.productId.productName.toLowerCase().includes(selectedVeg.toLowerCase()));

        // Prepare data for candlestick chart
        const data = selectedVegetable.map(bid => ({
            t: new Date(bid.createdAt), // Time
            o: bid.amount, // Open
            h: bid.amount, // High
            l: bid.amount, // Low
            c: bid.amount, // Close
        }));

        // Create chart
        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: selectedVeg,
                    data: data,
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }
                }
            }
        });
    }, [selectedVeg, allBids]);

    return (
        <div>
            <h4>Recent Trends Of Vegetables</h4>
            <select value={selectedVeg} onChange={(e) => setSelectedVeg(e.target.value)}>
                <option value='methi'>Methi</option>
                <option value='kotombir'>Coriander Leaves</option>
            </select>
            <canvas id="chart" width="400" height="200"></canvas>
        </div>
    );
}
