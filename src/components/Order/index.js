import React from 'react';
import OrderForm from './OrderForm.js';
import { UseForm } from '../../hooks/useForm';
import SearchFoodItems from './SearchFoodItems.js';
import OrdredFoodItems from './OrdredFoodItems.js';
import { Grid } from '@material-ui/core';

const generateOrderNumber = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const getFreshModelObject = () => ({
  orderMasterId: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethod: 'none',
  gTotal: 0,
  deletedOrderItemIds: '',
  orderDetails: []
});

const index = () => {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handelInputChange,
    resetFormContols,
  } = UseForm(getFreshModelObject);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <OrderForm {...{ values, setValues, errors,setErrors, handelInputChange ,resetFormContols}} />
      </Grid>
      <Grid item xs={6}>
        <SearchFoodItems {...{ values, setValues }} />
      </Grid>
      <Grid item xs={6}>
        <OrdredFoodItems
          {...{ ordredFoodItems: values.orderDetails, values, setValues }}
        />
      </Grid>
    </Grid>
  );
};

export default index;
