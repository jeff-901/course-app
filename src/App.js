/** @format */

import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./containers/Main";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import CommentPage from "./containers/CommentPage";
import MyCoursePage from "./containers/MyCoursePage";
// Main

function App() {
  const [user, setUser] = useState(false); //user info
  // const [courses, setCourses] = useState([]); //courses result
  // const [timeFilter, setTimeFilter] = useState(times); //time filter
  // const [tags, setTags] = useState([]); //tags filter
  // const [keyword, setKeyword] = useState(""); //keyword filter
  // const [peopleChosing, setPeopleChosing] = useState(false); //初選人數
  // const [hotRate, setHotRate] = useState(false); //評論
  // const [conditions, setConditions] = useState(["", "", ""]);

  // MyCoursePage
  const [myCourse, setMyCourse] = useState([]);

  // useEffect(async ()=>{
  //   let myOldCourse = await
  // })

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Main
              // courses={courses}
              // tags={tags}
              // chooseTag={chooseTag}
              user={user}
              setUser={setUser}
              setMyCourse={setMyCourse}
              // setKeyword={setKeyword}
              // keyword={keyword}
              // timeFilter={timeFilter}
              // chooseTag={chooseTag}
              // tags={tags}
              // setTimeFilter={setTimeFilter}
              // setPeopleChosing={setPeopleChosing}
              // setHotRate={setHotRate}
              // setConditions={setConditions}
              // conditions={conditions}
              myCourse={myCourse}
              setMyCourse={setMyCourse}
            />
          </div>
        </Route>
        <Route path="/comments">
          <CommentPage />
        </Route>
        <Route path="/comments/:id">
          <CommentPage />
        </Route>
        <Route path="/mycourses">
          <MyCoursePage myCourse={myCourse} setMyCourse={setMyCourse} />
        </Route>
        <Redirect from="/Home" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
