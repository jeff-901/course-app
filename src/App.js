/** @format */

import React, { useState } from "react";
import "./App.css";
import Main from "./containers/Main";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [user, setUser] = useState(false); //user info
  const [myCourse, setMyCourse] = useState([]); // MyCoursePage

  return (
    <BrowserRouter>
      <div className="App">
        <Main
          user={user}
          setUser={setUser}
          myCourse={myCourse}
          setMyCourse={setMyCourse}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
