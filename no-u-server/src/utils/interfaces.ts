export interface User {
  id: String;
  name: String;
  avatar: String;
};

export interface roomData {
  id: string;
  leader: String;
  gameType: number;
  players: User[];
  ready: number;
  started: boolean;
};

export interface roomStorage {
  id: roomData
};