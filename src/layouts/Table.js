import { Table as MuiTable, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  table: {
    '& tbody td': {
      fontWeight: '300',
    },
    '& table tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
    '& .MuiTableCell-root': {
      border: 'none',
    },
  },
}));

const Table = (props) => {
  const classes = useStyles();
  return <MuiTable className={classes.table}>{props.children}</MuiTable>;
};

export default Table;
