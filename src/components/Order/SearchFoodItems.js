import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  InputBase,
  makeStyles,
  useTheme,
  ListItemSecondaryAction,
} from '@material-ui/core';
import PlusOneTwoToneIcon from '@material-ui/icons/PlusOneTwoTone';
import ReorderIcon from '@material-ui/icons/Reorder';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: theme.spacing(1.5),
    flex: 1,
  },
  listRoot: {
    marginTop: theme.spacing(1),
    maxHeight: 450,
    overflow: 'auto',
    '& li:hover': {
      cursor: 'pointer',
      backgoundColor: 'yellow !important',
    },
    '& li:hover .MuiButtonBase-root': {
      display: 'block',
      color: '#000',
    },
    '& .MuiButtonBase-root': {
      display: 'none',
    },

    '& .MuiButtonBase-root:hover': {
      backgoundColor: 'transparent',
    },
  },
}));
export default function SearchFoodItems(props) {
  const { addFoodItem, ordredFoodItems } = props;
  const [foodItems, SetFoodItems] = useState([]);
  const [searchKey, SetSearchKey] = useState('');
  const [searchList, SetSearchList] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.FOODITEM)
      .fetchAll()
      .then((res) => {
        SetFoodItems(res.data);
        SetSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let x = [...foodItems];
    x = x.filter((y) => {

      return (
        y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase()) &&
        ordredFoodItems.every((item) => item.FoodItemId != y.foodItemId)
      );

    });
  
    SetSearchList(x);
  }, [searchKey ,ordredFoodItems]);
  return (
    <>
      <Paper className={classes.searchPaper}>
        <InputBase
          className={classes.searchInput}
          value={searchKey}
          onChange={(e) => SetSearchKey(e.target.value)}
          placeholder="Search food items"
        />
        <IconButton>
          <SearchTwoToneIcon />
        </IconButton>
      </Paper>
      <List className={classes.listRoot}>
        {searchList.map((item, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={item.foodItemName}
              secondary={'$' + item.price}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={(e) => addFoodItem(item)}>
                <PlusOneTwoToneIcon />
                <ArrowForwardIosTwoToneIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
