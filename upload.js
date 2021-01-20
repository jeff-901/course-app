let mongoose = require("mongoose");
let fs = require("fs");
const csv = require("csv-parser");
var glob = require("glob");

require("dotenv").config();
const Course = require("./backend/models/course.js");
const port = process.env.PORT || 4000;
const dboptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  poolSize: 10,
};
mongoose.connect(
  "mongodb+srv://webfinal:binomial14@cluster0.jlojz.mongodb.net/final?retryWrites=true&w=majority",
  dboptions
);
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});

// filename = "F:/109-1/Web Programming/course/國立臺灣師範大學.csv";
// fs.createReadStream(filename)
//   .pipe(csv())
//   .on("data", function (row) {
//     console.log(row.college);
//     console.log(row.college === "三校聯盟");
//     console.log(row.deparment);
//   });
//一次處理
db.once("open", () => {
  console.log("open");
  glob("F:/109-1/Web Programming/course/*.csv", function (err, files) {
    if (err) console.log(err);
    else console.log(files.length);
    files.map((filename) => {
      const courses = [];
      fs.createReadStream(filename)
        .pipe(csv())
        .on("data", function (row) {
          const course = {
            serialNumber: row.serialNumber,
            courseName: row.courseName,
            semester: row.semester,
            designatedFor: row.designatedFor,
            professor: row.professor,
            courseCode: row.courseCode !== "" ? row.courseCode : "none",
            id: row.id,
            class: row.class,
            credit: row.credit,
            fullHalf: row.fullHalf,
            compulsoryRequired: row.compulsoryRequired,
            day1: row.day1 === "0" ? false : true,
            day2: row.day2 === "0" ? false : true,
            day3: row.day3 === "0" ? false : true,
            day4: row.day4 === "0" ? false : true,
            day5: row.day5 === "0" ? false : true,
            day6: row.day6 === "0" ? false : true,
            time1: row.time1,
            time2: row.time2,
            time3: row.time3,
            time4: row.time4,
            time5: row.time5,
            time6: row.time6,
            people: row.people,
            peopleChosing: 0, //row.peopleChosing === "" ? 0 : Number(row.peopleChosing),
            classroom: row.classroom,
            add: row.add,
            remark: row.remark,
            ceiba: row.ceiba,
            description: row.description,
            objective: row.objective,
            school:
              row.school !== ""
                ? row.school
                : row.college === "三校聯盟"
                ? row.department
                : "台大",
            college: row.college,
            department: row.department !== undefined ? row.department : "",
            grade: row.grade !== undefined ? row.grade : "",
            group: row.group,
            commonRequired: row.commonRequired, //todo 1~5
            otherCourse: row.otherCourse, //todo 1~5
            general: row.general, //todo A1~A8
            hot: "0",
            tags: "",
          };
          courses.push(course);
        })
        .on("end", function () {
          Course.insertMany(courses, function (err) {
            if (err) {
              console.log(err);
              console.log(`${filename} fail`);
            } else {
              console.log(`${filename} success`);
            }
          });
        });
    });
  });
});

// edit to your filename
// let filename = "C://Users/user/Downloads/大學國文一.csv";

// require("dotenv").config();
// const Course = require("./backend/models/course.js");
// const port = process.env.PORT || 4000;
// const dboptions = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   auto_reconnect: true,
//   useUnifiedTopology: true,
//   poolSize: 10,
// };
// mongoose.connect(
//   "mongodb+srv://webfinal:binomial14@cluster0.jlojz.mongodb.net/final?retryWrites=true&w=majority",
//   dboptions
// );
// const db = mongoose.connection;

// db.on("error", (error) => {
//   console.error(error);
// });
// db.once("open", () => {
//   console.log("open");
//   const courses = [];
//   fs.createReadStream(filename)
//     .pipe(csv())
//     .on("data", function (row) {
//       const course = {
//         serialNumber: row.serialNumber,
//         courseName: row.className,
//         semester: row.semester,
//         designatedFor: row.student,
//         professor: row.professor,
//         courseCode: row.course_code,
//         id: row.id,
//         class: row.class,
//         credit: row.credit,
//         fullHalf: row.fullHalf,
//         compulsoryRequired: row.compulsoryRequired,
//         day1: row.day1 === "0" ? false : true,
//         day2: row.day2 === "0" ? false : true,
//         day3: row.day3 === "0" ? false : true,
//         day4: row.day4 === "0" ? false : true,
//         day5: row.day5 === "0" ? false : true,
//         day6: row.day6 === "0" ? false : true,
//         time1: row.time1,
//         time2: row.time2,
//         time3: row.time3,
//         time4: row.time4,
//         time5: row.time5,
//         time6: row.time6,
//         people: Number(row.people),
//         peopleChosing: 0, //row.peopleChosing === "" ? 0 : Number(row.peopleChosing),
//         classroom: row.classroom,
//         add: row.add,
//         remark: row.remark,
//         ceiba: row.ceiba,
//         description: row.description,
//         objective: row.objective,
//         school: row.school,
//         college: row.college,
//         group: row.group,
//         commonRequired: row.commonRequired, //todo 1~5
//         otherCourse: row.otherCourse, //todo 1~5
//         general: row.general, //todo A1~A8
//         hot: "0",
//         tags: "",
//       };
//       courses.push(course);
//     })
//     .on("end", function () {
//       Course.insertMany(courses, function (err) {
//         if (err) console.log(err);
//         else console.log("success");
//       });
//     });
// });
