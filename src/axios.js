/** @format */

import axios from "axios";
require("dotenv").config(); //{ path: require("find-config")(".env") }
// console.log(process.env.REACT_APP_baseURL);
// console.log(process.env);
const baseURL = process.env.REACT_APP_baseURL || "http://localhost:4000";
const instance = axios.create({ baseURL: baseURL + "/api" });

const createUser = async (payload) => {
  const {
    data: { message },
  } = await instance.post("/createUser", { user: payload });

  return message;
};

const checkUser = async (id, password) => {
  const {
    data: { user },
  } = await instance.post("/checkUser", { id: id, password: password });
  return user;
};

const updateUser = async (id, myCourse) => {
  const {
    data: { user },
  } = await instance.post("/updateUser", { id: id, myCourse: myCourse });
  return user;
};

const findCourse = async (constrain) => {
  const {
    data: { courses },
  } = await instance.post("/findCourse", { constrain: constrain });
  return courses;
};

const updateCourse = async (courseName, professor, tags) => {
  // console.log("send request to backend");
  const {
    data: { message },
  } = await instance.post("/updateCourse", {
    courseName: courseName,
    professor: professor,
    tags: tags,
  });
  // console.log("data: ", message);
  return message;
};

const createComment = async (payload) => {
  const {
    data: { message },
  } = await instance.post("/createComment", { comment: payload });

  return message;
};

const findComment = async (id) => {
  // console.log("send request to backend");
  const {
    data: { comments },
  } = await instance.post("/findComment", { id: id });
  // console.log("data: ", courses);
  return comments;
  // return course;
};

const updateComment = async (id, username, comment) => {
  const {
    data: { message },
  } = await instance.post("/updateComment", {
    id: id,
    username: username,
    comment: comment,
  });
  // console.log("data: ", courses);
  return message;
  // return course;
};

const deleteComment = async (id, username) => {
  const {
    data: { message },
  } = await instance.post("/deleteComment", { id: id, username: username });
  // console.log("data: ", courses);
  return message;
  // return course;
};

const findUserComment = async (id, username) => {
  // console.log("send request to backend");
  const {
    data: { comment },
  } = await instance.post("/findUserComment", { id: id, username: username });
  // console.log("data: ", courses);
  return comment;
};

const createTag = async (payload) => {
  const {
    data: { message },
  } = await instance.post("/createTag", { tag: payload });

  return message;
};

const findTag = async () => {
  // console.log("send request to backend");
  const {
    data: { tags },
  } = await instance.post("/findTag");
  return tags;
};

export {
  createUser,
  checkUser,
  updateUser,
  findCourse,
  updateCourse,
  createComment,
  findComment,
  updateComment,
  deleteComment,
  findUserComment,
  createTag,
  findTag,
};
