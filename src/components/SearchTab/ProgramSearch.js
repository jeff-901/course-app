/** @format */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import programs from "../../programs.json";

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
// console.log(programs);
const option_list1 = programs;

function ProgramSearch(props) {
  const { searchConditions, setSearchConditions } = props;
  const classes = useStyles();
  const [select_1, setSelect_1] = useState([]);
  useEffect(() => {
    let flag = true;
    option_list1.map((option) => {
      if (searchConditions["學程"] === option) {
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
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
          onChange={(e) => {
            // setSelect_1(e.target.value);
            let next_searchConditions = { ...searchConditions };
            next_searchConditions["學程"] = false;
            option_list1.map((option) => {
              if (e.target.value.indexOf(option) > -1) {
                next_searchConditions["學程"] = option;
              } else {
                // next_searchConditions[option] = false;
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

export default ProgramSearch;
