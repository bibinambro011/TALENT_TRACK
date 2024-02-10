import { Response, Request } from "express";
import { adminService } from "./services/adminService";
import { userlog } from "./dtos/userDto";

const adminservice = new adminService();

export class adminController {
  async adminlogin(req: Request, res: Response) {
    let data: userlog = req.body;
    const result = await adminservice.adminlogin(data);
    try {
      if (result[0]) {
        if (result[0].password == data.password) {
          res.status(200).json("login successfull");
        } else {
          res.status(401).json("invalid credentials");
        }
      } else {
        res.status(401).json("invalid credentials");
      }
    } catch (error) {}
  }
  async getuserdata(req: Request, res: Response) {
    try {
      const data = await adminservice.getuserdata();
      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      throw new Error("invalid");
    }
  }
  async getagentdata(req: Request, res: Response) {
    try {
      const data = await adminservice.getagentdata();
      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      throw new Error("invalid");
    }
  }
  async blokUser(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log("data is in controll",data)
      const userdata = await adminservice.blockuser(data.email);
      if (userdata) {
        res.status(200).json("success");
      }
    } catch (error) {
      throw new Error("invalid");
    }
  }
  async blokagent(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log("data is in controll",data)
      const userdata = await adminservice.blockagent(data.email);
      if (userdata) {
        res.status(200).json("success");
      }
    } catch (error) {
      throw new Error("invalid");
    }
  }
}
