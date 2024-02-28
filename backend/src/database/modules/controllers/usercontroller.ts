import { Request, Response, NextFunction } from "express";
import { UserService } from "./services/userServices";
import {
  UserDto,
  userlog,
  userBookingDocument,
  IBooking,
  IcancelBooking,
  IBookingCancel,
} from "./dtos/userDto";

import bcrypt from "bcrypt";
import generateMail from "../../../../Helper/mailOtp";
import cloudinary from "../../../../Helper/cloudinary";
import { UserRepository } from "./repositories/userREpository";
import RazorpayInstance from "../../../../Helper/razorpayConfig";
import crypto from "crypto";
import CustomError from "../../../../Helper/customError";

const userService = new UserService();
var orderdata: IBooking;
//user controller class
export class UserController {
  //user Registrration

  async registerUser(req: Request, res: Response, next: NextFunction) {
    const folderName = "Talent Track";

    try {
      const userData: UserDto = req.body;

      console.log("inside user controller", req.body);

      const userdetails = await userService.userdetails(userData.email);

      if (userdetails.length > 0) {
        return res.status(401).json("email already exist");
      } else {
        let otp = await generateMail(userData.email);
        userData.otp = otp as number;
      }
      const password = await bcrypt.hash(userData.password, 10);
      userData.password = password;
      if (req.file) {
        console.log("cloudinary===>");
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${folderName}/${req.file.originalname}`,
        });
        userData.image = result.secure_url;
      }
      console.log("userdata is==>", userData);
      const newUser = await userService.registerUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  //user login

  async userlogin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const userdata = await userService.getuser(data);
      if (!userdata) {
        return res.status(401).json("invalid credentials");
      } else {
        res.status(200).json(userdata);
      }
    } catch (error) {
      next(error);
    }
  }
  //user verifying otp

  async verifyotp(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const verifyuser = await userService.verifyotp(data.email);
      if (verifyuser[0].otp == data.otp) {
        const succesverify = await userService.successVerify(data.email);
        res.status(201).json("successfully verified");
      } else {
        // res.status(404).json("entered otp doesnt match plaese try again");
        throw new CustomError("entered otp doesnt match plaese try again", 401);
      }
    } catch (error) {
      next(error);
    }
  }
  async getVerifiedagents(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.getVerifiedagents();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  //method get
  //getting slot details
  async agentAvailableSlots(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.params);
      let id = req.params.agentId;
      console.log(id);
      let data = await userService.agentAvailableSlots(id);
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
  }

  //getting Razorpay key
  async getKey(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ key: process.env.key_id });
  }

  // sending back slot status false slots to display it in the user for proceed booking information
  // method get

  async userslotbooking(req: Request, res: Response, next: NextFunction) {
    try {
      let data: userBookingDocument = req.body;
      orderdata = req.body;

      console.log("payment details are===>", req.body);
      const { bookingamount } = req.body;
      console.log("===>", bookingamount);
      const options = {
        amount: Number(bookingamount * 100),
        currency: "INR",
      };
      console.log("options are===>", options);
      const order = await RazorpayInstance.orders.create(options);
      console.log("orderssss==>", order);
      if (order) {
        console.log("order==>", order);
        res.status(200).json(order);
      }
    } catch (error) {
      next(error);
    }
  }

  // @DESC to verify the payment
  // @METHOD  post
  // @PATH /paymentverification
  async paymentVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", "Ki2cAMKxf2JxKvJRQh2Xiq6U" || "")
        .update(body.toString())
        .digest("hex");
      const isAuth = expectedSignature === razorpay_signature;

      if (isAuth && orderdata) {
        try {
          const { slotId, agentId, userId, time, date, bookingamount } =
            orderdata;
          let payment = await userService.paymentSuccess(orderdata,razorpay_payment_id);
          if (payment) {
            res.status(200).json({ success: true, payment });
          }
        } catch {
          throw new Error("error updating payment");
        }
      } else {
        try {
          const { slotId, agentId, userId, time, date, bookingamount } =
            orderdata;

          let payment = await userService.paymentfailure(orderdata);
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
  }

  // sending back the agent category details
  //method get
  async agentCategory(req: Request, res: Response, next: NextFunction) {
    try {
      let category: string = req.query.category as string;
      let data = await userService.agentCategory(category);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(401).json("error fetching data");
      }
    } catch (error) {
      next(error);
    }
  }

  // fetching and sending agents by name
  // method get

  async getagentByName(req: Request, res: Response, next: NextFunction) {
    try {
      let name: string = req.query.name as string;

      console.log(req.query);
      let data = await userService.getagentByName(name);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(401).json("error fetching data");
      }
    } catch (error) {
      next(error);
    }
  }
  // fetching user by id
  // method get

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      let id = req.query.id;
      console.log("id is =>", id);
      const data = await userService.getUserById(id);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(401).json("error sendinig data");
      }
    } catch (error) {
      next(error);
    }
  }
  // fetching user booking detrails based on status
  // method get

  async userbookings(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.query);
      let status = req.query.status as string;
      let id = req.query.id as string;
      let data = await userService.userbookings(status, id);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(401).json("error fetching data");
      }
    } catch (error) {
      next(error);
    }
  }
//finding slot to cancel 



  // cancel booking by user and fetching the updated details
  // method patch

  async cancelbooking(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const { id, userid, status,paymentId,slotId }: IcancelBooking = req.body;
      console.log("cancel details are====> ",req.body)
      const cancelslot=await userService.findCancellingSlot(id);
      console.log("cancelslot====>",cancelslot);
      const refundamount =Number(parseInt(cancelslot[0].bookingamount)/2)
      if(paymentId === cancelslot[0].paymentId){
        RazorpayInstance.payments.refund(paymentId, {
          amount: refundamount*100,
          speed: 'optimum', // You can specify the speed of the refund ('optimum' or 'normal')
          notes: {
            reason: 'Customer requested a refund'
          }
        },async function (error, response) {
          if (error) {
            console.error('Refund failed:', error);
            // Handle refund failure
          } else {
            const amountrefund=refundamount.toString()

            let data = await userService.cancelbooking(id, userid, status,amountrefund,slotId);
            if (data) {
              res.status(200).json(data);
            } else {
              res.status(401).json("error fetching data");
            }
            console.log('Refund successful:', response);
            // Handle refund success
          }
        });
      }
      return

     
    } catch (error) {
      next(error);
    }
  }

  //updaing user
  //method put

  async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const folderName = "Talent Track";
      console.log("req.body is==>", req.body.firstName);
      console.log("req.body is==>", req.body);

      if (req.file) {
        console.log("file name is", req.file.path);
      }

      let data = req.body;
      if (req.file) {
        console.log("cloudinary===>");
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${folderName}/${req.file.originalname}`,
        });
        data.image = result.secure_url;
      }

      let userdata = await userService.editUser(data);
      if (userdata) {
        console.log("User data updated successfully");
        return res.status(200).json(userdata);
      } else {
        console.log("Error updating data");
        return res.status(401).json("Error updating data");
      }
    } catch (error) {
      next(error);
    }
  }

  //getting new token by passing refresh token
  // method post
  async refreshtoken(req:Request,res:Response){
    try{
    let data:any=await  userService.refreshtoken(req.body)
    if(data){
      return res.status(200).json(data)
    }
    }catch(error:any){
      throw new Error(error)
    }
    
  }
}
