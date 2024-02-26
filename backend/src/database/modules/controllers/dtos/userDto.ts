import mongoose from "mongoose";

export interface UserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: number;
  otp_updated_at: Date;
  is_verified: boolean;
  role: string;
  is_blocked: boolean;
  image: string;
  certificate: string;
  category: string;
  position: string;
}
export interface userlog {
  email: string;
  password: string;
}
export interface userBookingDocument extends Document {
  slotId: mongoose.Types.ObjectId;
  agentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  time: string;
  date: Date;
  status: string;
  bookingamount: string;
}

export interface IBooking {
  slotId: string;
  agentId: string;
  userId: string;
  time: string;
  date: Date;
  bookingamount: number;
}
export interface IcancelBooking {
  id: string;
  userid: string;
  status: string;
  paymentId:string;
  slotId:string;
}

interface Agent {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: number;
  is_verified: boolean;
  role: string;
  is_blocked: boolean;
  image: string;
  category: string;
  __v: number;
  clubConnections: string;
  experience: string;
}

export interface IBookingCancel {
  _id: string;
  slotId: string;
  agentId: Agent;
  userId: string;
  time: string;
  date: Date;
  status: string;
  __v: number;
}
