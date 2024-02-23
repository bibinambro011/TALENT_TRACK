import { Request, Response } from "express";
import { UserService } from "./services/userServices";
import { UserDto, userlog ,userBookingDocument} from "./dtos/userDto";

import bcrypt from "bcrypt";
import generateMail from "../../../../Helper/mailOtp";
import cloudinary from "../../../../Helper/cloudinary";
import { UserRepository } from "./repositories/userREpository";


const userService = new UserService();

//user controller class
export class UserController {
  //user Registrration
  
  async registerUser(req: Request, res: Response) {
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
  async getVerifiedagents(req: Request, res: Response) {
    try {
      const data = await userService.getVerifiedagents();
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  //method get
  //getting slot details
  async agentAvailableSlots(req:Request,res:Response){
    try{
     console.log(req.params)
      let id=req.params.agentId
      console.log(id)
      let data=await userService.agentAvailableSlots(id);
      if(data.length>0){
        res.status(200).json(data)
      }else if(data.length==0){
        res.status(200).json("there are np available slots")
      }else{
        res.status(401).json("error fetching data")
      }

    }catch{
      throw new Error("error fetching data")
    }
  }

// sending back slot status false slots to display it in the user for proceed booking information
// method get 

  async userslotbooking(req:Request,res:Response){
    try{
      let data:userBookingDocument=req.body;
      let userdata=await userService.userslotbooking(data)
      if(userdata){
        res.status(200).json(userdata)
      }else{
        res.status(401).json("error adding userbooking details")
      }
    }catch{
      throw new Error("error adding userbooking details")
    }
  }
  // sending back the agent category details
  //method get
  async agentCategory(req:Request, res: Response){
    try{
      let category:any=req.query.category
      let data=await userService.agentCategory(category)
      if(data){
        res.status(200).json(data)
      }else{
        res.status(401).json("error fetching data")
      }
    }catch{
      throw new Error("Error fetching data")
    }
  }


  // fetching and sending agents by name
  // method get

  async getagentByName(req:Request, res: Response){
    try{
      let name:any=req.query.name
      console.log(req.query)
      let data=await userService.getagentByName(name)
      if(data){
        res.status(200).json(data)
      }else{
        res.status(401).json("error fetching data")
      }
    }catch{
      throw new Error("Error fetching data")
    }
  }
  // fetching user by id 
  // method get

  async getUserById(req:Request, res:Response){
    try{
      let id=req.query.id 
      console.log("id is =>",id)
      const data=await userService.getUserById(id);
      if(data){
        res.status(200).json(data)
      }else{
        res.status(401).json("error sendinig data")
      }
    }catch{
      throw new Error("Error fetching data")
    }
  }
// fetching user booking detrails based on status
// method get 

async userbookings(req:Request,res:Response){
  try{
    console.log(req.query)
    let status=req.query.status as string
    let id=req.query.id as string
    let data:any=await userService.userbookings(status,id)
    if(data){
      res.status(200).json(data)
    }else{
      res.status(401).json("error fetching data")
    }
  }catch{
    throw new Error("Error fetching data")
  }
}

// cancel booking by user and fetching the updated details 
// method patch 

async cancelbooking(req:Request, res:Response){
  try{
    console.log(req.body)
    let {id,userid,status}=req.body as any
    let data:any=await userService.cancelbooking(id,userid,status)
    if(data){
      res.status(200).json(data)
    }else{
      res.status(401).json("error fetching data")
    }
  }catch{
    throw new Error("Error fetching data")
  }
}

//updaing user
//method put

async editUser(req: Request, res: Response) {
  try {
    const folderName = "Talent Track";
    console.log("req.body is==>", req.body.firstName);
    console.log("req.body is==>", req.body);

    if (req.file) {
      console.log("file name is", req.file.path);
    }

    let data: any = req.body as any;
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
    console.error("An error occurred:", error);
    return res.status(500).json("An error occurred while updating data");
  }
}


}
