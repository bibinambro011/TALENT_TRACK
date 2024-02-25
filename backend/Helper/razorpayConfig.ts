import dotenv from 'dotenv'
dotenv.config()
import Razorpay from 'razorpay'

console.log("key id==>", process.env.key_id)
console.log("key_secret==>", process.env.key_secret)

const RazorpayInstance = new Razorpay({
    key_id:'rzp_test_9CEMr0p0borLvv',
    key_secret: 'Ki2cAMKxf2JxKvJRQh2Xiq6U'
})

export default RazorpayInstance