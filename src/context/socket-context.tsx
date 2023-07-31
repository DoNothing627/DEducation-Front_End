import io, { Socket } from "socket.io-client";
import { getAccessToken } from "@app/services/auth";
import { SOCKET_END_POINT } from "@app/const/common.const";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { EVENTS, MessageType } from "@app/const/socket-events.const";
import { SocketContext } from "./socket";
import { useSession } from "@app/hooks/session";

export interface UserMetadata {
  user_id: string;
  value: string;
}

export interface VoteGameOpt {
  text: string;
  votePercent: number;
  selected: boolean;
}

export interface VoteGameModel {
  content: string;
  options: VoteGameOpt[];
}

function SocketsProvider(props: any) {
  const { userInfo } = useSession();
  const [username, setUsername] = useState("");
  // const [firstConnect, setFirstConnect] = useState(false);
  const [avatar] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [messages, setMessages] = useState([] as any[]);
  const [connected, setConnected] = useState(false);
  const [ableToChat, setAbleToChat] = useState(true);
  const [activePin, setActivePin] = useState(false);
  const [pinMessage, setPinMessage] = useState("");
  const [activeVote, setActiveVote] = useState(false);
  const [allowToVote, setAllowToVote] = useState(false);
  const [voteVisible, setVoteVisible] = useState(false);
  const [voteInfo, setVoteInfo] = useState<VoteGameModel | null>(null);
  const voteInfoRef = useRef<VoteGameModel | null>(null);
  const [connectCounter, setConnectCounter] = useState(0);
  const reconnectCounter = useRef(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatInfo, setChatInfo] = useState<any>({});
  const [voted, setVoted] = useState<any>(false);
  const [manualDisconnect, setManualDisconnect] = useState(false);

  useEffect(() => {
    voteInfoRef.current = voteInfo;
  }, [voteInfo]);

  useEffect(() => {
    reconnectCounter.current = connectCounter;
  }, [connectCounter]);

  const joinRoom = useCallback(
    (roomId: string) => {
      socket?.emit(EVENTS.REGISTERED_EVENTS.CLIENT.JOIN_ROOM, { roomId });
    },
    [socket]
  );
  const rejoinRoom = useCallback(
    (roomId: string) => {
      socket?.emit(EVENTS.REGISTERED_EVENTS.CLIENT.REJOIN, { roomId });
    },
    [socket]
  );
  const sendChat = (message: string, data: any = {}) => {
    socket?.emit(EVENTS.REGISTERED_EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
      roomId,
      message,
      username: userInfo?.username,
      ...data,
    });
  };
  const sendCommand = (command: string) => {
    socket?.emit(EVENTS.REGISTERED_EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
      roomId,
      message: command,
    });
  };
  const handleMessageUpdate = useCallback((data: any) => {
    if (!document.hasFocus()) {
      // document.title = "New message...";
    }

    setMessages((messages: any[]) => [
      ...messages,
      {
        avatar: data.avatar,
        badge: data.badge,
        id: data.id,
        message: data.message,
        message_type: data.message_type,
        mask_type: data.mask_type,
        time: data.time,
        user_type: data.user_type,
        username: data.username,
        nonce: data.nonce,
      },
    ]);
  }, []);
  const handleHistoryMessage = useCallback((data: any[]) => {
    setMessages((messages: any[]) => [...data, ...messages]);
  }, []);
  const handleJoinedRoom = useCallback((value: any) => {
    setRooms(value);
    setJoinedRoom(true);
  }, []);

  const handleJoined = useCallback(
    (value: any) => {
      if (!joinedRoom) {
        setConnected(true);
        setRoomId(value);
        setJoinedRoom(true);
      }
    },
    [joinedRoom]
  );

  const handleLeft = useCallback(() => {
    if (connected) {
      setConnected(true);
    }
    setJoinedRoom(false);
    setRoomId("");
  }, [connected]);

  const handleReconnect = useCallback(() => {
    if (
      socket &&
      !socket.connected &&
      reconnectCounter.current < 5 &&
      !manualDisconnect
    ) {
      setConnectCounter((counter) => counter + 1);
      setTimeout(() => {
        socket.connect();
        if (!joinedRoom) {
          rejoinRoom(roomId);
        }
      }, 3000);
    }
  }, [manualDisconnect, reconnectCounter, socket, roomId]);

  const handleDisconnect = useCallback(
    (reason: any) => {
      setConnected(false);
      setJoinedRoom(false);
      handleReconnect();
      console.debug(`connection disconnected:`, reason);
    },
    [handleReconnect]
  );

  const handleConnectError = useCallback(
    (err: any) => {
      console.debug(`connection error:`, err);
      // setConnectCounter(counter => counter + 1);

      setConnected(false);
      if (socket && !manualDisconnect) {
        handleReconnect();
        setJoinedRoom(false);
      }
    },
    [handleReconnect, manualDisconnect, socket]
  );

  const handleOnReconnect = useCallback(() => {
    console.debug(`reconnect`);
  }, []);

  // const handleUserBan = useCallback(
  //   ({ message, user_id, ban, reason }: any) => {
  //     let ban_message = message;
  //     if (user_id === userInfo?.user_id) {
  //       if (ban) {
  //         ban_message = `You got banned from chat with reason: ${reason}.`;
  //       } else {
  //         ban_message = `You got unbanned from chat`;
  //       }
  //       setAbleToChat(!ban);
  //     }
  //     const data = [
  //       {
  //         id: "ERROR",
  //         message_type: MessageType.SYSTEM,
  //         message: ban_message,
  //       },
  //     ];
  //     setMessages((messages: any[]) => [...messages, ...data]);
  //   },
  //   [userInfo?.user_id]
  // );
  const handleInvalidChannel = useCallback(() => {
    const data = [
      {
        id: "ERROR",
        message_type: MessageType.SYSTEM,
        message: `Invalid channel`,
      },
    ];
    setMessages((messages: any[]) => [...messages, ...data]);
    setAbleToChat(false);
  }, []);

  const handleInvalidCommand = useCallback(({ message }: any) => {
    const command = message.split(" ");
    const data = [
      {
        id: "ERROR",
        message_type: MessageType.SYSTEM,
        message: `Invalid command: ${command[0]}`,
      },
    ];
    setMessages((messages: any[]) => [...messages, ...data]);
  }, []);

  const handleInsufficientPermission = useCallback(({ message }: any) => {
    const data = [
      {
        id: "ERROR",
        message_type: MessageType.SYSTEM,
        message: message,
      },
    ];
    setMessages((messages: any[]) => [...messages, ...data]);
  }, []);

  const handleWinnerAnnounce = useCallback(({ message }: any) => {
    const data = [
      {
        id: "SUCCESS",
        message_type: MessageType.SYSTEM,
        message: message,
      },
    ];
    setMessages((messages: any[]) => [...messages, ...data]);
  }, []);

  const handlePin = useCallback(({ active, message }: any) => {
    setActivePin(active);
    setPinMessage(message ?? "");
  }, []);
  const handleActiveVote = useCallback(
    ({
      active,
      content,
      visible,
      allow_to_vote,
      message,
      options,
      concluded,
    }: any) => {
      setActiveVote(active);
      setAllowToVote(allow_to_vote);
      setVoteVisible(visible);
      const newVoteInfo: VoteGameModel = {
        options,
        content,
      };
      if (!concluded) {
        const userVoteId = options.findIndex((x: any) => x.selected) ?? -1;
        setVoted(userVoteId !== -1);

        setVoteInfo(newVoteInfo);
      }
      if (message && message.length > 0) {
        const data = [
          {
            id: "INFO",
            message_type: MessageType.SYSTEM,
            message: message,
          },
        ];
        setMessages((messages: any[]) => [...messages, ...data]);
      }
    },
    []
  );
  const handleUpdateVoteResult = useCallback(
    ({ active, content, allow_to_vote, update_only, options }: any) => {
      setActiveVote(active);
      setAllowToVote(allow_to_vote);
      let updateOptions: VoteGameOpt[] = [];
      if (voteInfoRef.current && update_only) {
        for (let i = 0; i < voteInfoRef.current.options.length; i++) {
          const opt = voteInfoRef.current.options[i];
          const newOptResult = options.find((x: any) => x.text === opt.text);
          if (newOptResult) {
            opt.text = newOptResult.text;
            opt.votePercent = newOptResult.votePercent;
          }
          updateOptions.push(opt);
        }
      } else {
        updateOptions = options;
      }

      const newVoteInfo: VoteGameModel = {
        options: updateOptions,
        content,
      };
      setVoteInfo(newVoteInfo);
    },
    [voteInfoRef.current]
  );

  const handleConnect = useCallback(() => {
    setConnectCounter(0);
    setConnected(true);
  }, []);

  const handleChatInfoUpdate = useCallback((data: any) => {
    setChatInfo(data);
  }, []);

  const handleUnableProcess = useCallback(() => {
    setSocket(null);
    setManualDisconnect(true);
    setConnectCounter(0);
  }, []);
  const handleUnauthorized = useCallback(() => {
    setSocket(null);
    setManualDisconnect(true);
    setConnectCounter(0);
  }, []);

  useEffect(() => {
    if (socket && reconnectCounter.current < 3 && !manualDisconnect) {
      if (!socket.connected) {
        socket.connect();
      }

      const updateInterval = setInterval(() => {
        if (socket && socket.connected) {
          socket.emit(EVENTS.PING);
        }
      }, 5000);
      console.debug(`socket reconnecting ...`);
      socket.on(
        EVENTS.REGISTERED_EVENTS.SERVER.CHAT_INFO,
        handleChatInfoUpdate
      );
      socket.on(EVENTS.REGISTERED_EVENTS.SERVER.MESSAGE, handleMessageUpdate);
      socket.on(EVENTS.REGISTERED_EVENTS.SERVER.NOTICE, handleMessageUpdate);
      socket.on(EVENTS.REGISTERED_EVENTS.SERVER.ERROR, handleMessageUpdate);
      socket.on(
        EVENTS.REGISTERED_EVENTS.SERVER.HISTORY_MESSAGES,
        handleHistoryMessage
      );
      // socket.on(EVENTS.REGISTERED_EVENTS.SERVER.USER_BAN, handleUserBan);
      // socket.on(EVENTS.REGISTERED_EVENTS.SERVER.USER_UNBAN, handleUserBan);
      socket.on(
        EVENTS.REGISTERED_EVENTS.SERVER.INVALID_CHANNEL,
        handleInvalidChannel
      );
      socket.on(
        EVENTS.REGISTERED_EVENTS.CLIENT.INVALID_COMMAND,
        handleInvalidCommand
      );
      socket.on(EVENTS.REGISTERED_EVENTS.SERVER.ROOMS, handleJoinedRoom);
      socket.on(EVENTS.REGISTERED_EVENTS.SERVER.JOINED, handleJoined);
      socket.on(EVENTS.REGISTERED_EVENTS.SERVER.CHANNEL_PIN, handlePin);
      socket.on(EVENTS.REGISTERED_EVENTS.SERVER.ACTIVE_VOTE, handleActiveVote);
      socket.on(
        EVENTS.REGISTERED_EVENTS.SERVER.VOTE_RESULT,
        handleUpdateVoteResult
      );
      socket.on(
        EVENTS.REGISTERED_EVENTS.CLIENT.INSUFFICIENT_PERMISSION,
        handleInsufficientPermission
      );
      socket.on(EVENTS.REGISTERED_EVENTS.SERVER.LEFT, handleLeft);
      socket.on(
        EVENTS.REGISTERED_EVENTS.SERVER.WINNER_ANNOUNCE,
        handleWinnerAnnounce
      );
      socket.on(EVENTS.UNABLE_PROCESS, handleUnableProcess);
      socket.on(EVENTS.UNAUTHORIZED, handleUnauthorized);
      socket.on("connect_error", handleConnectError);
      socket.on("disconnect", handleDisconnect);
      socket.on("connect", handleConnect);
      socket.on("reconnect", handleOnReconnect);
      return () => {
        clearInterval(updateInterval);
        if (socket && socket.connected) {
          console.debug(`socket unmounting emit events`);
          socket.emit(EVENTS.REGISTERED_EVENTS.CLIENT.LEAVE_ROOM);
          socket.emit(EVENTS.REGISTERED_EVENTS.CLIENT.DISCONNECT);
        }
        // clear event registrations
        socket.off("connect_error");
        socket.off("disconnect");
        socket.off("connect");
        socket.off("reconnect", handleOnReconnect);
        socket.off(
          EVENTS.REGISTERED_EVENTS.SERVER.MESSAGE,
          handleMessageUpdate
        );
        socket.off(EVENTS.REGISTERED_EVENTS.SERVER.NOTICE, handleMessageUpdate);
        socket.off(EVENTS.REGISTERED_EVENTS.SERVER.ERROR, handleMessageUpdate);
        socket.off(
          EVENTS.REGISTERED_EVENTS.SERVER.HISTORY_MESSAGES,
          handleHistoryMessage
        );
        // socket.off(EVENTS.REGISTERED_EVENTS.SERVER.USER_BAN, handleUserBan);
        socket.off(
          EVENTS.REGISTERED_EVENTS.SERVER.INVALID_CHANNEL,
          handleInvalidChannel
        );
        socket.off(
          EVENTS.REGISTERED_EVENTS.CLIENT.INVALID_COMMAND,
          handleInvalidCommand
        );
        socket.off(
          EVENTS.REGISTERED_EVENTS.CLIENT.INSUFFICIENT_PERMISSION,
          handleInsufficientPermission
        );
        socket.off(EVENTS.REGISTERED_EVENTS.SERVER.ROOMS, handleJoinedRoom);
        socket.off(EVENTS.REGISTERED_EVENTS.SERVER.JOINED, handleJoined);
        socket.off(EVENTS.REGISTERED_EVENTS.SERVER.CHANNEL_PIN, handlePin);
        socket.off(
          EVENTS.REGISTERED_EVENTS.SERVER.ACTIVE_VOTE,
          handleActiveVote
        );
        socket.off(
          EVENTS.REGISTERED_EVENTS.SERVER.VOTE_RESULT,
          handleUpdateVoteResult
        );
        socket.off(EVENTS.REGISTERED_EVENTS.SERVER.LEFT, handleLeft);
        socket.off(
          EVENTS.REGISTERED_EVENTS.SERVER.WINNER_ANNOUNCE,
          handleWinnerAnnounce
        );
        socket.off(EVENTS.UNAUTHORIZED, handleUnauthorized);
        socket.disconnect();
        setSocket(null);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (!socket && reconnectCounter.current < 3 && !manualDisconnect) {
      // setFirstConnect(true);
      const socketInstance = io(SOCKET_END_POINT, {
        reconnection: false,
        withCredentials: true,
        transports: ["websocket"],
        secure: true,
        auth: {
          token: getAccessToken() ?? "GUEST:GUEST",
        },
      });
      setSocket(socketInstance);
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        avatar,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
        ableToChat,
        activePin,
        pinMessage,
        connected,
        joinedRoom,
        reconnectCounter: connectCounter,
        activeVote,
        voteInfo,
        allowToVote,
        voteVisible,
        joinRoom,
        sendChat,
        sendCommand,
        chatInfo,
        voted,
        setVoted,
      }}
      {...props}
    />
  );
}

export default SocketsProvider;

export const useSockets = () => useContext(SocketContext);
