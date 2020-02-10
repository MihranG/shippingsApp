import * as React from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Table, TableBody,TableCell, TablePagination, TableRow, Paper, LinearProgress, TableContainer} from '@material-ui/core';

import TableHeader from './TableHeader';
import Header from '../HeaderComponent';
import {Order, IShipment, IState} from '../../interfaces';
import { start } from 'repl';


function stableSort<T>(array: T[], cmp: (a: T, b: T) => number, page: number, rowsPerPage: number) {

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const stabilizedTuple= array.slice(startIndex, endIndex ).map((el, index) => [el, index] as [T, number]);
  stabilizedTuple.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  const sortedArray = [
    ...array.slice(0,startIndex),
    ...stabilizedTuple.map(el => el[0]),
    ...array.slice(endIndex)
  ]

  return sortedArray
}



function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  const isAscending: boolean = order === 'asc' ;
  const isAscendingMultiplier: number = isAscending ? -1 : 1
  return function (a,b){
    if (b[orderBy] < a[orderBy]) {
      return -1 * isAscendingMultiplier;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1 * isAscendingMultiplier;
    }
    return 0;
  }
  
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);
function TableBodyDisconnected({shippings, history, isLoading}) {
    const classes = useStyles();
    const [orderType, setOrderType] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof IShipment>('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IShipment) => {
      const isAsc = orderBy === property && orderType === 'asc';
      setOrderType(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, shippings.length - page * rowsPerPage);
    const arrayOfAppearingRows = stableSort(shippings, getSorting(orderType, orderBy), page, rowsPerPage)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    return (
      <>
       <Header  history={history}/>
        {isLoading ? <LinearProgress variant="query" color="secondary" />
        :(<Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={'small'}
              aria-label="enhanced table"
            >
              <TableHeader
                classes={classes}
                orderType={orderType}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={shippings.length}
              />
              <TableBody>
              
                {arrayOfAppearingRows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(a: React.MouseEvent<HTMLTableRowElement, MouseEvent>):void=>{
                            history.push(`/edit/${row.id}`)}
                        }
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell component="th" id={labelId} scope="row" align='left'>
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="right">{row.destination}</TableCell>
                        <TableCell align="right">{row.origin}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (33) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[20, 40]}
            component="div"
            count={shippings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>)}
        </>
    );
  }
  
  const mapStateToProps = (state: IState)=>({
    shippings : Object.values(state.shipments.data),
    isLoading: state.shipments.isLoading,
  })
  export default connect(mapStateToProps)(TableBodyDisconnected)