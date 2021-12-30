const async = require('hbs/lib/async');
const { MongoClient, ObjectId } = require('mongodb');

// const URL = 'mongodb+srv://atn:atn123456@cluster0.ajh2g.mongodb.net/test'
// const DATABASE_NAME = 'myDatabase'

const URL = 'mongodb://localhost:27017'
const DATABASE_NAME = 'AppDev'

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function checkUserRole(nameI, passI) {
    const dbo = await getDB();
    const user = await dbo.collection("Users").findOne({ userName: nameI, password: passI });
    if (user == null) {
        console.log("KHong ton tai")
        return "-1"
    } else {
        return user.role;
    }
}

async function deleteObject(id,collectionName){
    const dbo = await getDB()
    await dbo.collection(collectionName).deleteOne({_id:ObjectId(id)})
}

async function insertObject(collectionName, objectToInsert) {
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
}

async function updateDocument(id, updateValues,collectionName){
    const dbo = await getDB();
    await dbo.collection(collectionName).updateOne({_id:ObjectId(id)},updateValues)
}

async function getDocumentById(id, collectionName){
    const dbo = await getDB()
    const result = await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
    return result;
}

async function getAllUser() {
    const dbo = await getDB();
    const user = await dbo.collection("Users").find({}).toArray();
    return user;
}

async function getAllStaff() {
    const dbo = await getDB();
    const user = await dbo.collection("Users").find({role: "Staff"}).toArray();
    return user;
}

async function getAllTrainer() {
    const dbo = await getDB();
    const user = await dbo.collection("Users").find({role: "Trainer"}).toArray();
    return user;
}

async function getAllTrainee() {
    const dbo = await getDB();
    const user = await dbo.collection("Users").find({role: "Trainee"}).toArray();
    return user;
}

async function getAllCourse() {
    const dbo = await getDB();
    const course = await dbo.collection("Courses").find({}).toArray();
    return course;
}

async function deleteCourse(idInput) {
    const dbo = await getDB();
    await dbo.collection("Courses").deleteOne({ "_id": ObjectId(idInput) });
}

async function getCourseById(idInput) {
    const dbo = await getDB();
    const course = await dbo.collection("Courses").findOne({ "_id": ObjectId(idInput) });
    return course;
}

async function updateCourse(idInput, cid, start, end, nip, mip) {
    const dbo = await getDB();
    await dbo.collection("Courses").updateOne({ "_id": ObjectId(idInput) }, { $set: { courseId: cid, courseName: nip, start: start,end: end, mount: mip } });
}

async function userInfo(uname) {
    const dbo = await getDB();
    const user = await dbo.collection("Users").findOne({ "userName": uname.userName });
    if (user == null) {
        return "-1";
    } else {
        return user;
    }
}

async function getAllTrainee() {
    const dbo = await getDB();
    const trainee = await dbo.collection("Users").find({ "role": 'Trainee' }).toArray();
    console.log(trainee)
    if (trainee == null) {
        return "-1";
    } else {
        return trainee;
    }
}

async function getTraineeandCourseId(id) {
    const dbo = await getDB();
    const trainee = await dbo.collection("TraineeCourse").find({ "courseId": id, "role" : "Trainee" }).toArray();
    // console.log(trainee.userId)
    if (trainee == null) {
        return "-1";
    } else {
        return trainee;
    }
}

async function getTrainerandCourseId(id) {
    const dbo = await getDB();
    const trainer = await dbo.collection("TrainerCourse").find({ "courseId": id, "role" : "Trainer" }).toArray();
    if (trainer == null) {
        return "-1";
    } else {
        return trainer;
    }
}

async function getUserByUserId(idInput) {
    const dbo = await getDB();
    const user = await dbo.collection("Users").findOne({ "userId": idInput, "role": "Trainee" });
    return user;
}

async function getGradeByUserId(idInput, courseip) {
    const dbo = await getDB();
    const user = await dbo.collection("TraineeCourse").findOne({ "userId": idInput, "courseId": courseip });
    return user;
}

async function updateGrade(uid, grade) {
    const dbo = await getDB();
    await dbo.collection("TraineeCourse").updateOne({ "_id": ObjectId(uid) }, { $set: { grade: grade } });
}

async function getPassFailTrainee(cid, grade){
    const dbo = await getDB();
    const trainee = await dbo.collection("TraineeCourse").find({"courseId" : cid, "grade": grade}).toArray();
    return trainee;
}

async function removeTrainerfromCourse(id){
    const dbo = await getDB();
    await dbo.collection("TrainerCourse").deleteOne({"_id" : ObjectId(id)});
}
async function searchCourse(searchInput) {
    const dbo = await getDB();
    const course = await dbo.collection("Courses").find({ courseip : searchInput }).toArray();
    return course;
}

module.exports = {deleteObject,searchCourse, getDB,getTrainerandCourseId,removeTrainerfromCourse, ObjectId, checkUserRole, getPassFailTrainee, getAllStaff, getAllTrainer, getAllTrainee, updateDocument, getDocumentById, updateGrade, getGradeByUserId, insertObject, getAllUser, getAllCourse, getUserByUserId, deleteCourse, getCourseById, updateCourse, userInfo, getAllTrainee, getTraineeandCourseId }
