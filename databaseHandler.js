const async = require('hbs/lib/async');
const { MongoClient, ObjectId } = require('mongodb');

const URL = 'mongodb://localhost:27017';
const DATABASE_NAME = "AppDev"

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

async function updateCourse(idInput, cid, time, nip, mip) {
    const dbo = await getDB();
    await dbo.collection("Courses").updateOne({ "_id": ObjectId(idInput) }, { $set: { courseId: cid, courseName: nip, time: time, mount: mip } });
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
    const trainee = await dbo.collection("TraineeCourse").find({ "courseId": id }).toArray();
    // console.log(trainee.userId)
    if (trainee == null) {
        return "-1";
    } else {
        return trainee;
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

module.exports = {deleteObject, getDB, ObjectId, checkUserRole, getPassFailTrainee, updateDocument, getDocumentById, updateGrade, getGradeByUserId, insertObject, getAllUser, getAllCourse, getUserByUserId, deleteCourse, getCourseById, updateCourse, userInfo, getAllTrainee, getTraineeandCourseId }
