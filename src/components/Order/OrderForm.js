import {
  ButtonGroup,
  Grid,
  InputAdornment,
  makeStyles,
  Button as MuiButton,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Form from '../../layouts/Form';
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReorderIcon from '@material-ui/icons/Reorder';
import { Input, Select, Button } from '../../components/controls';
import { createAPIEndpoint ,ENDPOINTS} from "../../api";

const pMethod = [
  { id: 'none', title: 'Select' },
  { id: 'Cash', title: 'Cash' },
  { id: 'Card', title: 'Card' },
];
const useStyles = makeStyles((theme) => ({
  adornmentText: {
    '& .MuiTypography-root': {
      color: '#f3b33d',
      fontWeight: 'bolder',
      fontSize: '1.5em',
    },
  },
  submitbuttonGroup: {
    backgroundColor: '#f3b33d',
    margin: theme.spacing(1),
    color: '#000',
    '& .MuiButton-label': {
      textTransform: 'none',
    },
    '&:hover': {
      backgoundColor: '#f3b33d',
    },
  },
}));

export default function OrderForm(props) {
  const { values, errors, handelInputChange } = props;
  const classes = useStyles();

  const [customerList,SetcustomerList] =useState([]);
  useEffect(() => {}, []);
  createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
  .then(res =>{
    let customerList = res.data.map(item => ({
      id: item.customerId,
      title: item.customerName
    }));
    customerList = [{ id:0 , title:'Select'}].concat(customerList);
    SetcustomerList(customerList);
  })
  .catch(err => console.log(err))
  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Input
            label="Order Number"
            name="orderNumber"
            disabled
            value={values.orderNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  className={classes.adornmentText}
                  position="start"
                >
                  #
                </InputAdornment>
              ),
            }}
          />
          <Select
            label="Customer"
            name="customerId"
            value={values.customerId}
            onChange={handelInputChange}
            options={customerList}
          ></Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Payment Methode"
            name="pMethode"
            options={pMethod}
            onChange={handelInputChange}
            value={values.pMethode}
          ></Select>
          <Input
            label="Grand Total"
            name="gTotal"
            value={values.gTotatl}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment
                  className={classes.adornmentText}
                  position="start"
                >
                  $
                </InputAdornment>
              ),
            }}
          />
          <ButtonGroup className={classes.submitbuttonGroup}>
            <MuiButton
              size="large"
              type="submit"
              endIcon={<RestaurantMenuIcon />}
            >
              Submit
            </MuiButton>
            <MuiButton size="small" startIcon={<ReplayIcon />}></MuiButton>
          </ButtonGroup>
          <Button size="large" startIcon={<ReorderIcon></ReorderIcon>}>
            Orders
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}
