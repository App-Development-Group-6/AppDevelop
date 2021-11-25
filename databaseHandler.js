const {MongoClient,ObjectId} = require('mongodb');

const URL = 'mongodb://localhost:27017';
const DATABASE_NAME = "AppDev"

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function insertObject(collectionName,objectToInsert){
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
}
async function getAllUser() {
    const dbo = await getDB();
    const allUser = await dbo.collection("Users").find({}).toArray();
    return allUser;
}
async function getAllTrainer() {
    const dbo = await getDB();
    const allTrainer = await dbo.collection("Trainers").find({}).toArray();
    return allTrainer;
}
async function getAllTrainee() {
    const dbo = await getDB();
    const allTrainee = await dbo.collection("Trainees").find({}).toArray();
    return allTrainee;
}
async function getAllCourse() {
    const dbo = await getDB();
    const allcourse = await dbo.collection("Courses").find({}).toArray();
    return allcourse;
}

module.exports = {insertObject, getAllUser,getAllTrainer,getAllTrainee, getAllCourse}