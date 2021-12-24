import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Caclulated = (props) => {

    const location = useLocation();
    const history = useHistory();

    const [state, setState] = useState({  loading: true });
    useEffect(() => {
        if (location.state === undefined) {
            history.push('/')
        }
        Caclulate(location.state.props)
    }, [location,history]);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
        },
        {
            field: 'balance',
            headerName: 'End of The Day Balance',
            type: 'number',
            width:200,
        },
        {
            field: 'date',
            headerName: 'Booking Date',
            width: 200,
            type:'dateTime'
        },
    ];

    return (
        <Grid Container>
            {state.loading ? <p><em>Loading...</em></p> : <div>
                <Grid style={{ background: '#b8f1fc' }}>
                    <Typography style={{ marginLeft: '5%' }}> TOTAL</Typography>
                    <Typography style={{ marginLeft: '5%' }}> Total Credits :  {state.calc.totalCredits ?? ''}</Typography>
                    <Typography style={{ marginLeft: '5%' }}> Total Debits :   {state.calc.totalDebits ?? ''}</Typography>
                </Grid>
                <Grid>
                    <div style={{ padding: '10px' }}>
                        End of the day balances
                    </div>
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            rows={state.calc.endOfDayBalances.map((obj, index) => ({ ...obj, id: index+1,date: `${new Date(obj.date).getDate()}-${new Date(obj.date).getMonth() + 1}-${new Date(obj.date).getFullYear()}`  }))} 
                            columns={columns}
                            autoHeight={true}
                            pageSize={5}
                            density='compact'
                            disableColumnFilter={true}
                            disableColumnMenu={true}
                            disableColumnSelector={true}
                            rowsPerPageOptions={[5]}
                        />
                    </div>
                    <div style={{ padding: '50px', textAlign: 'end' }}>
                        <Button variant="contained" onClick={()=>history.push('/')}>Back</Button>
                    </div>

                </Grid>
            </div>}
        </Grid>
    );

    async function Caclulate(accountInfo) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountInfo)
        };
        const response = await fetch('account/calculate', requestOptions);
        const data = await response.json();
        setState({ calc: data.result, loading: false });
        
    }
}
