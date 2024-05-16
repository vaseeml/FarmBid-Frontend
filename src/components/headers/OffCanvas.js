import { useState , useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Nav, Form, Table, Button } from 'react-bootstrap';
import axios from "axios"

export default function OffCanvas({handleUpdateAmount , handleSetAmount, updateAmount , wallet}){
    const [transactions , setTransactions ] = useState([])
    const [ page , setPage ] = useState(1)
    const [ limit , setLimit ] = useState(5)
    const { user } = useAuth()
    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get(`http://localhost:4000/api/wallet/transactions?page=${page}&limit=${limit}` , {
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
                setTransactions(response.data)
            } catch(err){
                console.log(err)
            }
        })();
    },[page ,limit , localStorage.getItem('token')])
    return (
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Wallet Balance - {wallet}</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {user?.role == 'buyer' && <Form>
              <Form.Group controlId="walletAmount">
              <Form.Label>Add Balance</Form.Label>
              <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={updateAmount}
                  onChange={(e) => handleSetAmount(e.target.value)}
              />
              </Form.Group>
              <Button variant="primary" onClick={handleUpdateAmount}>
                  Add
              </Button>
          </Form>}
          {/* <button className="btn btn-success" onClick={handleGetTransactions}>Get Wallet Transactions</button> */}
          {
            user?.role == 'seller' ? <div>
                <h4>Credited Balance History</h4>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Credit Amount</th>
                            <th>Date</th>
                            <th>From</th>
                            <th>For Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td style={{color:'green'}}>{transaction.bidAmount}Rs</td>
                                <td>{new Date(transaction.createdAt).toLocaleDateString('en-IN')}</td>
                                <td>{transaction.bidder?.username}</td>
                                <td>{transaction.product?.productName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <button disabled={page <=1} onClick={()=>{
                    setPage(prev=>prev -1)
                }}>prevoius</button><span>{page}</span>
                <button disabled={transactions.length == 0} onClick={()=>{
                    setPage(prev=>prev + 1)
                }}>next</button>
                <select onChange={(e)=>setLimit(e.target.value)}>
                    <option value={5}>5</option>
                    <option value={8}>8</option>
                    <option value={10}>10</option>
                </select>
            </div>
          :(
            <div>
                <h4>Transactions</h4>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Product Name</th>
                            <th>Base Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td style={{color:'red'}}>{transaction.amount}Rs</td>
                                <td>{new Date(transaction.createdAt).toLocaleDateString('en-IN')}</td>
                                <td>{transaction.productId?.productName}</td>
                                <td>{transaction.productId?.basePrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <button disabled={page <=1} onClick={()=>{
                    setPage(prev=>prev -1)
                }}>prevoius</button><span>{page}</span>
                <button disabled={transactions.length == 0} onClick={()=>{
                    setPage(prev=>prev + 1)
                }}>next</button>
                <select onChange={(e)=>setLimit(e.target.value)}>
                    <option value={5}>5</option>
                    <option value={8}>8</option>
                    <option value={10}>10</option>
                </select>
                </div>
            )}
      </div>
    </div>
    )
}