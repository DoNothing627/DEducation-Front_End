import { createContext } from "react";
import { MessageType } from "@app/const/socket-events.const";
import { Socket } from "socket.io-client";

interface MessageContent {
  avatar?: string;
  badge?: string;
  id?: string;
  message?: string;
  message_type?: MessageType;
  time?: string;
  user_type?: string;
  username?: string;
}

interface Context {
  socket: Socket | null;
  username?: string;
  avatar?: string;
  setUsername: () => any;
  messages: MessageContent[];
  setMessages: (messsages: MessageContent[]) => any;
  joinRoom: (roomId: string) => any;
  sendChat: (message: any, data?: any) => any;
  sendCommand: (command: any) => any;
  roomId?: string;
  rooms: object;
  ableToChat: boolean;
  activePin: boolean;
  pinMessage: string;
  connected: boolean;
  joinedRoom: boolean;
  reconnectCounter: number;
  activeVote: boolean;
  allowToVote: boolean;
  voteVisible: boolean;
  chatInfo: any;
  firstConnect: boolean;
  voted: boolean;
  setVoted: (isVoted: boolean) => any;
}

export const SocketContext = createContext<Context>({
  socket: null,
  setUsername: () => false,
  setMessages: () => false,
  joinRoom: () => false,
  sendChat: () => false,
  sendCommand: () => false,
  rooms: {},
  messages: [],
  ableToChat: true,
  activePin: false,
  pinMessage: "",
  connected: false,
  joinedRoom: false,
  reconnectCounter: 0,
  activeVote: false,
  voteVisible: false,
  allowToVote: false,
  chatInfo: {},
  firstConnect: false,
  voted: false,
  setVoted: () => false,
});
