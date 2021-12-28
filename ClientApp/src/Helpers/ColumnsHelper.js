function ColumnCreator(columnName) {
    var column = {}
    switch (columnName) {
        case 'id':
            column = {
                field: 'id',
                headerName: 'ID',
                width: 70,
            }
            break;

        case 'creditDebitIndicator':
            column = {
                field: 'creditDebitIndicator',
                headerName: 'Credit/Debit',
                width: 130
            }
            break;

        case 'status':
            column = {
                field: 'status',
                headerName: 'Status',
                width: 130
            }
            break;

        case 'amount':
            column = {
                field: 'amount',
                headerName: 'Amount',
                type: 'number',
                width: 90,
            }
            break;

        case 'bookingDate':
            column = {
                field: 'bookingDate',
                headerName: 'Booking Date',
                width: 200,
            }
            break;
        case 'date':
            column = {
                field: 'date',
                headerName: 'Booking Date',
                width: 200,
            }
            break;

        case 'balance':
            column = {
                field: 'balance',
                headerName: 'End of The Day Balance',
                type: 'number',
                width: 200,
            }
            break;

        default:
            break;
    }

    return column

}

export default function ColumnHelper(array) {
    let columnArray = array.map(obj => (ColumnCreator(obj)))
    return columnArray
}
