import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useHistory } from "react-router-dom";
import { FetchCaclulatedData } from '../Helpers/RequestHelper';
import * as Routes from '../Helpers/RequestRoutes'
import ColumnHelper from '../Helpers/ColumnsHelper';
import formatDate from '../Helpers/FormatDateHelper';

export const Caclulated = () => {

    const history = useHistory();
    const [state, setState] = useState({ loading: true, message: "...Loading" });
    useEffect(() => {
        FetchCaclulatedData(SetDataCaclulated)
    }, []);


    return (
        <Grid Container>
            {state.loading ? <p><em>{state.message}</em></p> : <div>
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
                            rows={state.calc.endOfDayBalances.map((obj, index) => ({ ...obj, id: index + 1, date: formatDate(obj.date) }))}
                            columns={ColumnHelper(['id', 'balance', 'date'])}
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
                        <Button variant="contained" onClick={() => history.push(Routes.InternalRoutes.Home)}>Back</Button>
                    </div>

                </Grid>
            </div>}
        </Grid>
    );


    async function SetDataCaclulated(successed, data) {
        if (!successed) {
            setState({ ...state, message: "No info" })
        } else {
            setState({ calc: data, loading: false });
        }
    }
}
