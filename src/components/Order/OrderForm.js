import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Form from '../../layouts/Form';

import { Input, Select, Button } from '../../components/controls';
import useForm from '../../hooks/useForm';

const pMethod = [
  { id: 'none', title: 'Select' },
  { id: 'Cash', title: 'Cash' },
  { id: 'Card', title: 'Card' },
];
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


export default function OrderForm() {
 const {values,setValues,errors,setErrors,handelInputChange,resetFormContols}=useForm(getFreshModelObject);
  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Input
            label="Order Number"
            name="orderNumber"
            disabled
            value={values.orderNumber}
          ></Input>
          <Select
            label="Customer"
            name="customer"
            value={values.customerId}
            onchange={handelInputChange}
            options={[
              { id: 0, title: 'Select' },
              { id: 1, title: 'Customer 1' },
              { id: 2, title: 'Customer 2' },
              { id: 3, title: 'Customer 3' },
            ]}
          ></Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Payment Methode"
            name="pMethod"
            options={pMethod}
            onchange={handelInputChange}
            value={values.pMethode}
          ></Select>
          <Input
            label="Grand Total"
            name="gTotal"
            value={values.gTotatl}
            disabled
          ></Input>
        </Grid>
      </Grid>
    </Form>
  );
}
