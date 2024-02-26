import { UserDto } from "./dtos/userDto";
import { NextFunction, Request, Response } from "express";

import bcrypt from "bcrypt";
import generateMail from "../../../../Helper/mailOtp";
import { agentService } from "./services/agentService";
import cloudinary from "../../../../Helper/cloudinary";
import { UserService } from "./services/userServices";
import CustomError from "../../../../Helper/customError";

// creating an instance of a agentservice class

const agentservice = new agentService();

export class agetController {
  //agent resgistration
  // method post

  async registeragent(req: Request, res: Response, next: NextFunction) {
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
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${folderName}/${req.file.originalname}`,
        });
        agentData.image = result.secure_url;
      }
      const newUser = await agentservice.registeragent(agentData);
      res.status(201).json(newUser);
    } catch (error: any) {
      next(error);
    }
  }

  // agent login
  //method post

  async agentlogin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const userdata = await agentservice.agentlogin(data);
      if (!userdata) {
        // return res.status(401).json("invalid credentials");
        throw new CustomError("Invalid credentials", 401);
      } else {
        res.status(200).json(userdata);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // verifying agent otp
  // method post

  async agentverifyotp(req: Request, res: Response, next: NextFunction) {
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

  async addpost(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  }
  // adding slot from agent
  // method post

  async addslot(req: Request, res: Response, next: NextFunction) {
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
        res.status(200).json(slot);
      } else {
        res.status(401).json("failure adding slot");
      }
    } catch (error) {
      next(error);
    }
  }

  // method get
  // fetching available slots

  async availableslots(req: Request, res: Response, next: NextFunction) {
    try {
      let id = req.params.id as string;
      let data = await agentservice.availableslots(id);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(401).json("error fetching data");
      }
    } catch (error) {
      next(error);
    }
  }

  // deleting a slot and sending back the available slots
  // method delete

  async deletingslot(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, slotid } = req.query as any;
      let data = await agentservice.deletingslot(slotid, id);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(401).json("error deleting a slot");
      }
    } catch (error) {
      next(error);
    }
  }

  async agentDetails(req: Request, res: Response, next: NextFunction) {
    console.log("inside controller", req.query);
    try {
      let id: string = req.query.id as string;
      let data = await agentservice.agentDetails(id);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(401).json("error fetching data");
      }
    } catch (error) {
      next(error);
    }
  }

  //fetching all the booked slots
  // method get
  async getAllSlots(req: Request, res: Response, next: NextFunction) {
    console.log("inside controller", req.query);
    try {
      let id = req.query.id as string;
      let data = await agentservice.getAllSlots(id);
      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  //fetching details by slot status
  // method get

  async slotDetailsByOption(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("controller ", req.query);
      let { id, data } = req.query as any;
      let datas = await agentservice.slotDetailsByOption(id, data);
      if (datas) {
        res.status(200).json(datas);
      }
    } catch (error) {
      next(error);
    }
  }

  // fetcching fdata from the repository after deleting a slot
  //  method delete

  async agentslotcancell(req: Request, res: Response, next: NextFunction) {
    try {
      let { slotId, agentId } = req.query as any;
      let datas = await agentservice.agentslotcancell(slotId, agentId);
      if (datas) {
        res.status(200).json(datas);
      }
    } catch (error) {
      next(error);
    }
  }

  // fetching slots after updationg the status
  // method get

  async slotbookingchangeStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.query);
      let { status, slotId, agentId } = req.query as any;
      let data: any = await agentservice.slotbookingchangeStatus(
        slotId,
        status,
        agentId
      );
      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  //updating agent and fetching agent details
  //method put

  async editAgent(req: Request, res: Response, next: NextFunction) {
    const folderName = "Talent Track";
    try {
      let data = req.body;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `${folderName}/${req.file.originalname}`,
        });
        data.image = result.secure_url;
      }
      let agent = await agentservice.editAgent(data);
      if (agent) {
        res.status(200).json(agent);
      } else {
        res.status(401).json("failed to fetch data");
      }
    } catch (error) {
      next(error);
    }
  }
}
