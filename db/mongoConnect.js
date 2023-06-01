const mongoose = require('mongoose');
const {config}=require("../config/secret");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.mjew6qn.mongodb.net/black23`);
    console.log("mongo connects cakes Mongo Atlas")
}

