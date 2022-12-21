import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { connection } from '../configs/mongo.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    MongooseModule.forRoot(
      connection,
      //   {
      //   useCreateIndex: true,
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
