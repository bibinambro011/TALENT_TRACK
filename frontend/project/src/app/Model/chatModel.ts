export interface allMessage {
    _id: string;
    sender: {
        _id: string;
        email: string;
    };
    content: string;
    chat: {
        _id: string;
        chatName: string;
        users: string;
        agent: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        latestMessage: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface User {
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
    wallet: number; // assuming this property exists for all users
  }
  
  interface Message {
    _id: string;
    sender: string; // ObjectId of the sender
    content: string;
    chat: string; // ObjectId of the chat
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Chat {
    _id: string;
    chatName: string;
    users: User;
    agent: string; // ObjectId of the agent
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    latestMessage: Message;
  }
  
  // Example usage:
 
  
  // Now you can use `chats` array with the defined interface to access its properties.
  
  export interface agentSendMessageI {
    _id: string;
    content: string;
    chat: {
      _id: string;
      chatName: string;
      users: string;
      agent: {
        _id: string;
        firstName: string;
        email: string;
        image: string;
      };
      createdAt: Date;
      updatedAt: Date;
      __v: number;
      latestMessage: string;
    };
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }

  //
  // message.interface.ts
export interface usersendMessage {
    sender: userSendMessagesSender;
    content: string;
    chat: usersendMessageChat;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  
  export interface userSendMessagesSender {
    _id: string;
    firstName: string;
    image: string;
  }
  
  export interface usersendMessageChat {
    _id: string;
    chatName: string;
    users: {
      _id: string;
      email: string;
    };
    agent: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    latestMessage: string;
  }
  

  // 
  // chat.interface.ts
export interface UserAccessChatI {
    _id: string;
    chatName: string;
    users: UserAccesChatUser;
    agent: UserAccessChatAgentI;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    latestMessage: UserAccessChatMessage;
  }
  
  export interface UserAccesChatUser {
    wallet: number;
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
  
  export interface UserAccessChatAgentI {
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
  
  export interface UserAccessChatMessage {
    _id: string;
    sender: string;
    content: string;
    chat: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  


  ////
  // chat.interface.ts
export interface FullChatI {
    _id: string;
    chatName: string;
    users: FullChatUser;
    agent: FullChatAgentI;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    latestMessage: FullChatLatestMessageI;
  }
  
  export interface FullChatUser {
    wallet: number;
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
  
  export interface FullChatAgentI {
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
  
  export interface FullChatLatestMessageI {
    _id: string;
    sender: string;
    content: string;
    chat: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  