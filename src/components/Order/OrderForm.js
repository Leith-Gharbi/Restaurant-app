import { Grid } from '@material-ui/core';
import React ,{useState} from 'react';
import Form from '../../layouts/Form';

import { Input,Select ,Button} from "../../components/controls";

const pMethod =[{id:'none',title:'Select'},{id:'Cash',title:'Cash'},{id:'Card',title:'Card'}]
export default function OrderForm() {
  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Input label="Order Number" name="orderNumber" disabled></Input>
          <Select
            label="Customer"
            name="customer"
            options={[{ id: 0, title: 'Select' },{ id: 1, title: 'Customer 1' },{ id: 2, title: 'Customer 2' },{ id: 3, title: 'Customer 3' }]}
          ></Select>
        </Grid>
        <Grid item xs={6}>
        <Select
            label="Payment Methode"
            name="pMethod"
            options={pMethod}
          ></Select>
          <Input label="Grand Total" name="gTotal" disabled></Input>

        </Grid>
      </Grid>
    </Form>
  );
}
