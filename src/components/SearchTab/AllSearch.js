/** @format */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";

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
    minWidth: 120,
    maxWidth: 300,
  },
  searchInput: {
    margin: theme.spacing(2),
    // minWidth: 300, doesn't work
    maxWidth: 300,
  },
}));

const option_list1 = ["流水號", "課號", "課程識別碼", "教室"];
const option_list2 = [1, 2, 3];
const option_list3 = [
  "體育",
  "國英外文",
  // "跨校課程",
  // "學程",
  // "大學部",
  // "研究所",
];
function AllSearch(props) {
  const { searchConditions, setSearchConditions } = props;
  const [select_1, setSelect_1] = useState("");
  const [select_2, setSelect_2] = useState(option_list2);
  const [select_3, setSelect_3] = useState(option_list3);
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">搜尋項目</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={select_1}
          onChange={(e) => {
            setSelect_1(e.target.value);
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
        label={select_1 === "" ? "請選擇搜尋項目" : select_1}
        type="search"
        disabled={select_1 === ""}
        // onChange={(e) => setInput(e.target.value)}
        onChange={(e) => {
          setSearchConditions({
            ...searchConditions,
            [select_1]: e.target.value,
          });
        }}
      />

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
      <FormControl className={classes.formControl}>
        {/* <InputLabel id="mutiple-checkbox-label">加選方式</InputLabel> */}
        <InputLabel id="mutiple-checkbox-label"></InputLabel>
        <Select
          labelId="mutiple-checkbox-label"
          id="mutiple-checkbox"
          multiple
          value={select_2}
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
            setSelect_2(e.target.value);
            let booleanOptions = [false, false, false];
            e.target.value.map((option) => {
              let index = option_list2.indexOf(option);
              if (index > -1) {
                booleanOptions[index] = true;
              }
            });
            setSearchConditions({
              ...searchConditions,
              加選方式: booleanOptions,
            });
          }}
          input={<Input />}
          renderValue={(selected) => selected.sort().join(", ")}
        >
          {option_list2.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                <Checkbox
                  color="primary"
                  checked={select_2.indexOf(option) > -1}
                />
                <ListItemText primary={option} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </form>
  );
}
export default AllSearch;
