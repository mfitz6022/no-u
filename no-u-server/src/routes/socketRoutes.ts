import Socket from 'socket.io';
import { nanoid } from 'nanoid';
import { User, roomData, roomStorage } from '../utils/interfaces';

const createRoom = (leader: User) => {
  const generateId = nanoid();
  const roomData: roomData =  {
    id: generateId,
    leader: leader.name,
    gameType: 0,
    players: [leader],
    ready: 0,
    started: false
  };

  return roomData;
};

const roomStorage: roomStorage | {} = {};

export const socketRouter = async (socket) => {
  console.log(`user has connected to the socket channel with ID: ${socket.id}`);

  socket.on('join_new_solo_room', (userData: User) => {
    const newRoom = createRoom(userData);
    roomStorage[newRoom.id] = newRoom;
    const currentRoom = roomStorage[newRoom.id]

    socket.join(currentRoom.id);
    socket.to(currentRoom.id).emit('receive_room_data', currentRoom);
  });

  socket.on('join_existing_solo_room', (userData: User, roomData: roomData) => {
    const { id } = roomData;
    const currentRoom: roomData = roomStorage[id]
    currentRoom.players.push(userData);

    socket.join(currentRoom.id);
    socket.to(currentRoom.id).emit('receive_players', currentRoom.players)
  });

  socket.on('disconnect', (reason, details) => {
    console.log(`reason: ${reason}\ndetails: ${details}`)
  });

};

