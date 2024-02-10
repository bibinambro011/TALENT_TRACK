import nodemailer from "nodemailer";

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateMail = async (email:string) => {
    const otp = generateOtp();
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bibindasmessi@gmail.com',
            pass: 'amyq ipki zrkl vmtn',
        }
    });
    
    // Email data including the OTP
    const mailOptions = {
        from: 'bibindasmessi@gmail.com',
        to: email, // Using the provided email parameter
        subject: 'Gmail Verification',
        text: `Your OTP for verification is: ${otp}`, // Include the OTP in the email text
    };
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error.message); // Reject the promise with the error message
            } else {
                resolve(otp); // Resolve the promise with the OTP
            }
        });
    });
};

export default generateMail;
