import { UserDto } from "./dtos/userDto";
import { Request, Response } from "express";

import bcrypt from "bcrypt";
import generateMail from "../../../../Helper/mailOtp";
import { agentService } from "./services/agentService";
import cloudinary from "../../../../Helper/cloudinary";

// creating an instance of a agentservice class

const agentservice = new agentService();

//agent controller class
export class agetController {
  //agent resgistration
  // method post
  async registeragent(req: Request, res: Response) {
    console.log("registeragent called==>");
    console.log("req.body bis==>", req.body);
    console.log("req.file bis==>", req.file);

    try {
      const folderName = "Talent Track";
      const agentData: UserDto = req.body;

      const agentdetails = await agentservice.agetDetails(agentData);
      if (agentdetails.length > 0) {
        return res.status(401).json("agent already exists");
      } else {
        let otp = await generateMail(agentData.email);
        agentData.otp = otp as number;
      }
      const password = await bcrypt.hash(agentData.password, 10);
      agentData.password = password;
      if (req.file) {
        console.log("cloudinary===>");
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${folderName}/${req.file.originalname}`,
        });
        agentData.image = result.secure_url;
      }
      const newUser = await agentservice.registeragent(agentData);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // agent login
  //method post

  async agentlogin(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log("agent body is ===>", data);

      const userdata = await agentservice.agentlogin(data);
      if (!userdata) {
        return res.status(401).json("invalid credentials");
      } else {
        res.status(200).json(userdata);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // verifying agent otp
  // method post

  async agentverifyotp(req: Request, res: Response) {
    try {
      const data = req.body;

      const verifyuser = await agentservice.verifyotp(data.email);
      if (verifyuser[0].otp == data.otp) {
        const succesverify = await agentservice.successVerify(data.email);
        res.status(201).json("successfully verified");
      } else {
        res.status(404).json("entered otp doesnt match plaese try again");
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // adding post from agent
  // method post

  async addpost(req: Request, res: Response) {
    try {
      console.log(req.body);
      res.status(200).json(req.body);
    } catch {
      throw new Error("error updating data");
    }
  }
  // adding slot from agent
  // method post

  async addslot(req: Request, res: Response) {
    try {
      const { date, time, id } = req.body;
      const data = {
        agentId: id,
        time: time,
        date: date,
      };
      console.log(data);
      const slot = await agentservice.addslot(data);
      if (slot) {
        res.status(200).json("salot added successfully");
      } else {
        res.status(401).json("failure adding slot");
      }
    } catch {
      throw new Error("failure addig slot");
    }
  }
}
