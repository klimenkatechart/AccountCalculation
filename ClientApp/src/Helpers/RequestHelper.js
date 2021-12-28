import * as Routes from './RequestRoutes' 

export async function fetchDataFromAccount(SetDataFromAccount) {
    const response = await fetch(Routes.ExternalRoutes.AccountRoute);
    const data = await response.json();
    if (response.status === 400) {
        SetDataFromAccount(false)
    } else {
        SetDataFromAccount(true,data);
    }

}

export async function FetchCaclulatedData(SetDataCaclulated) {
    const response = await fetch(Routes.ExternalRoutes.CaclulateRoute);
    const data = await response.json();
    if (response.status === 400) {
        SetDataCaclulated(false)
    } else {
        SetDataCaclulated(true,data.result);
    }
    
}