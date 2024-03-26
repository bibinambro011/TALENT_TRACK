export interface adminUser {
    _id: string; // Assuming ObjectId is stored as a string
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
  }
  
  export default interface adminAgent {
    _id: string; // Assuming ObjectId is stored as a string
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
    clubConnections?: string; // Optional property
    experience?: string; // Optional property
  }

  export interface adminBooking {
    _id: string; // Assuming ObjectId is stored as a string
    agentId: {
      _id: string; // Assuming ObjectId is stored as a string
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
      clubConnections?: string; // Optional property
      experience?: string; // Optional property
    };
    date: Date;
    time: string;
    booked: boolean;
    status: string;
    bookingAmount: string;
    __v: number;
    bookedUserId: {
      _id: string; // Assuming ObjectId is stored as a string
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
  
  