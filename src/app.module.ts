import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ServiceModule } from './service/service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GLOBAL } from './utils/variable';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ApiModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: GLOBAL.G_DB_HOST,
      port: GLOBAL.G_DB_PORT,
      username: GLOBAL.G_DB_USERNAME,
      password: GLOBAL.G_DB_PASSWORD,
      database: GLOBAL.G_DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      extra: {
        trustServerCertificate: true,
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/',
    }),
    ScheduleModule.forRoot(),
    ServiceModule,
  ],
})
export class AppModule {}
