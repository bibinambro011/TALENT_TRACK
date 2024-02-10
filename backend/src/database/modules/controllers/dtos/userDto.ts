export interface UserDto {
    firstName: string;
    lastName: string;
    email: string;
    password:string;
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
  export interface userlog{
    email:string;
    password:string
  }
  