"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// index.ts
var import_express4 = __toESM(require("express"));
var import_http = __toESM(require("http"));
var import_socket = require("socket.io");
var import_dotenv6 = __toESM(require("dotenv"));
var import_cors = __toESM(require("cors"));
var import_path = __toESM(require("path"));

// src/database/connection.ts
var import_mongoose = __toESM(require("mongoose"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var MONGO_URL = process.env.DB_URI || "";
if (!MONGO_URL) {
  console.log("mongo db url connection is not defined");
  process.exit(1);
}
function connectToDatabase() {
  console.log(process.env.DB_URI);
  import_mongoose.default.connect(MONGO_URL).then(() => console.log("Connected to MongoDB")).catch((error) => console.error("Error connecting to MongoDB:", error));
}

// src/database/modules/controllers/routes/userRoute.ts
var import_express = __toESM(require("express"));

// src/database/models/usermodel.ts
var import_mongoose2 = __toESM(require("mongoose"));
var userSchema = new import_mongoose2.default.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  otp: {
    type: Number,
    default: 500
  },
  otp_updated_at: {
    type: Date
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "user"
  },
  is_blocked: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ""
  },
  certificate: {
    type: String
  },
  category: {
    type: String
  },
  position: {
    type: String
  },
  wallet: {
    type: Number,
    default: 0
  }
});
var usersModel = import_mongoose2.default.model(
  "userSchema",
  userSchema
);
var usermodel_default = usersModel;

// src/database/models/agentmodels.ts
var import_mongoose3 = __toESM(require("mongoose"));
var agentSchema = new import_mongoose3.default.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  otp: {
    type: Number,
    default: 500
  },
  otp_updated_at: {
    type: Date
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "agent"
  },
  is_blocked: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ""
  },
  certificate: {
    type: String
  },
  category: {
    type: String
  },
  experience: {
    type: String
  },
  clubConnections: {
    type: String
  }
});
var agentModel = import_mongoose3.default.model("agentSchema", agentSchema);
var agentmodels_default = agentModel;

// src/database/models/agentaddslot.ts
var import_mongoose4 = __toESM(require("mongoose"));
var agentslotadd = new import_mongoose4.Schema({
  agentId: {
    type: import_mongoose4.Schema.Types.ObjectId,
    ref: "agentSchema",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String
  },
  booked: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: "pending"
  },
  bookedUserId: {
    type: import_mongoose4.Schema.Types.ObjectId,
    ref: "userSchema"
  },
  paymentstatus: {
    type: String
  },
  bookingAmount: {
    type: String,
    default: "1500"
  },
  adminpaidAmount: {
    type: String
  }
});
var addagentslot = import_mongoose4.default.model("agentslotadd", agentslotadd);
var agentaddslot_default = addagentslot;

// src/database/models/userbooking.ts
var import_mongoose5 = __toESM(require("mongoose"));
var userBookinSchema = new import_mongoose5.default.Schema({
  slotId: {
    type: import_mongoose5.Schema.Types.ObjectId
  },
  agentId: {
    type: import_mongoose5.Schema.Types.ObjectId,
    ref: "agentSchema"
  },
  userId: {
    type: import_mongoose5.Schema.Types.ObjectId
  },
  time: {
    type: String
  },
  date: {
    type: Date
  },
  status: {
    type: String,
    default: "confirmed"
  },
  paymentId: {
    type: String
  },
  bookingamount: {
    type: String
  },
  refundamount: {
    type: String
  }
});
var userBookingModel = import_mongoose5.default.model(
  "userBookinSchema",
  userBookinSchema
);
var userbooking_default = userBookingModel;

// Helper/passwordhash.ts
var import_bcrypt = __toESM(require("bcrypt"));
var comparePass = (password, hashedPass) => __async(void 0, null, function* () {
  try {
    const match = yield import_bcrypt.default.compare(password, hashedPass);
    return match;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error comparing passwords");
  }
});

// src/database/modules/controllers/repositories/userREpository.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv2 = __toESM(require("dotenv"));

// src/database/models/transactionmodel.ts
var import_mongoose6 = __toESM(require("mongoose"));
var transactioSchema = new import_mongoose6.default.Schema(
  {
    userId: {
      type: import_mongoose6.Schema.Types.ObjectId
    },
    agentId: {
      type: import_mongoose6.Schema.Types.ObjectId,
      ref: "agentSchema"
    },
    date: {
      type: Date
    },
    paidamount: {
      type: String
    },
    refundamount: {
      type: String
    },
    paymentMode: {
      type: String,
      defaulst: "online"
    }
  },
  { timestamps: true }
);
var transactionmodel = import_mongoose6.default.model(
  "transactionmodel",
  transactioSchema
);
var transactionmodel_default = transactionmodel;

// src/database/modules/controllers/repositories/userREpository.ts
import_dotenv2.default.config();
var jwtSecretToken = process.env.jwtsecrettoken;
var jwtrefreshtoken = process.env.jwtrefreshtoken;
var email = "";
var UserRepository = class {
  create(userData) {
    return __async(this, null, function* () {
      try {
        return yield usermodel_default.create(userData);
      } catch (error) {
        throw new Error("Could not create user");
      }
    });
  }
  //  getting user
  getUser(data) {
    return __async(this, null, function* () {
      try {
        let info = yield usermodel_default.findOne({ email: data.email });
        if (!info) {
          return null;
        }
        let isValidPassword = yield comparePass(data.password, info.password);
        if (!isValidPassword) {
          return "password mismatch";
        } else {
          if (info.is_blocked) {
            return "you are blocked by the admin";
          }
          email = info.email;
          const refreshtoken = import_jsonwebtoken.default.sign({ email: info.email }, jwtrefreshtoken, { expiresIn: "1d" });
          const token = import_jsonwebtoken.default.sign({ email: info.email }, jwtSecretToken, { expiresIn: "20s" });
          const accesseduser = {
            usertoken: token,
            refreshtoken,
            userdetails: {
              id: info._id,
              name: info.firstName,
              email: info.email,
              image: info.image,
              category: info.category,
              role: info.role
            }
          };
          return accesseduser;
        }
      } catch (error) {
        throw new Error("Could not find user");
      }
    });
  }
  // getting new token data after token expiry
  refreshtoken(data) {
    return __async(this, null, function* () {
      try {
        let { refreshtoken } = data;
        return new Promise((resolve, reject) => {
          import_jsonwebtoken.default.verify(refreshtoken, jwtrefreshtoken, (err, decoded) => {
            if (err) {
              reject(err);
            } else {
              const newRefreshtoken = import_jsonwebtoken.default.sign({ email: decoded.email }, jwtrefreshtoken, { expiresIn: "1d" });
              const newAccessToken = import_jsonwebtoken.default.sign({ email: decoded.email }, jwtSecretToken, { expiresIn: "20s" });
              const accesseduser = {
                token: newAccessToken,
                refreshtoken: newRefreshtoken
              };
              resolve(accesseduser);
            }
          });
        });
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  //  fetching user details
  getUserdetails(email2) {
    return __async(this, null, function* () {
      try {
        let userdata = yield usermodel_default.find({ email: email2 });
        return userdata;
      } catch (error) {
        throw new Error(error.message);
      }
    });
  }
  // verifying otp
  verifyotp(email2) {
    return __async(this, null, function* () {
      try {
        let userdata = yield usermodel_default.find({ email: email2 });
        return userdata;
      } catch (error) {
        throw new Error(error.message);
      }
    });
  }
  // confirming the email verification
  successVerify(email2) {
    return __async(this, null, function* () {
      try {
        let userdata = yield usermodel_default.find({ email: email2 });
        userdata[0].is_verified = true;
        const updatedUser = yield userdata[0].save();
      } catch (error) {
        throw new Error(error.message);
      }
    });
  }
  // fetching and sending only the verified agents
  getVerifiedagents() {
    return __async(this, null, function* () {
      try {
        return agentmodels_default.find({ is_verified: true, is_blocked: false });
      } catch (error) {
        throw new Error(error.message);
      }
    });
  }
  // sending all the available slots to the user
  agentAvailableSlots(id) {
    return __async(this, null, function* () {
      try {
        return yield agentaddslot_default.find({ agentId: id });
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  // wallet booking by wallet payment
  // adding user booking details
  userslotbooking(data) {
    return __async(this, null, function* () {
      try {
        yield agentaddslot_default.updateOne(
          { _id: data.slotId },
          { $set: { bookedUserId: data.userId, booked: true, status: "Confirmed" } }
        );
        yield userbooking_default.create(data);
        return agentaddslot_default.find({ agentId: data.agentId, booked: false, date: { $gt: /* @__PURE__ */ new Date() } });
      } catch (e) {
        throw new Error("failed to add booking details");
      }
    });
  }
  // fetching particuar agent category and sending the details
  agentCategory(type) {
    return __async(this, null, function* () {
      try {
        return agentmodels_default.find({
          category: type,
          "is_blocked": "false",
          "is_verified": "true"
        });
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  //fetching agents by name
  getagentByName(name) {
    return __async(this, null, function* () {
      try {
        return yield agentmodels_default.find({
          firstName: { $regex: `${name}` },
          "is_blocked": "false",
          "is_verified": "true"
        });
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  //fetching user by id
  getUserById(id) {
    return __async(this, null, function* () {
      try {
        return yield usermodel_default.find({ _id: id });
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  //fetching bookings based on status
  userbookings(status, id) {
    return __async(this, null, function* () {
      try {
        if (status === "All") {
          let dta = yield userbooking_default.find({ userId: id }).populate("agentId").exec();
          return dta;
        } else {
          let data = yield userbooking_default.find({ userId: id, status }).populate("agentId").exec();
          return data;
        }
      } catch (error) {
        throw new Error("error fetching data");
      }
    });
  }
  // cancel booking 
  cancelbooking(id, userid, status, amountrefund, slotId) {
    return __async(this, null, function* () {
      try {
        yield transactionmodel_default.create({ userId: userid, agentId: id, refundamount: amountrefund });
        let datas = yield userbooking_default.findOne({ _id: id });
        let bookingAmount = (datas == null ? void 0 : datas.bookingamount) ? parseFloat(datas.bookingamount) : 0;
        let refundAmount = parseFloat(amountrefund);
        let finalamount = bookingAmount - refundAmount;
        let adminpaymentamounut = Number(finalamount) / 100 * 10;
        yield agentaddslot_default.updateOne({ _id: slotId }, { $set: { status: "cancelled", adminpaidAmount: adminpaymentamounut } });
        yield userbooking_default.updateOne({ _id: id }, { $set: { status: "cancelled", refundamount: refundAmount, bookingamount: Number(finalamount) - adminpaymentamounut } });
        let user = yield usermodel_default.find({ _id: userid });
        let updatedamount = user[0].wallet + Number(amountrefund);
        yield usermodel_default.updateOne({ _id: userid }, { $set: { wallet: updatedamount } });
        let data = yield userbooking_default.find({ userId: userid, status }).populate("agentId").exec();
        return data;
      } catch (error) {
        console.error("Error cancelling slot:", error);
        throw new Error("Error cancelling slot");
      }
    });
  }
  //editing user and sending updated info to user
  editUser(data) {
    return __async(this, null, function* () {
      try {
        if (data.image) {
          yield usermodel_default.updateMany({ _id: data.userId }, { $set: { firstName: data.firstName, lastName: data.lastName, image: data.image } });
          return usermodel_default.find({ _id: data.userId });
        } else {
          yield usermodel_default.updateMany({ _id: data.userId }, { $set: { firstName: data.firstName, lastName: data.lastName } });
          return usermodel_default.find({ _id: data.userId });
        }
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  // finding slot to cancel
  findCancellingSlot(id) {
    return __async(this, null, function* () {
      try {
        return yield userbooking_default.find({ _id: id });
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  paymentSuccess(data, razorpay_payment_id) {
    return __async(this, null, function* () {
      try {
        try {
          yield agentaddslot_default.updateOne(
            { _id: data.slotId },
            { $set: { bookedUserId: data.userId, booked: true, status: "Confirmed", paymentstatus: "paid" } }
          );
          data.paymentId = razorpay_payment_id;
          data.bookingamount = data.bookingamount;
          yield transactionmodel_default.create({ userId: data.userId, agentId: data.agentId, paidamount: data.bookingamount });
          yield userbooking_default.create(data);
          return agentaddslot_default.find({ agentId: data.agentId, booked: false, date: { $gt: /* @__PURE__ */ new Date() } }).populate("agentId");
        } catch (error) {
          throw new Error(error);
        }
      } catch (e) {
        throw new Error("error adding payment");
      }
    });
  }
  generateRandomLetters() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let randomString = "";
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomString += letters.charAt(randomIndex);
    }
    return randomString;
  }
  // Example usage:/ Output will be a random string of 12 letters
  walletpayment(data) {
    return __async(this, null, function* () {
      const randomPaymentId = this.generateRandomLetters();
      data.paymentId = randomPaymentId;
      try {
        let userdata = yield usermodel_default.findOne({ _id: data.userId });
        if (userdata.wallet < data.bookingamount) {
          return { " failure": "there is not enough wallet balance" };
        }
        yield transactionmodel_default.create({ userId: data.userId, agentId: data.agentId, paidamount: data.bookingamount, paymentMode: "wallet payment" });
        yield agentaddslot_default.updateOne(
          { _id: data.slotId },
          { $set: { bookedUserId: data.userId, booked: true, status: "Confirmed", paymentstatus: "paid" } }
        );
        let balance = yield usermodel_default.findOne({ _id: data.userId });
        let balanceamount = Number(balance.wallet) - Number(data.bookingamount);
        yield usermodel_default.updateOne({ _id: data.userId }, { $set: { wallet: balanceamount } });
        yield userbooking_default.create(data);
        return agentaddslot_default.find({ agentId: data.agentId, booked: false, date: { $gt: /* @__PURE__ */ new Date() } });
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  paymentfailure(data) {
    return __async(this, null, function* () {
      try {
        try {
          yield agentaddslot_default.updateOne(
            { _id: data.slotId },
            { $set: { bookedUserId: data.userId, booked: true, status: "pending", paymentstatus: "failed" } }
          );
          yield userbooking_default.create(data);
          return agentaddslot_default.find({ agentId: data.agentId, booked: false, date: { $gt: /* @__PURE__ */ new Date() } });
        } catch (e) {
          throw new Error("failed to add booking details");
        }
      } catch (e) {
        throw new Error("error adding payment");
      }
    });
  }
  // getting transaction history
  userTransactionHistory(userId) {
    return __async(this, null, function* () {
      try {
        let data = yield transactionmodel_default.find({ userId }).populate("agentId");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// src/database/modules/controllers/services/userServices.ts
var userRepository = new UserRepository();
var UserService = class {
  registerUser(userData) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.create(userData);
      } catch (error) {
        throw new Error("Could not register user");
      }
    });
  }
  getuser(data) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.getUser(data);
      } catch (error) {
        throw new Error("Could not get user");
      }
    });
  }
  userdetails(email2) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.getUserdetails(email2);
      } catch (error) {
        throw new Error("Could not get userdetails");
      }
    });
  }
  verifyotp(email2) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.verifyotp(email2);
      } catch (error) {
        throw new Error("Could not get user");
      }
    });
  }
  successVerify(email2) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.successVerify(email2);
      } catch (error) {
        throw new Error("Could not get user");
      }
    });
  }
  getVerifiedagents() {
    return __async(this, null, function* () {
      try {
        return userRepository.getVerifiedagents();
      } catch (error) {
        throw new Error(error.message);
      }
    });
  }
  //getting available slots
  agentAvailableSlots(id) {
    return __async(this, null, function* () {
      try {
        return userRepository.agentAvailableSlots(id);
      } catch (e) {
        throw new Error("error fetching slots");
      }
    });
  }
  // sending back slot status false agents slots
  userslotbooking(data) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.userslotbooking(data);
      } catch (e) {
        throw new Error("error in adding user booking details");
      }
    });
  }
  agentCategory(item) {
    return __async(this, null, function* () {
      try {
        return userRepository.agentCategory(item);
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  //fetching agent by name 
  getagentByName(item) {
    return __async(this, null, function* () {
      try {
        return userRepository.getagentByName(item);
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  getUserById(id) {
    return __async(this, null, function* () {
      try {
        return userRepository.getUserById(id);
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  //walletpayment
  walletpayment(paymentdetail) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.walletpayment(paymentdetail);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  //fetching userbooking information from userRepository 
  userbookings(status, id) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.userbookings(status, id);
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  // finding slot to cancell
  findCancellingSlot(id) {
    return __async(this, null, function* () {
      try {
        return userRepository.findCancellingSlot(id);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  //cancel booking 
  cancelbooking(id, userid, status, amountrefund, slotId) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.cancelbooking(id, userid, status, amountrefund, slotId);
      } catch (e) {
        throw new Error("error cancelling slot");
      }
    });
  }
  //updaing user and sending data
  editUser(data) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.editUser(data);
      } catch (e) {
        throw new Error("error updating user");
      }
    });
  }
  paymentSuccess(data, razorpay_payment_id) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.paymentSuccess(data, razorpay_payment_id);
      } catch (e) {
        throw new Error("error updating payment");
      }
    });
  }
  //payment failure 
  paymentfailure(data) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.paymentfailure(data);
      } catch (e) {
        throw new Error("error updating payment");
      }
    });
  }
  // getting new token after token expiry 
  refreshtoken(data) {
    return __async(this, null, function* () {
      try {
        return userRepository.refreshtoken(data);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  userTransactionHistory(userId) {
    return __async(this, null, function* () {
      try {
        return yield userRepository.userTransactionHistory(userId);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// src/database/modules/controllers/usercontroller.ts
var import_bcrypt2 = __toESM(require("bcrypt"));

// Helper/mailOtp.ts
var import_nodemailer = __toESM(require("nodemailer"));
var generateOtp = () => {
  return Math.floor(1e5 + Math.random() * 9e5).toString();
};
var generateMail = (email2) => __async(void 0, null, function* () {
  const otp = generateOtp();
  console.log("otp is =>", otp);
  const transporter = import_nodemailer.default.createTransport({
    service: "Gmail",
    auth: {
      user: "bibindasmessi@gmail.com",
      pass: "amyq ipki zrkl vmtn"
    }
  });
  const mailOptions = {
    from: "bibindasmessi@gmail.com",
    to: email2,
    // Using the provided email parameter
    subject: "Gmail Verification",
    text: `Your OTP for verification is: ${otp}`
    // Include the OTP in the email text
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(otp);
      }
    });
  });
});
var mailOtp_default = generateMail;

// Helper/cloudinary.ts
var import_cloudinary = require("cloudinary");
var import_dotenv3 = __toESM(require("dotenv"));
import_dotenv3.default.config();
import_cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
var cloudinary_default = import_cloudinary.v2;

// Helper/razorpayConfig.ts
var import_dotenv4 = __toESM(require("dotenv"));
var import_razorpay = __toESM(require("razorpay"));
import_dotenv4.default.config();
console.log("key id==>", process.env.key_id);
console.log("key_secret==>", process.env.key_secret);
var RazorpayInstance = new import_razorpay.default({
  key_id: "rzp_test_9CEMr0p0borLvv",
  key_secret: "Ki2cAMKxf2JxKvJRQh2Xiq6U"
});
var razorpayConfig_default = RazorpayInstance;

// src/database/modules/controllers/usercontroller.ts
var import_crypto = __toESM(require("crypto"));

// Helper/customError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
};
var customError_default = CustomError;

// src/database/modules/controllers/usercontroller.ts
var userService = new UserService();
var orderdata;
var UserController = class {
  //user Registrration
  registerUser(req, res, next) {
    return __async(this, null, function* () {
      const folderName = "Talent Track";
      try {
        const userData = req.body;
        const userdetails = yield userService.userdetails(userData.email);
        if (userdetails.length > 0) {
          return res.status(401).json("email already exist");
        } else {
          let otp = yield mailOtp_default(userData.email);
          userData.otp = otp;
        }
        const password = yield import_bcrypt2.default.hash(userData.password, 10);
        userData.password = password;
        if (req.file) {
          const result = yield cloudinary_default.uploader.upload(req.file.path, {
            public_id: `${folderName}/${req.file.originalname}`
          });
          userData.image = result.secure_url;
        }
        const newUser = yield userService.registerUser(userData);
        res.status(201).json(newUser);
      } catch (error) {
        next(error);
      }
    });
  }
  //user login
  userlogin(req, res, next) {
    return __async(this, null, function* () {
      try {
        const data = req.body;
        const userdata = yield userService.getuser(data);
        if (!userdata) {
          return res.status(401).json("invalid credentials");
        } else {
          res.status(200).json(userdata);
        }
      } catch (error) {
        next(error);
      }
    });
  }
  //user verifying otp
  verifyotp(req, res, next) {
    return __async(this, null, function* () {
      try {
        const data = req.body;
        const verifyuser = yield userService.verifyotp(data.email);
        if (verifyuser[0].otp == data.otp) {
          const succesverify = yield userService.successVerify(data.email);
          res.status(201).json("successfully verified");
        } else {
          throw new customError_default("entered otp doesnt match plaese try again", 401);
        }
      } catch (error) {
        next(error);
      }
    });
  }
  getVerifiedagents(req, res, next) {
    return __async(this, null, function* () {
      try {
        const data = yield userService.getVerifiedagents();
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    });
  }
  //method get
  //getting slot details
  agentAvailableSlots(req, res, next) {
    return __async(this, null, function* () {
      try {
        let id = req.params.agentId;
        let data = yield userService.agentAvailableSlots(id);
        if (data.length > 0) {
          res.status(200).json(data);
        } else if (data.length == 0) {
          res.status(200).json("there are np available slots");
        } else {
          res.status(401).json("error fetching data");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  //getting Razorpay key
  getKey(req, res, next) {
    return __async(this, null, function* () {
      res.status(200).json({ key: process.env.key_id });
    });
  }
  // sending back slot status false slots to display it in the user for proceed booking information
  // method get
  userslotbooking(req, res, next) {
    return __async(this, null, function* () {
      try {
        let data = req.body;
        orderdata = req.body;
        const { bookingamount } = req.body;
        const options = {
          amount: Number(bookingamount * 100),
          currency: "INR"
        };
        const order = yield razorpayConfig_default.orders.create(options);
        if (order) {
          res.status(200).json(order);
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // @DESC to verify the payment
  // @METHOD  post
  // @PATH /paymentverification
  paymentVerification(req, res, next) {
    return __async(this, null, function* () {
      try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = import_crypto.default.createHmac("sha256", "Ki2cAMKxf2JxKvJRQh2Xiq6U").update(body.toString()).digest("hex");
        const isAuth = expectedSignature === razorpay_signature;
        if (isAuth && orderdata) {
          try {
            const { slotId, agentId, userId, time, date, bookingamount } = orderdata;
            let payment = yield userService.paymentSuccess(orderdata, razorpay_payment_id);
            if (payment) {
              res.status(200).json({ success: true, payment });
            }
          } catch (e) {
            throw new Error("error updating payment");
          }
        } else {
          try {
            const { slotId, agentId, userId, time, date, bookingamount } = orderdata;
            let payment = yield userService.paymentfailure(orderdata);
            if (payment) {
              res.status(400).json({ success: false, payment });
            }
          } catch (error) {
            console.error("Error in orderReceived:", error);
          }
          res.status(400).json({ success: false });
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // sending back the agent category details
  //method get
  agentCategory(req, res, next) {
    return __async(this, null, function* () {
      try {
        let category = req.query.category;
        let data = yield userService.agentCategory(category);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(401).json("error fetching data");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // fetching and sending agents by name
  // method get
  getagentByName(req, res, next) {
    return __async(this, null, function* () {
      try {
        let name = req.query.name;
        let data = yield userService.getagentByName(name);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(401).json("error fetching data");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // fetching user by id
  // method get
  getUserById(req, res, next) {
    return __async(this, null, function* () {
      try {
        let id = req.query.id;
        const data = yield userService.getUserById(id);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(401).json("error sendinig data");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // fetching user booking detrails based on status
  // method get
  userbookings(req, res, next) {
    return __async(this, null, function* () {
      try {
        let status = req.query.status;
        let id = req.query.id;
        let data = yield userService.userbookings(status, id);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(401).json("error fetching data");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  //walletpayment
  walletpayment(req, res, next) {
    return __async(this, null, function* () {
      try {
        let data = req.body;
        let paymentdata = yield userService.walletpayment(data);
        if (paymentdata) {
          res.status(200).json(paymentdata);
        }
      } catch (error) {
        next(error);
      }
    });
  }
  //finding slot to cancel 
  // cancel booking by user and fetching the updated details
  // method patch
  cancelbooking(req, res, next) {
    return __async(this, null, function* () {
      try {
        const { id, userid, status, paymentId, slotId } = req.body;
        const cancelslot = yield userService.findCancellingSlot(id);
        const refundamount = Number(parseInt(cancelslot[0].bookingamount) / 2);
        if (paymentId === cancelslot[0].paymentId) {
          razorpayConfig_default.payments.refund(paymentId, {
            amount: refundamount * 100,
            speed: "optimum",
            // You can specify the speed of the refund ('optimum' or 'normal')
            notes: {
              reason: "Customer requested a refund"
            }
          }, function(error, response) {
            return __async(this, null, function* () {
              if (error) {
                console.error("Refund failed:", error);
              } else {
                const amountrefund = refundamount.toString();
                let data = yield userService.cancelbooking(id, userid, status, amountrefund, slotId);
                if (data) {
                  res.status(200).json(data);
                } else {
                  res.status(401).json("error fetching data");
                }
              }
            });
          });
        }
        return;
      } catch (error) {
        next(error);
      }
    });
  }
  //updaing user
  //method put
  editUser(req, res, next) {
    return __async(this, null, function* () {
      try {
        const folderName = "Talent Track";
        if (req.file) {
        }
        let data = req.body;
        if (req.file) {
          const result = yield cloudinary_default.uploader.upload(req.file.path, {
            public_id: `${folderName}/${req.file.originalname}`
          });
          data.image = result.secure_url;
        }
        let userdata = yield userService.editUser(data);
        if (userdata) {
          return res.status(200).json(userdata);
        } else {
          return res.status(401).json("Error updating data");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  //getting new token by passing refresh token
  // method post
  refreshtoken(req, res) {
    return __async(this, null, function* () {
      try {
        let data = yield userService.refreshtoken(req.body);
        if (data) {
          return res.status(200).json(data);
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  // fetching and sending transaction details
  // method get
  userTransactionHistory(req, res) {
    return __async(this, null, function* () {
      let userId = req.query.userId;
      try {
        let data = yield userService.userTransactionHistory(userId);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(400).json("error fetching transactions");
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// src/database/models/chatmodel.ts
var import_mongoose7 = require("mongoose");
var chatSchema = new import_mongoose7.Schema(
  {
    chatName: {
      type: String
    },
    users: {
      type: import_mongoose7.Schema.Types.ObjectId,
      ref: "userSchema"
    },
    agent: {
      type: import_mongoose7.Schema.Types.ObjectId,
      ref: "agentSchema"
    },
    latestMessage: {
      type: import_mongoose7.Schema.Types.ObjectId,
      ref: "Message"
    }
  },
  { timestamps: true }
);
var chatModel = (0, import_mongoose7.model)("Chat", chatSchema);

// src/database/models/messagemodel.ts
var import_mongoose8 = require("mongoose");
var messageSchema = new import_mongoose8.Schema(
  {
    sender: {
      type: import_mongoose8.Schema.Types.ObjectId,
      ref: "userSchema"
    },
    content: {
      type: String,
      trim: true
    },
    chat: {
      type: import_mongoose8.Schema.Types.ObjectId,
      ref: "Chat"
    }
  },
  { timestamps: true }
);
var messageModel = (0, import_mongoose8.model)("Message", messageSchema);

// src/database/modules/controllers/repositories/chatRepository.ts
var import_mongoose9 = require("mongoose");
var chatRepository = class {
  accessChat(userId, agentId) {
    return __async(this, null, function* () {
      try {
        let isChat = yield chatModel.findOne({
          $and: [
            { users: userId },
            { agent: agentId }
          ]
        }).populate([
          { path: "users", model: "userSchema" }
          // Populate userSchema
          // Populate agentSchema
        ]).populate([
          { path: "agent", model: "agentSchema" }
          // Populate userSchema
          // Populate agentSchema
        ]).populate("latestMessage");
        console.log("isChat==>", isChat);
        if (isChat) {
          return isChat;
        } else {
          let chatData = {
            chatName: "sender",
            users: userId,
            agent: agentId
          };
          const createdChat = yield chatModel.create(chatData);
          const fullChat = yield chatModel.findOne({ _id: createdChat._id }).populate(
            { path: "users", model: "userSchema" }
            // Populate userSchema
            // Populate agentSchema
          ).populate(
            { path: "agent", model: "agentSchema" }
            // Populate userSchema
            // Populate agentSchema
          );
          console.log("full chat is ==>", fullChat);
          return fullChat;
        }
      } catch (error) {
        throw new import_mongoose9.Error(error);
      }
    });
  }
  // getting all the chats
  fetchChats(userId) {
    return __async(this, null, function* () {
      try {
        let data = yield chatModel.find({ users: userId }).populate("users").populate("latestMessage").sort({ updatedAt: -1 });
        let results = yield usermodel_default.populate(data, {
          path: "latestMessage.sender",
          select: "firstName image email"
        });
        return results;
      } catch (error) {
        throw new import_mongoose9.Error(error);
      }
    });
  }
  // adding messages
  sendMessage(content, chatId, userId) {
    return __async(this, null, function* () {
      var newMessage = {
        sender: userId,
        content,
        chat: chatId
      };
      try {
        var message = yield messageModel.create(newMessage);
        message = yield message.populate("sender", "firstName image");
        message = yield message.populate("chat");
        message = yield usermodel_default.populate(message, {
          path: "chat.users",
          select: "username profilePicture email"
        });
        yield chatModel.findByIdAndUpdate(chatId, { latestMessage: message });
        return message;
      } catch (error) {
        throw new import_mongoose9.Error(error);
      }
    });
  }
  // fetching all messages
  allMessages(chatId) {
    return __async(this, null, function* () {
      try {
        const messages = yield messageModel.find({ chat: chatId }).populate("sender", "firstName image email").populate("chat");
        return messages;
      } catch (error) {
        throw new import_mongoose9.Error(error);
      }
    });
  }
  //agentaccesschat 
  agentAccessChat(agentId) {
    return __async(this, null, function* () {
      try {
        let isChat = yield chatModel.find({
          agent: agentId
        }).populate([
          { path: "users", model: "userSchema" }
          // Populate userSchema
          // Populate agentSchema
        ]).populate("latestMessage");
        return isChat;
      } catch (error) {
        throw new import_mongoose9.Error(error);
      }
    });
  }
  // agent messages
  agentsendMessage(content, chatId, agentId) {
    return __async(this, null, function* () {
      var newMessage = {
        sender: agentId,
        content,
        chat: chatId
      };
      try {
        var message = yield messageModel.create(newMessage);
        message = yield message.populate("sender", "firstName image");
        message = yield message.populate("chat");
        message = yield usermodel_default.populate(message, {
          path: "chat.agent",
          select: "firstName image email"
        });
        yield chatModel.findByIdAndUpdate(chatId, { latestMessage: message });
        return message;
      } catch (error) {
        throw new import_mongoose9.Error(error);
      }
    });
  }
  agentallMessages(chatId) {
    return __async(this, null, function* () {
      try {
        const messages = yield messageModel.find({ chat: chatId }).populate("sender", "firstName image email").populate("chat");
        return messages;
      } catch (error) {
        throw new import_mongoose9.Error(error);
      }
    });
  }
};

// src/database/modules/controllers/services/chatservice.ts
var chatrepository = new chatRepository();
var chatService = class {
  accessChat(userId, agentId) {
    return __async(this, null, function* () {
      try {
        return yield chatrepository.accessChat(userId, agentId);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  // fetching all the chats 
  fetchChats(userId) {
    return __async(this, null, function* () {
      try {
        return yield chatrepository.fetchChats(userId);
      } catch (error) {
      }
    });
  }
  // adding message
  sendMessage(content, chatId, userId) {
    return __async(this, null, function* () {
      try {
        return yield chatrepository.sendMessage(content, chatId, userId);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  // fetching all of the messages
  allMessages(chatId) {
    return __async(this, null, function* () {
      try {
        return yield chatrepository.allMessages(chatId);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  agentAccessChat(agentId) {
    return __async(this, null, function* () {
      try {
        return yield chatrepository.agentAccessChat(agentId);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  // agent chats
  agentsendMessage(content, chatId, agentId) {
    return __async(this, null, function* () {
      try {
        return yield chatrepository.agentsendMessage(content, chatId, agentId);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  agentallMessages(chatId) {
    return __async(this, null, function* () {
      try {
        return yield chatrepository.agentallMessages(chatId);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// src/database/modules/controllers/chatController.ts
var chatservice = new chatService();
var chatController = class {
  accessChat(req, res) {
    return __async(this, null, function* () {
      const { userId, agentId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "nouserFound" });
      }
      let data = yield chatservice.accessChat(userId, agentId);
      console.log("data in controller==>", data);
      res.status(200).json(data);
    });
  }
  // getting all the avilable chat 
  fetchChats(req, res) {
    return __async(this, null, function* () {
      try {
        let userId = req.query.id;
        let data = yield chatservice.fetchChats(userId);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(401).json("error fetching chats");
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  // adding messages
  sendMessage(req, res) {
    return __async(this, null, function* () {
      try {
        let { content, chatId, userId } = req.body;
        let data = yield chatservice.sendMessage(content, chatId, userId);
        res.status(200).json(data);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  // getting all messages
  allMessages(req, res) {
    return __async(this, null, function* () {
      try {
        let chatId = req.query.id;
        let data = yield chatservice.allMessages(chatId);
        res.status(200).json(data);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  agentAccessChat(req, res) {
    return __async(this, null, function* () {
      try {
        let agentId = req.query.agentId;
        let data = yield chatservice.agentAccessChat(agentId);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(400).json("error fetching data");
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  // adding agent messages
  agentsendMessage(req, res) {
    return __async(this, null, function* () {
      try {
        let { content, chatId, agentId } = req.body;
        let data = yield chatservice.agentsendMessage(content, chatId, agentId);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(400).json("error sending message");
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  agentallMessages(req, res) {
    return __async(this, null, function* () {
      try {
        let chatId = req.query.id;
        let data = yield chatservice.agentallMessages(chatId);
        res.status(200).json(data);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// midlewares/userauth.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var jwtSecretToken2 = process.env.jwtsecrettoken;
var userAuth = (req, res, next) => __async(void 0, null, function* () {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("User-Bearer")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = import_jsonwebtoken2.default.verify(token, jwtSecretToken2, (err, decoded2) => {
        if (err) {
          res.status(401).json({ message: "Unauthorized" });
        } else {
          next();
        }
      });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});
var userauth_default = userAuth;

// Helper/multer.ts
var import_multer = __toESM(require("multer"));
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
});
var upload = (0, import_multer.default)({ storage });
var multer_default = upload;

// src/database/modules/controllers/routes/userRoute.ts
var router = import_express.default.Router();
var userController = new UserController();
var chatcontroller = new chatController();
router.post("/userregister", userauth_default, multer_default.single("image"), userController.registerUser);
router.post("/userlogin", userController.userlogin);
router.post("/verifyotp", userController.verifyotp);
router.post("/userslotbooking", userauth_default, userController.userslotbooking);
router.post("/paymentVerification", userauth_default, userController.paymentVerification);
router.get("/getVerifiedagents", userauth_default, userController.getVerifiedagents);
router.get("/showavailableslots/:agentId", userauth_default, userController.agentAvailableSlots);
router.get("/agentCategory", userController.agentCategory);
router.get("/getagentByName", userController.getagentByName);
router.get("/getUserById", userController.getUserById);
router.get("/userbookings", userauth_default, userController.userbookings);
router.get("/getKey", userController.getKey);
router.patch("/cancelbooking", userauth_default, userController.cancelbooking);
router.post("/editUser", userauth_default, multer_default.single("image"), userController.editUser);
router.post("/refreshtoken", userController.refreshtoken);
router.post("/accessChat", chatcontroller.accessChat);
router.get("/fetchChats", chatcontroller.fetchChats);
router.post("/sendMessage", chatcontroller.sendMessage);
router.get("/allMessages", chatcontroller.allMessages);
router.get("/userTransactionHistory", userController.userTransactionHistory);
router.post("/walletpayment", userController.walletpayment);
var userRoute_default = router;

// src/database/modules/controllers/routes/agentRoute.ts
var import_express2 = __toESM(require("express"));

// src/database/modules/controllers/agentController.ts
var import_bcrypt3 = __toESM(require("bcrypt"));

// src/database/modules/controllers/repositories/agentRepository.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
var import_dotenv5 = __toESM(require("dotenv"));
import_dotenv5.default.config();
var agentRepository = class {
  constructor() {
    // updating booking status that is user is rejection or coonsulted option is clicking
    this.bookingamount = 0;
  }
  create(agentData) {
    return __async(this, null, function* () {
      try {
        const uploads = multer_default.single("image");
        return yield agentmodels_default.create(agentData);
      } catch (error) {
        throw new Error("Could not create agent");
      }
    });
  }
  agentDetails(agentData) {
    return __async(this, null, function* () {
      try {
        return yield agentmodels_default.find({ email: agentData.email });
      } catch (error) {
        throw new Error("Could not create agent");
      }
    });
  }
  agentlogin(data) {
    return __async(this, null, function* () {
      try {
        let info = yield agentmodels_default.findOne({ email: data.email });
        if (!info) {
          return null;
        }
        let isValidPassword = yield comparePass(data.password, info.password);
        if (!isValidPassword) {
          return "password mismatch";
        } else {
          if (info.is_blocked) {
            return "you are blocked by the admin";
          }
          const token = import_jsonwebtoken3.default.sign(info.email, "secretKey");
          const accesseduser = {
            agenttoken: token,
            userdetails: {
              id: info._id,
              name: info.firstName,
              email: info.email,
              image: info.image,
              verified: info.is_verified,
              category: info.category,
              role: info.role
            }
          };
          return accesseduser;
        }
      } catch (error) {
        throw new Error("Could not find user");
      }
    });
  }
  verifyotp(email2) {
    return __async(this, null, function* () {
      try {
        let userdata = yield agentmodels_default.find({ email: email2 });
        return userdata;
      } catch (error) {
        throw new Error(error.message);
      }
    });
  }
  successVerify(email2) {
    return __async(this, null, function* () {
      try {
        let userdata = yield agentmodels_default.find({ email: email2 });
        const updatedUser = yield userdata[0].save();
      } catch (error) {
        throw new Error(error.message);
      }
    });
  }
  //agent adding posts
  addpost(data) {
    return __async(this, null, function* () {
      try {
        const ref = data.agentId.ref;
      } catch (e) {
        throw new Error("error adding posts");
      }
    });
  }
  //slot add 
  addslot(data) {
    return __async(this, null, function* () {
      try {
        let slot = yield agentaddslot_default.find({ agentId: data.agentId });
        yield agentaddslot_default.create(data);
        let total = yield agentaddslot_default.find({ agentId: data.agentId, booked: false });
        return total;
      } catch (e) {
        throw new Error("failure adding slot");
      }
    });
  }
  //fetching avilable slots to display in the agent side tro showvase for cancelling;
  availableslots(id) {
    return __async(this, null, function* () {
      try {
        let availableslots = yield agentaddslot_default.find({ agentId: id, booked: false, date: { $gt: /* @__PURE__ */ new Date() } }).populate("agentId");
        return availableslots;
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  //fetching booked slots
  bookedslots(id) {
    return __async(this, null, function* () {
      try {
        let confirmedSlots = yield agentaddslot_default.find({
          agentId: id,
          booked: true,
          $or: [
            { status: "Confirmed" },
            { status: "consulted" }
          ]
        }).populate("agentId").populate("bookedUserId");
        return confirmedSlots;
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  // deleting a slot a  slot and sending back the remaining slot
  deletingslot(slotid, id) {
    return __async(this, null, function* () {
      try {
        yield agentaddslot_default.deleteOne({ _id: slotid });
        let totalslot = yield agentaddslot_default.find({ agentId: id, booked: false });
        return totalslot;
      } catch (e) {
        throw new Error("error deleting a slot");
      }
    });
  }
  getAgentdetails(id) {
    return __async(this, null, function* () {
      try {
        return yield agentmodels_default.find({ _id: id });
      } catch (e) {
        throw new Error("error deleting a slot");
      }
    });
  }
  //fetching all the slots to display it in the agent side
  getAllSlots(id) {
    return __async(this, null, function* () {
      try {
        let data = yield agentaddslot_default.find({ agentId: id }).populate("bookedUserId").exec();
        return data;
      } catch (e) {
        throw new Error("error");
      }
    });
  }
  //fetching slot details by status type
  slotDetailsByOption(id, status) {
    return __async(this, null, function* () {
      try {
        if (status === "All") {
          let dta = yield agentaddslot_default.find({ agentId: id }).populate("bookedUserId").exec();
          return dta;
        } else {
          let data = yield agentaddslot_default.find({ agentId: id, status }).populate("bookedUserId").exec();
          return data;
        }
      } catch (error) {
        throw new Error("error fetching data");
      }
    });
  }
  //getting slots after cancelling one
  agentslotcancell(slotid, agentId) {
    return __async(this, null, function* () {
      try {
        yield agentaddslot_default.deleteOne({ _id: slotid });
        let dta = yield agentaddslot_default.find({ agentId, status: "pending" }).populate("bookedUserId").exec();
        return dta;
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  slotbookingchangeStatus(slotId, status, agentId) {
    return __async(this, null, function* () {
      try {
        let datas = yield userbooking_default.findOne({ slotId });
        let { userId, bookingamount } = datas;
        bookingamount = bookingamount;
        if (status == "agent cancelled") {
          yield userbooking_default.updateOne({ slotId }, { $set: { status } });
          yield agentaddslot_default.updateOne({ _id: slotId }, { $set: { status } });
          yield transactionmodel_default.create({ userId, agentId, refundamount: bookingamount });
          let user = yield usermodel_default.findOne({ _id: userId });
          let updatedamount = user.wallet + Number(bookingamount);
          yield usermodel_default.updateOne({ _id: userId }, { $set: { wallet: updatedamount } });
          let data2 = yield agentaddslot_default.find({ agentId, status: "Confirmed" }).populate("bookedUserId");
          return data2;
        }
        let amount = Number(bookingamount * 2 / 100 * 10);
        yield userbooking_default.updateOne({ slotId }, { $set: { status } });
        yield agentaddslot_default.updateOne({ _id: slotId }, { $set: { status, adminpaidAmount: amount } });
        let data = yield agentaddslot_default.find({ agentId, status: "consulted" }).populate("bookedUserId");
        return data;
      } catch (e) {
        throw new Error("error fetching value");
      }
    });
  }
  //editing agent profile
  editAgent(data) {
    return __async(this, null, function* () {
      try {
        if (data.image) {
          let datas = yield agentmodels_default.updateOne({ _id: data.agentId }, { $set: {
            firstName: data.firstName,
            lastName: data.lastName,
            category: data.category,
            experience: data.experience,
            clubConnections: data.clubConnections,
            image: data.image
          } });
          let agent = yield agentmodels_default.find({ _id: data.agentId });
          return agent;
        } else {
          let datas = yield agentmodels_default.updateOne({ _id: data.agentId }, { $set: {
            firstName: data.firstName,
            lastName: data.lastName,
            category: data.category,
            experience: data.experience,
            clubConnections: data.clubConnections
          } });
          let agent = yield agentmodels_default.find({ _id: data.agentId });
          return agent;
        }
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  // get all slot details from userslotbooking 
  getAllSlotDetails(id) {
    return __async(this, null, function* () {
      try {
        let data = yield userbooking_default.find({ agentId: id }).populate("agentId");
        return data;
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
};

// src/database/modules/controllers/services/agentService.ts
var agentrepository = new agentRepository();
var agentService = class {
  registeragent(agentData) {
    return __async(this, null, function* () {
      try {
        return agentrepository.create(agentData);
      } catch (error) {
        throw new Error("could not register agent");
      }
    });
  }
  agentlogin(data) {
    return __async(this, null, function* () {
      try {
        return agentrepository.agentlogin(data);
      } catch (error) {
        throw new Error("credentials are wrong");
      }
    });
  }
  agetDetails(agentData) {
    return __async(this, null, function* () {
      try {
        return agentrepository.agentDetails(agentData);
      } catch (error) {
        throw new Error("could not register agent");
      }
    });
  }
  verifyotp(email2) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.verifyotp(email2);
      } catch (error) {
        throw new Error("Could not get user");
      }
    });
  }
  successVerify(email2) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.successVerify(email2);
      } catch (error) {
        throw new Error("Could not get user");
      }
    });
  }
  addslot(data) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.addslot(data);
      } catch (e) {
        throw new Error("failure adding slot");
      }
    });
  }
  // sending data fetched from the repository to controller
  availableslots(id) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.availableslots(id);
      } catch (e) {
        throw new Error("failure fetching data");
      }
    });
  }
  // fetching booked slots
  bookedslots(id) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.bookedslots(id);
      } catch (e) {
        throw new Error("failure fetching data");
      }
    });
  }
  //deleting a slot and sending back the remaining slot
  deletingslot(slotid, id) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.deletingslot(slotid, id);
      } catch (e) {
        throw new Error("error deleting a a slot");
      }
    });
  }
  agentDetails(id) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.getAgentdetails(id);
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  //fetching all booked slots 
  getAllSlots(id) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.getAllSlots(id);
      } catch (e) {
        throw new Error("error fetching slots");
      }
    });
  }
  //fetching slot by status type 
  slotDetailsByOption(id, status) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.slotDetailsByOption(id, status);
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  //fetching data from userRouter after deletiong slot 
  agentslotcancell(slotId, agentId) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.agentslotcancell(slotId, agentId);
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  // sending data after updating slots 
  slotbookingchangeStatus(slotId, status, agentId) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.slotbookingchangeStatus(slotId, status, agentId);
      } catch (e) {
        throw new Error("error fetching data");
      }
    });
  }
  //after upading agent sending agent details
  editAgent(data) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.editAgent(data);
      } catch (e) {
        throw new Error("error updatinf agent");
      }
    });
  }
  // collecting userbooking details based on agent 
  getAllSlotDetails(id) {
    return __async(this, null, function* () {
      try {
        return yield agentrepository.getAllSlotDetails(id);
      } catch (e) {
        throw new Error("error updatinf agent");
      }
    });
  }
};

// src/database/modules/controllers/agentController.ts
var agentservice = new agentService();
var agetController = class {
  //agent resgistration
  // method post
  registeragent(req, res, next) {
    return __async(this, null, function* () {
      try {
        const folderName = "Talent Track";
        const agentData = req.body;
        const agentdetails = yield agentservice.agetDetails(agentData);
        if (agentdetails.length > 0) {
          return res.status(401).json("agent already exists");
        } else {
          let otp = yield mailOtp_default(agentData.email);
          agentData.otp = otp;
        }
        const password = yield import_bcrypt3.default.hash(agentData.password, 10);
        agentData.password = password;
        if (req.file) {
          const result = yield cloudinary_default.uploader.upload(req.file.path, {
            public_id: `${folderName}/${req.file.originalname}`
          });
          agentData.image = result.secure_url;
        }
        const newUser = yield agentservice.registeragent(agentData);
        res.status(201).json(newUser);
      } catch (error) {
        next(error);
      }
    });
  }
  // agent login
  //method post
  agentlogin(req, res, next) {
    return __async(this, null, function* () {
      try {
        const data = req.body;
        const userdata = yield agentservice.agentlogin(data);
        if (!userdata) {
          throw new customError_default("Invalid credentials", 401);
        } else {
          res.status(200).json(userdata);
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
  // verifying agent otp
  // method post
  agentverifyotp(req, res, next) {
    return __async(this, null, function* () {
      try {
        const data = req.body;
        const verifyuser = yield agentservice.verifyotp(data.email);
        if (verifyuser[0].otp == data.otp) {
          const succesverify = yield agentservice.successVerify(data.email);
          res.status(201).json("successfully verified");
        } else {
          res.status(404).json("entered otp doesnt match plaese try again");
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
  // adding post from agent
  // method post
  addpost(req, res, next) {
    return __async(this, null, function* () {
      try {
        res.status(200).json(req.body);
      } catch (error) {
        next(error);
      }
    });
  }
  // adding slot from agent
  // method post
  addslot(req, res, next) {
    return __async(this, null, function* () {
      try {
        const { date, time, id } = req.body;
        const data = {
          agentId: id,
          time,
          date
        };
        const slot = yield agentservice.addslot(data);
        if (slot) {
          res.status(200).json(slot);
        } else {
          res.status(401).json("failure adding slot");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // method get
  // fetching available slots
  availableslots(req, res, next) {
    return __async(this, null, function* () {
      try {
        let id = req.params.id;
        let data = yield agentservice.availableslots(id);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(401).json("error fetching data");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // fetching booked slots 
  bookedslots(req, res, next) {
    return __async(this, null, function* () {
      try {
        let id = req.query.agentId;
        let data = yield agentservice.bookedslots(id);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(401).json("error fetching data");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // deleting a slot and sending back the available slots
  // method delete
  deletingslot(req, res, next) {
    return __async(this, null, function* () {
      try {
        const { id, slotid } = req.query;
        let data = yield agentservice.deletingslot(slotid, id);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(401).json("error deleting a slot");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  agentDetails(req, res, next) {
    return __async(this, null, function* () {
      try {
        let id = req.query.id;
        let data = yield agentservice.agentDetails(id);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(401).json("error fetching data");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  //fetching all the booked slots
  // method get
  getAllSlots(req, res, next) {
    return __async(this, null, function* () {
      try {
        let id = req.query.id;
        let data = yield agentservice.getAllSlots(id);
        if (data) {
          res.status(200).json(data);
        }
      } catch (error) {
        next(error);
      }
    });
  }
  //fetching details by slot status
  // method get
  slotDetailsByOption(req, res, next) {
    return __async(this, null, function* () {
      try {
        let { id, data } = req.query;
        let datas = yield agentservice.slotDetailsByOption(id, data);
        if (datas) {
          res.status(200).json(datas);
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // fetcching fdata from the repository after deleting a slot
  //  method delete
  agentslotcancell(req, res, next) {
    return __async(this, null, function* () {
      try {
        let { slotId, agentId } = req.query;
        let datas = yield agentservice.agentslotcancell(slotId, agentId);
        if (datas) {
          res.status(200).json(datas);
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // fetching slots after updationg the status
  // method get
  slotbookingchangeStatus(req, res, next) {
    return __async(this, null, function* () {
      try {
        let { status, slotId, agentId } = req.query;
        let data = yield agentservice.slotbookingchangeStatus(
          slotId,
          status,
          agentId
        );
        if (data) {
          console.log("slot is==>", data);
          res.status(200).json(data);
        }
      } catch (error) {
        next(error);
      }
    });
  }
  //updating agent and fetching agent details
  //method put
  editAgent(req, res, next) {
    return __async(this, null, function* () {
      const folderName = "Talent Track";
      try {
        let data = req.body;
        if (req.file) {
          const result = yield cloudinary_default.uploader.upload(req.file.path, {
            public_id: `${folderName}/${req.file.originalname}`
          });
          data.image = result.secure_url;
        }
        let agent = yield agentservice.editAgent(data);
        if (agent) {
          res.status(200).json(agent);
        } else {
          res.status(401).json("failed to fetch data");
        }
      } catch (error) {
        next(error);
      }
    });
  }
  // collecting userbookin details of specific agent 
  //method get 
  getAllSlotDetails(req, res, next) {
    return __async(this, null, function* () {
      try {
        let { agentId } = req.query;
        let datas = yield agentservice.getAllSlotDetails(agentId);
        if (datas) {
          res.status(200).json(datas);
        }
      } catch (error) {
        next(error);
      }
    });
  }
};

// src/database/modules/controllers/routes/agentRoute.ts
var agentRouter = import_express2.default.Router();
var agentController = new agetController();
var chatcontroller2 = new chatController();
agentRouter.post("/agentregister", multer_default.single("image"), agentController.registeragent);
agentRouter.post("/agentlogin", agentController.agentlogin);
agentRouter.post("/agentverifyotp", agentController.agentverifyotp);
agentRouter.post("/addpost", agentController.addpost);
agentRouter.post("/addslot", agentController.addslot);
agentRouter.get("/availableslots/:id", agentController.availableslots);
agentRouter.get("/bookedslots", agentController.bookedslots);
agentRouter.delete("/deletingslot", agentController.deletingslot);
agentRouter.get("/agentDetails", agentController.agentDetails);
agentRouter.get("/getAllSlots", agentController.getAllSlots);
agentRouter.get("/slotDetailsByOption", agentController.slotDetailsByOption);
agentRouter.delete("/agentslotcancell", agentController.agentslotcancell);
agentRouter.get("/slotbookingchangeStatus", agentController.slotbookingchangeStatus);
agentRouter.put("/editAgent", multer_default.single("image"), agentController.editAgent);
agentRouter.get("/getAllSlotDetails", agentController.getAllSlotDetails);
agentRouter.get("/agentAccessChat", chatcontroller2.agentAccessChat);
agentRouter.get("/allMessages", chatcontroller2.agentallMessages);
agentRouter.post("/agentsendMessage", chatcontroller2.agentsendMessage);
var agentRoute_default = agentRouter;

// src/database/modules/controllers/routes/adminRoute.ts
var import_express3 = __toESM(require("express"));

// src/database/models/adminmodel.ts
var import_mongoose10 = __toESM(require("mongoose"));
var adminSchema = new import_mongoose10.default.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
});
var adminModel = import_mongoose10.default.model("adminSchema", adminSchema);
var adminmodel_default = adminModel;

// src/database/modules/controllers/repositories/adminRepository.ts
var adminRepository = class {
  adminlogin(data) {
    return __async(this, null, function* () {
      try {
        return adminmodel_default.find({ email: data.email });
      } catch (error) {
        throw new Error("invalid credentials");
      }
    });
  }
  getuserdata() {
    return __async(this, null, function* () {
      try {
        return usermodel_default.find();
      } catch (error) {
        throw new Error("invalid ");
      }
    });
  }
  getagentdata() {
    return __async(this, null, function* () {
      try {
        return agentmodels_default.find();
      } catch (error) {
        throw new Error("invalid ");
      }
    });
  }
  blockuser(email2) {
    return __async(this, null, function* () {
      try {
        const data = yield usermodel_default.findOne({ email: email2 });
        if (data.is_blocked) {
          data.is_blocked = false;
          data.save();
          return true;
        } else {
          data.is_blocked = true;
          data.save();
          return true;
        }
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  blockagent(email2) {
    return __async(this, null, function* () {
      try {
        const data = yield agentmodels_default.findOne({ email: email2 });
        if (data.is_blocked) {
          data.is_blocked = false;
          data.save();
          return true;
        } else {
          data.is_blocked = true;
          data.save();
          return true;
        }
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  verifyagent(email2) {
    return __async(this, null, function* () {
      try {
        const data = yield agentmodels_default.findOne({ email: email2 });
        if (data.is_verified) {
          data.is_verified = false;
          data.save();
          return true;
        } else {
          data.is_verified = true;
          data.save();
          return true;
        }
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  searchAgents(name) {
    return __async(this, null, function* () {
      try {
        const nameRegex = new RegExp(`^${name}`);
        const agents = yield agentmodels_default.find({ firstName: nameRegex });
        return agents;
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  searchUser(name) {
    return __async(this, null, function* () {
      try {
        const nameRegex = new RegExp(`^${name}`);
        const agents = yield usermodel_default.find({ firstName: nameRegex });
        return agents;
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  AllSlots() {
    return __async(this, null, function* () {
      try {
        let data = yield agentaddslot_default.find().populate("bookedUserId").populate("agentId");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  addDefaultSlots(data) {
    return __async(this, null, function* () {
      try {
        const { startdate, enddate, time, agentId } = data;
        const startDate = new Date(startdate);
        const endDate = new Date(enddate);
        for (let currentDate = new Date(startDate); currentDate.getTime() <= endDate.getTime(); currentDate.setDate(currentDate.getDate() + 1)) {
          const dataForCurrentDate = {
            agentId,
            date: new Date(currentDate),
            // Create a new Date object to avoid mutation
            time,
            booked: false,
            bookedUserId: null
            // Assuming no booking initially
            // Add any other properties to the data object as needed
          };
          let res = yield agentaddslot_default.create(dataForCurrentDate);
        }
        return "successfully added";
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  // all confirmedslots
  confirmedslots() {
    return __async(this, null, function* () {
      try {
        let data = yield agentaddslot_default.find({ booked: true }).populate("bookedUserId").populate("agentId");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// src/database/modules/controllers/services/adminService.ts
var adminrepository = new adminRepository();
var adminService = class {
  adminlogin(data) {
    return __async(this, null, function* () {
      try {
        return adminrepository.adminlogin(data);
      } catch (error) {
        throw new Error("inavalid");
      }
    });
  }
  getuserdata() {
    return __async(this, null, function* () {
      try {
        return adminrepository.getuserdata();
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  getagentdata() {
    return __async(this, null, function* () {
      try {
        return adminrepository.getagentdata();
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  blockuser(email2) {
    return __async(this, null, function* () {
      try {
        return adminrepository.blockuser(email2);
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  blockagent(email2) {
    return __async(this, null, function* () {
      try {
        return adminrepository.blockagent(email2);
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  verifyagent(email2) {
    return __async(this, null, function* () {
      try {
        return adminrepository.verifyagent(email2);
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  searchAgents(name) {
    return __async(this, null, function* () {
      try {
        return yield adminrepository.searchAgents(name);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  searchUser(name) {
    return __async(this, null, function* () {
      try {
        return yield adminrepository.searchUser(name);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  AllSlots() {
    return __async(this, null, function* () {
      try {
        return yield adminrepository.AllSlots();
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  addDefaultSlots(data) {
    return __async(this, null, function* () {
      try {
        return yield adminrepository.addDefaultSlots(data);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  confirmedslots() {
    return __async(this, null, function* () {
      try {
        return yield adminrepository.confirmedslots();
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// src/database/modules/controllers/adminController.ts
var import_jsonwebtoken4 = __toESM(require("jsonwebtoken"));
var secret = process.env.jwtsecrettoken;
var adminservice = new adminService();
var adminController = class {
  adminlogin(req, res) {
    return __async(this, null, function* () {
      let userlogdata = req.body;
      const loginresult = yield adminservice.adminlogin(userlogdata);
      try {
        if (loginresult[0]) {
          if (loginresult[0].password == userlogdata.password) {
            let admintoken = import_jsonwebtoken4.default.sign(userlogdata.email, secret);
            res.status(200).json(admintoken);
          } else {
            res.status(401).json("invalid credentials");
          }
        } else {
          res.status(401).json("invalid credentials");
        }
      } catch (error) {
      }
    });
  }
  // getting userdata and sending it to the client side
  // method get
  getuserdata(req, res) {
    return __async(this, null, function* () {
      try {
        const userdatadata = yield adminservice.getuserdata();
        if (userdatadata) {
          res.status(200).json(userdatadata);
        }
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  // sending agent details to the client side
  // method get
  getagentdata(req, res) {
    return __async(this, null, function* () {
      try {
        const data = yield adminservice.getagentdata();
        if (data) {
          res.status(200).json(data);
        }
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  // blocking user
  // method post
  blokUser(req, res) {
    return __async(this, null, function* () {
      try {
        const data = req.body;
        const userdata = yield adminservice.blockuser(data.email);
        if (userdata) {
          res.status(200).json("success");
        }
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  // blocking agent 
  // method patch
  blokagent(req, res) {
    return __async(this, null, function* () {
      try {
        const data = req.body;
        const userdata = yield adminservice.blockagent(data.email);
        if (userdata) {
          res.status(200).json("success");
        }
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  // verifying agent 
  // method post
  verifyagent(req, res) {
    return __async(this, null, function* () {
      try {
        const data = req.body;
        const userdata = yield adminservice.verifyagent(data.email);
        if (userdata) {
          res.status(200).json("success");
        }
      } catch (error) {
        throw new Error("invalid");
      }
    });
  }
  searchAgents(req, res) {
    return __async(this, null, function* () {
      try {
        let name = req.query.name;
        let agentdata = yield adminservice.searchAgents(name);
        if (agentdata) {
          res.status(200).json(agentdata);
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  searchUser(req, res) {
    return __async(this, null, function* () {
      try {
        let name = req.query.name;
        let agentdata = yield adminservice.searchUser(name);
        if (agentdata) {
          res.status(200).json(agentdata);
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  AllSlots(req, res) {
    return __async(this, null, function* () {
      try {
        let slots = yield adminservice.AllSlots();
        if (slots) {
          res.status(200).json(slots);
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  addDefaultSlots(req, res) {
    return __async(this, null, function* () {
      try {
        let data = req.body;
        let successMessage = yield adminservice.addDefaultSlots(data);
        if (successMessage) {
          res.status(200).json(successMessage);
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  confirmedslots(req, res) {
    return __async(this, null, function* () {
      try {
        let slots = yield adminservice.confirmedslots();
        if (slots) {
          res.status(200).json(slots);
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// midlewares/adminauth.ts
var import_jsonwebtoken5 = __toESM(require("jsonwebtoken"));
var secret2 = process.env.jwtsecrettoken;
var adminAuth = (req, res, next) => __async(void 0, null, function* () {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Admin-Bearer")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = import_jsonwebtoken5.default.verify(token, secret2, (err, decoded2) => {
        console.log("decoded data is ==>", decoded2);
        if (err) {
          res.status(401).json({ message: "Unauthorized" });
        } else {
          next();
        }
      });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});
var adminauth_default = adminAuth;

// src/database/modules/controllers/routes/adminRoute.ts
var adminRouter = import_express3.default.Router();
var admincontroller = new adminController();
adminRouter.post("/adminlogin", admincontroller.adminlogin);
adminRouter.get("/getuserdata", adminauth_default, admincontroller.getuserdata);
adminRouter.get("/getagentdata", adminauth_default, admincontroller.getagentdata);
adminRouter.post("/blokUser", adminauth_default, admincontroller.blokUser);
adminRouter.post("/blokagent", adminauth_default, admincontroller.blokagent);
adminRouter.post("/agentVerify", adminauth_default, admincontroller.verifyagent);
adminRouter.get("/searchAgents", admincontroller.searchAgents);
adminRouter.get("/searchUser", admincontroller.searchUser);
adminRouter.post("/adddefaultslot", admincontroller.addDefaultSlots);
adminRouter.get("/AllSlots", admincontroller.AllSlots);
adminRouter.get("/confirmedslots", admincontroller.confirmedslots);
var adminRoute_default = adminRouter;

// midlewares/errorhandling.ts
var errorHandlingMidleware = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.statusCode === 404) {
    res.status(err.statusCode).json({ errors: err.status, errorMessage: err.message });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
};
var errorhandling_default = errorHandlingMidleware;

// index.ts
import_dotenv6.default.config();
var app = (0, import_express4.default)();
var server = import_http.default.createServer(app);
var io = new import_socket.Server(server, {
  pingTimeout: 1e4,
  cors: {
    origin: "http://localhost:4200"
  }
});
app.use(import_express4.default.json());
app.use((0, import_cors.default)({ origin: "http://localhost:4200" }));
app.use("/image", import_express4.default.static(import_path.default.join(__dirname, "image")));
app.use(errorhandling_default);
app.use("/users", userRoute_default);
app.use("/agents", agentRoute_default);
app.use("/admin", adminRoute_default);
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("newMessage", (data) => {
    io.emit("messageReceived", data);
  });
  {
  }
});
var PORT = process.env.PORT || 5e3;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
connectToDatabase();
//# sourceMappingURL=index.js.map