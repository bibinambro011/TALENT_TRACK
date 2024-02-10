import { Request, Response } from "express";
import { UserService } from "./services/userServices";
import { UserDto, userlog } from "./dtos/userDto";
import bcrypt from "bcrypt";
import generateMail from "../../../../Helper/mailOtp";

const userService = new UserService();

//user controller class
export class UserController {
  //user Registrration
  async registerUser(req: Request, res: Response) {
    try {
      const userData: UserDto = req.body;

      const userdetails = await userService.userdetails(userData.email);

      if (userdetails.length > 0) {
        return res.status(401).json("email already exist");
      } else {
        let otp = await generateMail(userData.email);
        userData.otp = otp as number;
      }

      const password = await bcrypt.hash(userData.password, 10);
      userData.password = password;
      const newUser = await userService.registerUser(userData);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  //user login
  async userlogin(req: Request, res: Response) {
    try {
      const data = req.body;

      const userdata = await userService.getuser(data);
      if (!userdata) {
        return res.status(401).json("invalid credentials");
      } else {
        res.status(200).json(userdata);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  //user verifying otp
  async verifyotp(req: Request, res: Response) {
    try {
      const data = req.body;

      const verifyuser = await userService.verifyotp(data.email);
      if (verifyuser[0].otp == data.otp) {
        const succesverify = await userService.successVerify(data.email);
        res.status(201).json("successfully verified");
      } else {
        res.status(404).json("entered otp doesnt match plaese try again");
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
