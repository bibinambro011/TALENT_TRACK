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
export interface successresponsedata{
usertoken:string
userdetails:logsuccess
}
export interface logsuccess {
  id: string;
  name: string;
  email: string;
  role: string;
  image:string,
  category: string;
}

export interface stateinterface {
  id: string;
  firstName: string;
  email: string;
  image: string;
  role: string;
}
