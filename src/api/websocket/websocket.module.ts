import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketController } from './websocket.gateway';

@Module({
  imports: [],
  providers: [WebsocketService, WebsocketController],
  exports: [WebsocketService],
})
export class WebsocketModule {}
