// import Course from "../models/course";
const Course = require("../models/course");

exports.findCourse = async (req, res) => {
  // console.log("findCourse");
  // console.log("Course: ", Course);

  // console.log(req.body);
  let constrain = req.body.constrain;
  console.log("constrain: ", constrain);
  // let filter = {};
  // for (let i = 0; i < Object.keys(constrain).length; i++) {
  //   let key = Object.keys(constrain)[i];
  //   if (key.match(/time.*/)) {
  //     filter[key] = {
  //       $not: { $regex: constrain[key] },
  //     };
  //   } else {
  //     if(key==="courseName"){
  //       filter[key] = {
  //         $regex: constrain[key], $options: 'x'
  //       };
  //     }
  //     else{
  //       filter[key] = {
  //         $regex: constrain[key],
  //       };
  //     }
  //   }
  // }
  let filters = [];
  if(constrain["courseName"].length===0)
  {
    let filter = {};
      for (let j = 0; j < Object.keys(constrain).length; j++) {
        let key = Object.keys(constrain)[j];
        if (key.match(/time.*/)) {
          filter[key] = {
            $not: { $regex: constrain[key] },
          };
        } else {
          if(key==="courseName"){
            filter[key] = {
              $regex: constrain[key], $options: 'x'
            };
          }
          else{
            filter[key] = {
              $regex: constrain[key],
            };
          }
        }
      }
      filters.push(filter)
  }
  else
  {
    for(let i = 0; i < constrain["courseName"].length; i++)
    {
      let filter = {};
      for (let j = 0; j < Object.keys(constrain).length; j++) {
        let key = Object.keys(constrain)[j];
        if (key.match(/time.*/)) {
          filter[key] = {
            $not: { $regex: constrain[key] },
          };
        } else {
          if(key==="courseName"){
            filter[key] = {
              $regex: constrain[key][i], $options: 'x'
            };
          }
          else{
            filter[key] = {
              $regex: constrain[key],
            };
          }
        }
      }
      filters.push(filter)
    }
  }
  
  console.log(filters)
  var all_course = [];
  for (let i = 0; i < filters.length;i++){
    let result = await Course.find(filters[i]).sort({ id: 1 });
    let ret = [];
    for(let i = 0;i < result.length; i++){
      if(ret.length===0)
      {
        ret.push(result[i])
      }
      else if(ret[ret.length-1]["courseName"] !== result[i]["courseName"] || ret[ret.length-1]["serialNumber"] !== result[i]["serialNumber"])
      {
        ret.push(result[i]);
      }
    }
    all_course.push(ret)  
  }
  var courses = [];
  for(let i=0;i<all_course.length;i++)
  {
    var course = [];
    for(let j=0;j<all_course[i].length;j++)
    {
      course.push(JSON.stringify(all_course[i][j]))
    }
    courses.push(course);
    console.log(course.length)
  }
  console.log(courses.length)
  var data = courses[0];
  for(let i=1;i<courses.length;i++)
  {
    data = courses[i].filter(v => data.includes(v))
  }
  // console.log(all_course[0])
  // console.log(all_course[1])
  // console.log(all_course[2])
  // if(all_course.length===1){
  //   for(let i=0;i<data.length;i++){
  //     data[i] =JSON.parse(data[i])
  //   }
  // }
  for(let i=0;i<data.length;i++){
    data[i] =JSON.parse(data[i])
  }
  
  // let result = await Course.find(filter).sort({ id: 1 });
  
  // console.log(result.length)
  // console.log(ret.length)
  // console.log("result: ", result);
  // return { courses: result };
  res.status(200).send({ courses: data });
};

exports.updateCourse = async (req, res) => {
  let courseName = req.body.courseName;
  let professor = req.body.professor;
  let tags = req.body.tags;
  // console.log("tags: ", tags);
  await Course.updateMany(
    { courseName: courseName, professor: professor },
    { tags: tags },
    (err) => {
      if (err) {
        res.status(200).send({ message: "error" });
      }
    }
  );
  res.status(200).send({ message: "success" });
};
