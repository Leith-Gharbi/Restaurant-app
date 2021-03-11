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
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { roundTo2DecimalPoint } from '../../utils';
import Popup from '../../layouts/Popup';
import OrderList from "./OrderList";
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
  const { values, setValues, errors, setErrors, handelInputChange ,resetFormContols } = props;
  const classes = useStyles();

  const [customerList, SetcustomerList] = useState([]);

  const[orderListVisibility,setOrderListVisibility]= useState(false);
  const[orderId,setOrderId]= useState(0);


  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then((res) => {
        let customerList = res.data.map((item) => ({
          id: item.customerId,
          title: item.customerName,
        }));
        customerList = [{ id: 0, title: 'Select' }].concat(customerList);
        SetcustomerList(customerList);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.foodItemPrice;
    }, 0);
    setValues({ ...values, gTotal: roundTo2DecimalPoint(gTotal) });
  }, [JSON.stringify(values.orderDetails)]);


useEffect(() => {
  if(orderId==0) resetFormContols()
  else {
    createAPIEndpoint(ENDPOINTS.ORDER)
      .fetchById(orderId)
      .then((res) => {
        let customerList = res.data.map((item) => ({
          id: item.customerId,
          title: item.customerName,
        }));
        customerList = [{ id: 0, title: 'Select' }].concat(customerList);
        SetcustomerList(customerList);
      })
      .catch((err) => console.log(err));
  }
}, [orderId])

  const validateForm = () => {
    let temp = {};
    temp.customerId = values.customerId != 0 ? '' : 'this field is required';
    temp.pMethod = values.pMethod != 'none' ? '' : 'this field is required';
    temp.orderDetails =
      values.orderDetails.length != 0 ? '' : 'this field is required';
    console.log(values.pMethod);
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === '');
  };
  const submitOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(values)
      createAPIEndpoint(ENDPOINTS.ORDER)
        .create(values)
        .then((res) => {
          console.log(res);
          resetFormContols();
        })
        .catch((err) => console.log(err));
    }
  };
  const openListOfOrders = () =>{
    setOrderListVisibility(true);
  }
  return (
    <>
    <Form onSubmit={submitOrder}>
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
            error={errors.customerId}
          ></Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Payment Methode"
            name="pMethod"
            options={pMethod}
            onChange={handelInputChange}
            value={values.pMethod}
            error={errors.pMethod}
          ></Select>
          <Input
            label="Grand Total"
            name="gTotal"
            value={values.gTotal}
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
          <Button size="large" onClick={openListOfOrders} startIcon={<ReorderIcon></ReorderIcon>}>
            Orders
          </Button>
        </Grid>
      </Grid>
    </Form>
    <Popup  title="List of Orders" openPopup={orderListVisibility} setOpenPopup={setOrderListVisibility}>
<OrderList {...{setOrderId ,setOrderListVisibility}}/>
    </Popup>
    </>
  );
}
