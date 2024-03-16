export interface Slot {

    date: Date;
    time: string[];
    agentId: string;
  }
  
 export interface UserOtp {
    email: string;
    otp: number;
}

export interface Appointment {
  date: string;
  time: string;
  id: string;
}
export interface userAppointment {
  _id: string;
  agentId: string;
  date: string;
  time: string;
  booked: boolean;
  status: string;
  bookedUserId?: string | null; // Optional property
  bookingAmount: string;
  __v: number;
}
export interface EditAgent {
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

export interface Booking {
  _id: string;
  agentId: string;
  date: Date;
  time: string;
  booked: boolean;
  status: string;
  bookingAmount: string;
  __v: number;
  bookedUserId?: {
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
      wallet: number;
      __v: number;
  };
  paymentstatus: string;
}

export interface BookingstausChange {
  _id: string;
  agentId: string;
  date: Date;
  time?: string;
  booked: boolean;
  status: string;
  bookedUserId?: string | {
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
      wallet: number;
      __v: number;
  };
  bookingAmount: string;
  __v: number;
  paymentstatus: string;
}
