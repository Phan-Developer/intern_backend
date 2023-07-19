import { Controller } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: [process.env.CLIENT_HOST.split(', ')],
    allowedHeaders: [],
    credentials: true,
  },
})
@WebSocketGateway()
export class WebsocketController
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly websocketService: WebsocketService) {}
  @WebSocketServer() server: Server;

  async handleDisconnect(client: any) {
    // const socket = await this.socketService.findBySocketId(client.id);
    // if (socket) {
    //   this.emitOffline(socket);
    //   await this.socketService.disconnect(client.id);
    // }

    console.log('client disconnect: ', client.id);
  }

  async handleConnection(client: any, ...args: any[]) {
    this.server.to(client.id).emit('join', client.id);
    console.log('client connect: ', client.id);
  }

  afterInit(server: Server) {
    const adapter = server.sockets.adapter;

    adapter.on('create-room', async (room: string) => {
      // if (room.startsWith('app-')) {
      //   await this.deviceTbService.updateOnline(room.split('-')[1], true);
      //   //emit cho tất cả các client trong room
      //   server
      //     .to('web-85b78d7d-f2f2-ed11-a213-a8a159e2a647')
      //     .emit('device-online', { Imei: room.split('-')[1] });
      //   //
      // }
    });

    adapter.on('delete-room', async (room: string) => {
      // if (room.startsWith('app-')) {
      //   await this.deviceTbService.updateOnline(room.split('-')[1], false);
      //   server
      //     .to('web-85b78d7d-f2f2-ed11-a213-a8a159e2a647')
      //     .emit('device-offline', { Imei: room.split('-')[1] });
      // }
    });
  }

  @SubscribeMessage('join-app')
  async handleEventJoinAppByUser(
    @MessageBody() data: { Imei: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join('app-' + data.Imei);
    // const socketData = await this.socketService.connect(data);
    console.log('App===================================', data);
    //gửi dữ liệu vào room 123
    // client
    //   .to('85b78d7d-f2f2-ed11-a213-a8a159e2a647')
    //   .emit('device-online', { Imei: data.Imei });
  }

  @SubscribeMessage('join-web')
  async handleEventJoinByUser(
    @MessageBody() data: { UserId: string },
    @ConnectedSocket() client: any,
  ) {
    client.join('web-' + data.UserId);
    // const socketData = await this.socketService.connect(data);
    console.log('Web===================================', data);
    // this.emitOnline(socketData);
  }

  @SubscribeMessage('create-room')
  handleCreateRoom(client: Socket, @MessageBody() roomName: string): void {
    console.log('cOME HERE');
  }
}
