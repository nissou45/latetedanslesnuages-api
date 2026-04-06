import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { RdvService } from './rdv.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import type { RequestWithUser } from '../types/express';

class CreateRdvDto {
  prestation: string;
  date: string;
  prix: string;
}

@Controller('rdv')
@UseGuards(JwtAuthGuard)
export class RdvController {
  constructor(private rdvService: RdvService) {}

  @Post()
  create(@Request() req: RequestWithUser, @Body() body: CreateRdvDto) {
    return this.rdvService.create(
      req.user.userId,
      body.prestation,
      body.date,
      body.prix,
    );
  }

  @Get()
  findByUser(@Request() req: RequestWithUser) {
    return this.rdvService.findByUser(req.user.userId);
  }

  @Patch(':rdvId/statut')
  updateStatut(@Param('rdvId') rdvId: string, @Body('statut') statut: string) {
    return this.rdvService.updateStatut(rdvId, statut);
  }

  @Delete(':rdvId')
  delete(@Param('rdvId') rdvId: string) {
    return this.rdvService.delete(rdvId);
  }
}
