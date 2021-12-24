import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useHistory } from "react-router-dom";

export const Home = () => {

  const [state, setState] = useState({ account: { balances: { current: { amount: 0 } } }, loading: true });
  const history = useHistory();
  const calculate = () => {
    history.push({ pathname: "/calculated", state: { props: state.account } })
  }
  useEffect(() => {
    fetchDataFromAccount()
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'creditDebitIndicator',
      headerName: 'Credit/Debit',
      width: 130
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 90,
    },
    {
      field: 'bookingDate',
      headerName: 'Booking Date',
      width: 200,
    },
  ];

  return (
    <Grid Container>
      {state.loading ? <p><em>Loading...</em></p> : <div>
        <Grid style={{ background: '#b8f1fc' }}>
          <Typography style={{ marginLeft: '5%' }}>  {state.account.accounts[0].displayName ?? ''}</Typography>
          <Typography style={{ marginLeft: '5%' }}> Account Type :  {state.account.accounts[0].accountType ?? ''}</Typography>
          <Typography style={{ marginLeft: '5%' }}> Current Balance:   {state.account.accounts[0].balances.current.amount ?? ''} {state.account.accounts[0].currencyCode}</Typography>
        </Grid>
        <Grid>
          <div style={{ padding: '10px' }}>
            Transaction history
          </div>
          <div style={{ width: '100%' }}>
            <DataGrid
              rows={state.account.accounts[0].transactions.map((obj, index) => ({ ...obj, id: index + 1, bookingDate: `${new Date(obj.bookingDate).getDate()}-${new Date(obj.bookingDate).getMonth() + 1}-${new Date(obj.bookingDate).getFullYear()}` }))}
              columns={columns}
              density='compact'
              autoHeight={true}
              pageSize={5}
              disableColumnFilter={true}
              disableColumnMenu={true}
              disableColumnSelector={true}
              rowsPerPageOptions={[5]}
            />
          </div>
          <div style={{ padding: '50px', textAlign: 'end' }}>
            <Button variant="contained" onClick={() => calculate()}>Calculate</Button>
          </div>

        </Grid>
      </div>}
    </Grid>
  );

  async function fetchDataFromAccount() {
    const response = await fetch('account');
    const data = await response.json();
    setState({ account: data, loading: false });
  }
}
