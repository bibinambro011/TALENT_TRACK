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