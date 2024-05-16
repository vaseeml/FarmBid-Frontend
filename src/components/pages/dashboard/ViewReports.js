
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
export default function ViewReports() {
    const [reports, setReports] = useState([]);
    const [modal, setModal] = useState(false);
    const [more, setMore] = useState({});
    const profile = useSelector((state)=>{
        return state.admin?.profiles.find(ele=>ele.userId?._id == more.orderId?.product?.sellerId?._id)
    })
    const toggle = () => {
        setModal(!modal);
    };
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/view/${profile._id}/seller`)
    }
    // const handleBlock = () => {
    //     navigate('/blocked/sellers')
    // }
    const handleSetMore = (row)=>{
        console.log(row)
        toggle()
        setMore(row)
    }
    const columns = [
        {
            name: 'Reporter Name',
            selector: row => row.reporterId?.username,
            sortable: true
        },
        {
            name: 'Phone',
            selector: row => row.reporterId?.phone,
            sortable: true
        },{
            name: 'Bid Amount',
            selector: row => row.orderId?.bidAmount,
            sortable: true
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true
        },
        {
            name: 'image',
            cell: (row) => <img src={`http://localhost:4000/${row.productImage[0]}`} alt="User" style={{ width: '100px', height: '90px' }} />
        },
        {
            name: 'Actions',
            cell: (row) => <button onClick={() => handleSetMore(row)}>Details</button>
        }

    ]

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/reports', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                setReports(response.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <div>
            <h2>Reports</h2>
            <DataTable
                title="Reports"
                columns={columns}
                data={reports}
                pagination
            ></DataTable>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
                <ModalBody>
                    <h5>Seller Name: {more.orderId?.product?.sellerId?.username.toUpperCase()}</h5>
                    <p>Seller Id: {more.orderId?.product?.sellerId?._id}</p>
                    <p>Product Id: {more.orderId?.product?._id}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleNavigate}>Take Action</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
