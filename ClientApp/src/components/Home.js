import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useHistory } from "react-router-dom";
import { fetchDataFromAccount } from '../Helpers/RequestHelper';
import * as Routes from '../Helpers/RequestRoutes' 
import ColumnHelper from '../Helpers/ColumnsHelper';
import formatDate from '../Helpers/FormatDateHelper';

export const Home = () => {

  const [state, setState] = useState({
    account: {
      balances: {
        current: {
          amount: 0
        }
      }
    },
    loading: true,
    message: 'Loading...'
  });
  const history = useHistory();
  const calculate = () => {
    history.push({ pathname: Routes.InternalRoutes.Calculated})
  }
  useEffect(() => {
    fetchDataFromAccount(SetDataFromAccount)
  }, []);



  return (
    <Grid Container>
      {state.loading ? <p><em>{state.message}</em></p> : <div>
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
              rows={state.account.accounts[0].transactions.map((obj, index) => ({ ...obj, id: index + 1, bookingDate: formatDate(obj.bookingDate) }))}
              columns={ColumnHelper(['id','creditDebitIndicator','status','amount','bookingDate'])}
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


  async function SetDataFromAccount(successed, data) {
    if (!successed) {
      setState({ ...state, message: "No account info was found" })
    } else {
      setState({ account: data, loading: false });
    }
  }

}
