export interface UserList {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  category: string;
  confirmPassword: string;
  image?: string; // Optional property
  // certificates?: string[]; // Optional array of strings
}

export interface userlog {
  email: string;
  password: string;
}
export interface successresponsedata {
  usertoken: string;
  userdetails: logsuccess;
}
export interface logsuccess {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  image: string;
  category: string;
}

export interface stateinterface {
  id: string;
  firstName: string;
  email: string;
  image: string;
  role: string;
}
export interface dateandtime {
  date: string;
  time: string;
}

export interface chatusermodel{
  userId:string;
  agentId:string
}



// user.interface.ts
export interface RegisterdUserI {
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
  _id: string;
  __v: number;
}


// user login

// auth.interface.ts
export interface UserloginAuthData {
  usertoken: string;
  refreshtoken: string;
  userdetails: UserloginUserDetails;
}

export interface UserloginUserDetails {
  id: string;
  name: string;
  email: string;
  image: string;
  category: string;
  role: string;
}


// agent.interface.ts
export interface VerifiedAgentsI {
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
  clubConnections?: string;
  experience?: string;
}

// token.interface.ts
export interface TokenData {
  token: string;
  refreshtoken: string;
}


// order.interface.ts
export interface UserBookingOrderI {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string | null;
  offer_id: string | null;
  status: string;
  attempts: number;
  notes: any[]; // You can define a specific type for notes if needed
  created_at: number; // Assuming this is a Unix timestamp
}

// agent.interface.ts
export interface AgentCategoryI {
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
  clubConnections?: string;
  experience?: string;
}


// agent.interface.ts
export interface AgentsearchByRegexI {
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
}

// user.interface.ts
export interface UserByIdI{
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
  wallet: number;
}


// booking.interface.ts
export interface BookingI{
  _id: string;
  slotId: string;
  agentId: {
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
  };
  userId: string;
  time: string;
  date: Date;
  status: string;
  paymentId: string;
  bookingamount: string;
  __v: number;
}


// booking.interface.ts
export interface BookingCancelI {
  _id: string; // Assuming _id is of type string
  slotId: string; // Assuming slotId is of type string
  agentId: string; // Assuming agentId is of type string
  userId: string; // Assuming userId is of type string
  time: string;
  date: Date;
  status: string;
  paymentId: string;
  bookingamount: string;
  __v: number;
}


// user.interface.ts
export interface EditedUserI {
  _id: string; // Assuming _id is of type string
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
  wallet: number;
}

// transaction.interface.ts
export interface Transaction {
  _id: string; // Assuming _id is of type string
  userId: string; // Assuming userId is of type string
  agentId: TransationAgent | null;
  paidamount?: string; // Assuming paidamount is optional and of type string
  refundamount?: string; // Assuming refundamount is optional and of type string
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface TransationAgent {
  _id: string; // Assuming _id is of type string
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
