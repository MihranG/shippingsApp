import * as React from 'react';
import {TableCell, TableHead , TableRow, TableSortLabel, Checkbox} from '@material-ui/core';
import { connect } from 'react-redux';
import { useStyles} from './TableBody'

import {Order, IShipment} from '../../interfaces'

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IShipment) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  interface HeadCell {
    disablePadding: boolean;
    id: keyof IShipment;
    label: string;
    numeric: boolean;
  }
  
  const headCells: HeadCell[] = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'destination', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'origin', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'type', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'mode', numeric: true, disablePadding: false, label: 'Protein (g)' },
  ];
  
  function EnhancedTableHeadDisConnected(props: EnhancedTableProps) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof IShipment) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const mapStateToProps = (state)=>({
      shippings : Object.values(state.shipments.data)
  })

  export default connect(mapStateToProps)(EnhancedTableHeadDisConnected)