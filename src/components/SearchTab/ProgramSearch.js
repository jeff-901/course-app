/** @format */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiTextField-root": {
      minWidth: 120,
      height: 50,
      margin: theme.spacing(2),
    },
    "& .MuiFormControlLabel-root": {
      height: 50,
      margin: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
    maxWidth: 400,
  },
  searchInput: {
    margin: theme.spacing(2),
    // minWidth: 300, doesn't work
    maxWidth: 300,
  },
}));
// TODO: program list
const option_list1 = [
  "軍訓",
  "共同選修",
  "新生專題",
  "寫作教學",
  "基本能力課程",
];

function OtherSearch(props) {
  const { searchConditions, setSearchConditions } = props;
  const classes = useStyles();
  const [select_1, setSelect_1] = useState([]);
  useEffect(() => {
    let flag = true;
    option_list1.map((option) => {
      if (searchConditions[option] === true) {
        setSelect_1(option);
        flag = false;
      }
    });
    if (flag) {
      setSelect_1("");
    }
  }, [searchConditions]);
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">搜尋項目</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={select_1}
          onChange={(e) => {
            // setSelect_1(e.target.value);
            let next_searchConditions = { ...searchConditions };
            option_list1.map((option) => {
              if (e.target.value.indexOf(option) > -1) {
                next_searchConditions[option] = true;
              } else {
                next_searchConditions[option] = false;
              }
            });
            setSearchConditions(next_searchConditions);
          }}
        >
          <MenuItem value="">None</MenuItem>
          {option_list1.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className={classes.searchInput}
        id="standard-search"
        label="課名"
        type="search"
        onChange={(e) =>
          setSearchConditions({
            ...searchConditions,
            課名: e.target.value,
          })
        }
      />
      <TextField
        className={classes.searchInput}
        id="standard-search"
        label="教師名稱"
        type="search"
        onChange={(e) =>
          setSearchConditions({
            ...searchConditions,
            教師名稱: e.target.value,
          })
        }
      />
    </form>
  );
}

export default OtherSearch;
