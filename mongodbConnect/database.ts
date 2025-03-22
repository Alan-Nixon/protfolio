import AdminModel from '@/models/admin'
import { connect } from 'mongoose'

connect(process.env.MONGO_URI + "").then(() => {
    AdminModel.find().then(res => console.log(res))
    console.log("Mongodb connected successfully")
})