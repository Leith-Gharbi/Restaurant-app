import React from 'react';
import OrderForm from './OrderForm.js';
import {UseForm} from '../../hooks/useForm';
import SearchFoodItems from './SearchFoodItems.js';
import OrdredFoodItems from './OrdredFoodItems.js';
import { Grid } from '@material-ui/core';

const generateOrderNumber = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const getFreshModelObject = () => ({
  orderMasterId: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethode: 'none',
  gTotatl: 0,
  deletedOrderItemIds: '',
  orderDetails: [],
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

const addFoodItem = foodItem =>{

  let x = {
    OrderMasterId :values.orderMasterId,
    OrderDetailId:0,
    FoodItemId:foodItem.foodItemId,
    quantity:1,
    foodItemPrice:foodItem.price,
    foodItemName:foodItem.foodItemName,
  }
  setValues({
    ...values,orderDetails:[...values.orderDetails,x]
  })
}


  return ( <Grid container spacing={2}>
    <Grid item xs={12}>
    <OrderForm {...{ values, errors, handelInputChange }} />
    </Grid>
    <Grid item xs={6}>
      <SearchFoodItems {... {addFoodItem,ordredFoodItems:values.orderDetails}}/>
    </Grid>
    <Grid item xs={6}>
      <OrdredFoodItems {... {ordredFoodItems:values.orderDetails ,values,setValues}}/>
    </Grid>
   
    
  </Grid>)
 
};

export default index;
