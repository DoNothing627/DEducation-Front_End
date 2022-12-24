export const EVENTS = {
  CONNECT: 'connection',
  DISCONNECT: 'disconnect',
  UNAUTHORIZED: 'UNAUTHORIZED',
  UNABLE_PROCESS: 'UNABLE_PROCESS',
  UNKNOWN_CHANNEL: 'UNKNOWN_CHANNEL',
  PING: 'ping',
  REGISTERED_EVENTS: {
    TEST: 'TEST',
    SERVER: {
      ROOMS: 'SERVER.ROOMS',
      NOTICE: 'SERVER.NOTICE',
      ERROR: 'SERVER.ERROR',
      WARNING: 'SERVER.WARNING',
      INVALID_CHANNEL: 'SERVER.INVALID_CHANNEL',
      JOINED: 'SERVER.ROOM_JOINED',
      HISTORY_MESSAGES: 'SERVER.HISTORY_MESSAGES',
      ACTIVE_VOTE: 'SERVER.ACTIVE_VOTE',
      VOTE_RESULT: 'SERVER.VOTE_RESULT',
      CHANNEL_PIN: 'SERVER.CHANNEL_PIN',
      LEFT: 'SERVER.ROOM_LEFT',
      MESSAGE: 'SERVER.ROOM_MESSAGE',
      MESSAGE_DELETED: 'SERVER.MESSAGE_DELETED',
      USER_BAN: 'SERVER.USER_BAN',
      USER_UNBAN: 'SERVER.USER_UNBAN',
      CHAT_INFO: "SERVER.CHAT_INFO",
      WINNER_ANNOUNCE: "SERVER.WINNER_ANNOUNCE",
    },
    CLIENT: {
      CHAT_INFO: "CLIENT.CHAT_INFO",
      SEND_ROOM_MESSAGE: 'CLIENT.CHAT',
      INSUFFICIENT_PERMISSION: 'CLIENT.INSUFFICIENT_PERMISSION',
      INVALID_COMMAND: 'CLIENT.INVALID_COMMAND',
      JOIN_ROOM: 'CLIENT.JOIN_ROOM',
      REJOIN: 'CLIENT.REJOIN',
      LEAVE_ROOM: 'CLIENT.LEAVE_ROOM',
      REMOVE_MESSAGE: 'CLIENT.REMOVE_MESSAGE',
      MESSAGE_DELETED: 'CLIENT.MESSAGE_DELETED',
      USER_BAN: 'CLIENT.USER_BAN',
      USER_UNBAN: 'CLIENT.USER_UNBAN',
      DISCONNECT: 'CLIENT.DISCONNECT',
    },
  },
  TOURNAMENT: {
    /** Scanning after registration for on-chain tournament(has fee). */
    REGISTER_SCAN: 'tournament.team.reg.fee',
  },
};

export enum MessageType {
  Message,
  Command,
  EmoteOnly,
  Announce,
  SYSTEM,
  Mask
}


export enum UserBadge {
  ADMIN = 'A',
  MODERATOR = 'M',
  ONCHAIN_USER = 'O',
  NORMAL_USER = 'N',
}

export enum ProfileWalletSocketAction {
  FINISHED_TOUR = 'user.tournament.claim',
  REFUND = 'user.tournament.claim_refund',
}

export interface SocketMsg {
  action: string,
  data: any,
}
