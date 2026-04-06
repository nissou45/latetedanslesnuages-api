import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RdvService } from './rdv.service';
import { RdvController } from './rdv.controller';
import { Rdv, RdvSchema } from './schemas/rdv.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Rdv.name, schema: RdvSchema }])],
  providers: [RdvService],
  controllers: [RdvController],
})
export class RdvModule {}
