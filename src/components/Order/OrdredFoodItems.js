import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  InputBase,
  makeStyles,
  useTheme,
  Button,
  ListItemSecondaryAction,
  ButtonGroup,
} from '@material-ui/core';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
export default function OrdredFoodItems(props) {
  const { values, setValues } = props;
  let ordredFoodItems = values.orderDetails;
  const updateQuantity = (idx, value) => {
      let x = { ...values };
      let foodItem=x.orderDetails[idx];
    if (foodItem.quantity + value > 0) {
        foodItem.quantity += value;
      setValues({ ...x });
    }
  };
  const removeFoodItem=(index,id)=>{
    let x ={...values};
    x.orderDetails =x.orderDetails.filter((_,i)=> i != index) ;
    setValues({
      ...x
    });
  }
  return (
    <List>
      {ordredFoodItems.map((item, idx) => (
        <Paper key={idx}>
          <ListItem>
            <ListItemText
              primary={item.foodItemName}
              primaryTypographyProps={{
                component: 'h1',
                style: {
                  fontWeight: '500',
                  fontSize: '1.2em',
                },
              }}
              secondary={
                <>
                  <ButtonGroup size="small">
                    <Button onClick={(e) => updateQuantity(idx, -1)}>-</Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button onClick={(e) => updateQuantity(idx, +1)}>+</Button>
                  </ButtonGroup>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                disableRipple
                onClick={(e) => removeFoodItem(idx, item.orderDetailsId)}
              >
                <DeleteOutlineTwoToneIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}
