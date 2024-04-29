
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';
import axios from 'axios';

export default function WalletTransactions() {
    const [walletTransactions, setWalletTransactions] = useState([])
    const userWallet = useSelector((state) => {
        return state.user?.wallet
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/wallet-topup/${userWallet._id}/transactions`, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                setWalletTransactions(response.data)

            } catch (err) {
                console.log(err);
            }
        })();
    }, [userWallet]);

    return (
        <div>
            <h4>Wallet TopUp History</h4>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Transaction Date</TableCell>
                            <TableCell>Payment Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {walletTransactions.map((transaction) => (
                            <TableRow key={transaction._id} >
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.transactionId}</TableCell>
                                <TableCell>{new Date(transaction.createdAt).toLocaleString('en-In' , 'Asia/Kolkata')}</TableCell>
                                <TableCell style={{ backgroundColor: transaction.paymentStatus === 'successful' ? 'lightgreen' : 'inherit' }}>
                                    {transaction.paymentStatus}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
