import * as React from 'react';
import {TableCell, TableHead , TableRow, TableSortLabel, Checkbox} from '@material-ui/core';
import { connect } from 'react-redux';
import { useStyles} from './TableBody'

import {Order, IShipment} from '../../interfaces'

interface ITableHeaderProps {
    classes: ReturnType<typeof useStyles>;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IShipment) => void;
    orderType: Order;
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
    { id: 'id', numeric: true, disablePadding: false, label: 'Id of shipping' },
    { id: 'name', numeric: true, disablePadding: true, label: 'Name of shipping' },
    { id: 'destination', numeric: false, disablePadding: false, label: 'Destination address' },
    { id: 'origin', numeric: false, disablePadding: false, label: 'Where it comes from' },
    { id: 'type', numeric: false, disablePadding: false, label: 'what type of..' },
  ];
  
  function TableHeaderDisconnected(props: ITableHeaderProps) {
    const { classes, orderType, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof IShipment) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={!headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? orderType : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? orderType : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {orderType === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }


  export default TableHeaderDisconnected