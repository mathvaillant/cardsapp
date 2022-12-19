import Pusher from "pusher"
const dotenv = require("dotenv").config()

const PusherInit = new Pusher({
  appId: process.env.PUSHER_ID || "",
  key: process.env.PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.PUSHER_CLUSTER || "",
  useTLS: true
})

export default PusherInit
