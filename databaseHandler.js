const {MongoClient,ObjectId} = require('mongodb');

const URL = 'mongodb://localhost:27017';
const DATABASE_NAME = "AppDev"

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function checkUserRole(nameI,passI){
    const dbo = await getDB();
    const user= await dbo.collection("Users").findOne({userName:nameI,password:passI});
    if (user==null) {
        return "-1"
    }else{
        console.log(user)
        return user.role;
    }
}

async function insertObject(collectionName,objectToInsert){
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
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

async function getCourseById(idInput){
    const dbo = await getDB();
    const course = await dbo.collection("Courses").findOne({"_id":ObjectId(idInput)});
    return course;
}

async function updateCourse(idInput, cid, nip, mip){
    const dbo = await getDB();
    await dbo.collection("Courses").updateOne({"_id":ObjectId(idInput)},{$set:{courseId:cid, courseName:nip, mount:mip}});
}

module.exports = {checkUserRole, insertObject, getAllUser, getAllCourse, deleteCourse, getCourseById, updateCourse}