import * as React from 'react';
import TableHeader from './TableHeader'
import {Order, IShipment, IState} from '../../interfaces'



import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import { connect } from 'react-redux';

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}



function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  const isAscending:boolean = order === 'asc' ;
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
function TableBodyDisconnected({shippings, pageQty, history, isLoading}) {
    const classes = useStyles();
    const [orderType, setOrderType] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof IShipment>('name');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
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
  
    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDense(event.target.checked);
    };
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, shippings.length - page * rowsPerPage);
  
    return (
      <>
        {isLoading ? <LinearProgress variant="query" color="secondary" />
        :(<Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
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
              
                {stableSort(shippings, getSorting(orderType, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // const isItemSelected = isSelected(row.name.toString());
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={
                          //@ts-ignore
                          (a: MouseEvent<HTMLTableRowElement, MouseEvent>):void=>{
                            console.log('rrr', a,row.id, history);
                            history.push(`/edit/${row.id}`)
                        }
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
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3,5,6,15,20,30]}
            component="div"
            count={shippings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>)}
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
        </>
    );
  }
  
  const mapStateToProps = (state: IState)=>({
    shippings : Object.values(state.shipments.data),
    isLoading: state.shipments.isLoading,
    pageQty: state.pages.pageNumber
  })
  export default connect(mapStateToProps)(TableBodyDisconnected)