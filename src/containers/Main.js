/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import MyAppBar from "./MyAppBar.js";
import SearchCourseTable from "./SearchCourseTable.js";
import Sidebar from "./Sidebar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchTab from "./SearchTab";
import SearchIcon from "@material-ui/icons/Search";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import MyCoursePage from "./MyCoursePage";
import SearchBar from "../components/SearchBar/SearchBar";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import LockIcon from "@material-ui/icons/Lock";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
// import sha256 from "../Mysha256.js";
import { findCourse, findTag, checkUser } from "../axios";
import SignUp from "../components/Login/SignUp";
import Instruction from "./Instruction.js";
import Loading from "../components/Loading/Loading";
import Login from "../components/Login/Login";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "body",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  paper: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  instruction: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function PagePanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="pagepanel"
      hidden={value !== index}
      id={`pagepanel-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

PagePanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const times = [];
let day = [];
for (let i = 0; i < 15; i++) {
  day.push(true);
}
for (let i = 0; i < 6; i++) {
  times.push(day);
}

const searchConditionsInit = {
  時間: times,
  流水號: "",
  課號: "",
  課程識別碼: "",
  教室: "",
  課名: "",
  教師名稱: "",
  加選方式: [true, true, true],
  體育: false,
  國英外文: false,
  跨校課程: false,
  學程: false,
  大學部: false,
  研究所: false,
  其他全校性課程: false,
  學院: "",
  系所: "",
  組別: "",
  年級: [true, true, true, true],
  必修: true,
  選修: true,
  服學: false,
  通識領域: [false, false, false, false, false, false, false, false],
  含小組討論: false,
  國文: false,
  英文: false,
  外文: false,
  進階英文: false,
  軍訓: false,
  共同選修: false,
  新生專題: false,
  寫作教學: false,
  基本能力課程: false,
  semester: "109-2",
};

const btn_text = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "A",
  "B",
  "C",
  "D",
];

function Main(props) {
  const classes = useStyles();
  const theme = useTheme();
  // log in
  const [id, setId] = useState(""); // user id
  const [password, setPassword] = useState(""); // user password
  const [correct, setCorrect] = useState(true);
  const [signup, setSignup] = useState(false);
  const [signin_loading, setSignin_loading] = useState(false);
  // sidebar
  const [open, setOpen] = useState(true); // sidebar
  const [pageIndex, setPageIndex] = useState(0); // page transistion
  // search course
  const [courses, setCourses] = useState([]); //courses result
  const [loading, setLoading] = useState(false); // loading course
  const [searchConditions, setSearchConditions] = useState(
    searchConditionsInit
  );
  const [page, setPage] = useState(0);
  // tags
  const [allTags, setAllTags] = useState([]);
  const [selectTag, setSelectTag] = useState([]);

  // reset search condition entering new search tabs
  const resetSearchConditions = () => {
    setSearchConditions(searchConditionsInit);
  };

  // get courses from db
  const findCourses = async () => {
    // console.log(searchConditions);
    setCourses([]);
    setLoading(true);
    // process search conditions
    let condition = searchConditions;
    let filter = {};
    filter["commonRequired"] = "";
    for (let i = 0; i < Object.keys(condition).length; i++) {
      let key = Object.keys(condition)[i];
      if (key === "時間") {
        for (let i = 0; i < 6; i++) {
          filter[`time${i + 1}`] = "";
          for (let j = 0; j < condition[key][i].length; j++) {
            if (!condition[key][i][j]) {
              filter[`time${i + 1}`] += btn_text[j];
            }
          }
          if (filter[`time${i + 1}`] === "") {
            delete filter[`time${i + 1}`];
          } else {
            filter[`time${i + 1}`] = "[" + filter[`time${i + 1}`] + "]+";
          }
        }
      } else if (key === "流水號") {
        filter["serialNumber"] = condition[key];
      } else if (key === "課號") {
        filter["courseCode"] = condition[key];
      } else if (key === "課程識別碼") {
        filter["id"] = condition[key];
      } else if (key === "教室") {
        filter["classroom"] = condition[key];
      } else if (key === "課名") {
        filter["courseName"] = condition[key];
      } else if (key === "教師名稱") {
        filter["professor"] = condition[key];
      } else if (key === "加選方式") {
        filter["add"] = "";
        for (let i = 0; i < condition[key].length; i++) {
          if (condition[key][i] === false) {
            filter["add"] += String(i + 1);
          }
        }
      } else if (key === "體育" && condition[key]) {
        filter["commonRequired"] = ".*[健康體適能|選修體育|專項運動|校隊]+.*";
      } else if (key === "國英外文" && condition[key]) {
        filter["commonRequired"] = ".*[國文|英文|外文]+.*";
      } else if (key === "跨校課程" && condition[key]) {
        filter["department"] = "國立.+";
      } else if (key === "學程" && condition[key]) {
        if (condition[key] === true) {
          filter["department"] = ".+學程";
        } else {
          filter["department"] = condition[key];
        }
      } else if (key === "大學部" && condition[key] && condition[key] !== "") {
        filter["department"] = ".*系";
      } else if (key === "研究所" && condition[key] && condition[key] !== "") {
        filter["department"] = ".*所";
      } else if (key === "其他學校性課程" && condition[key]) {
        filter["otherCourse"] = ".+";
      } else if (key === "學院" && condition[key] !== "") {
        filter["college"] = "^" + condition[key];
      } else if (key === "系所" && condition[key] !== "") {
        let data = condition[key].split("(");
        // console.log(data);
        if (data.length === 1) {
          filter["department"] = "^" + condition[key];
        } else {
          filter["department"] = data[0] + "." + data[1].split(")")[0];
        }
      } else if (key === "組別") {
        filter["group"] = condition[key];
      } else if (key === "年級") {
      } else if (key === "必修" && condition[key]) {
        filter["compulsoryRequired"] = "必修";
      } else if (key === "選修" && condition[key]) {
        if ("compulsoryRequired" in filter) {
          filter["compulsoryRequired"] = ".*";
        } else {
          filter["compulsoryRequired"] = "選修";
        }
      } else if (key === "服學") {
      } else if (key === "通識領域") {
        filter["general"] = "";
        for (let i = 0; i < condition[key].length; i++) {
          if (condition[key][i] === true) {
            filter["general"] += String(i + 1);
          }
        }
        if (filter["general"].length === 8) {
          filter["general"] = ".+";
        } else if (filter["general"].length > 0) {
          filter["general"] = "[" + filter["general"] + "]+";
        } else {
          // filter["general"] = "you can't not find";
        }
      } else if (key === "含小組討論" && condition[key]) {
        filter["general"] = "小組討論A" + filter["general"];
      } else if (key === "國文" && condition[key]) {
        filter["commonRequired"] = "國文";
      } else if (key === "英文" && condition[key]) {
        filter["commonRequired"] = "^英文";
      } else if (key === "外文" && condition[key]) {
        filter["commonRequired"] = ".*外文.*";
      } else if (key === "進階英文" && condition[key]) {
        filter["commonRequired"] = "進階英文";
      } else if (key === "軍訓" && condition[key]) {
        filter["otherCourse"] = "軍訓";
      } else if (key === "共同選修" && condition[key]) {
        filter["commonRequired"] = "共同選修.*";
      } else if (key === "新生專題" && condition[key]) {
        filter["otherCourse"] = "新生專題";
      } else if (key === "寫作教學" && condition[key]) {
        filter["otherCourse"] = "寫作教學";
      } else if (key === "基本能力課程" && condition[key]) {
        filter["otherCourse"] = "基本能力";
      }
    }
    // process tags
    let tags = [];
    for (let i = 0; i < selectTag.length; i++) {
      tags.push(selectTag[i].title);
    }
    if (selectTag.length > 0) {
      filter["tags"] = "[" + tags.join("|") + "]+";
    }
    // get courses from db
    let data = await findCourse(filter);
    setCourses(data);
    setPage(0);
    setLoading(false);
  };

  // get tags from db
  const findTags = async () => {
    let data = await findTag();
    setAllTags(data);
  };

  // get user from db
  const handleSignIn = async (e) => {
    setSignin_loading(true);
    e.preventDefault();

    // console.log("in: ", signin_loading);
    await checkUser(id.toLowerCase(), password).then((result) => {
      if (result !== 0) {
        setCorrect(true);
        props.setUser(result);
        props.setMyCourse(JSON.parse(result.courses));
      } else {
        console.log("wrong credential");
        setPassword("");
        setCorrect(false);
      }
    });
    setSignin_loading(false);
    // console.log("in out: ", signin_loading);
  };

  // sideBar pages
  const pages = [
    {
      title: "搜尋",
      content: (
        <Container maxWidth="auto" className={classes.container}>
          <SearchTab
            searchConditions={searchConditions}
            setSearchConditions={setSearchConditions}
            resetSearchConditions={resetSearchConditions}
          />
          <SearchBar
            search={findCourses}
            searchConditions={searchConditions}
            setSearchConditions={setSearchConditions}
            search={findCourses}
            findTags={findTags}
            allTags={allTags}
            selectTag={selectTag}
            setSelectTag={setSelectTag}
          />
          {loading ? (
            <div className={classes.paper}>
              <Loading />
            </div>
          ) : (
            <>
              <SearchCourseTable
                user={props.user}
                courses={courses}
                myCourse={props.myCourse}
                setMyCourse={props.setMyCourse}
                findTags={findTags}
                allTags={allTags}
                setAllTags={setAllTags}
                page={page}
                setPage={setPage}
              />
            </>
          )}
        </Container>
      ),
      icon: <SearchIcon />,
    },
    {
      title: "我的課表",
      content: (
        <Container maxWidth="auto" className={classes.container}>
          <MyCoursePage
            user={props.user}
            myCourse={props.myCourse}
            setMyCourse={props.setMyCourse}
          />
        </Container>
      ),
      icon: <ListAltIcon />,
    },
    {
      title: "使用教學",
      content: (
        <Container maxWidth="auto" className={classes.instruction}>
          <Instruction />
        </Container>
      ),
      icon: <MenuBookIcon />,
    },
  ];

  let now_user = props.user;
  // console.log("loading: ", signin_loading);
  return (
    <>
      {now_user ? (
        <div className={classes.root}>
          <CssBaseline />
          <MyAppBar
            user={props.user}
            setUser={props.setUser}
            open={open}
            setOpen={setOpen}
            setPassword={setPassword}
          />
          <Sidebar
            pages={pages}
            open={open}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={pageIndex}
              onChangeIndex={(e) => {
                setPageIndex(e.target.index);
              }}
            >
              {pages.map((page, index) => {
                return (
                  <PagePanel
                    value={pageIndex}
                    index={index}
                    dir={theme.direction}
                  >
                    {page.content}
                  </PagePanel>
                );
              })}
            </SwipeableViews>
          </main>
        </div>
      ) : (
        <>
          <MyAppBar
            user={props.user}
            setUser={props.setUser}
            open={open}
            setOpen={setOpen}
          />
          {signin_loading ? (
            <div className={classes.paper}>
              <Loading />
            </div>
          ) : (
            <>
              {signup ? <SignUp setSignup={setSignup} /> : <></>}
              <Login
                handleSignIn={handleSignIn}
                setId={setId}
                correct={correct}
                setCorrect={setCorrect}
                password={password}
                setPassword={setPassword}
                signup={signup}
                setSignup={setSignup}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Main;
