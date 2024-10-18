import { connect } from 'mongoose'

connect(process.env.MONGO_URI + "").then(() => console.log("Mongodb connected successfully"))