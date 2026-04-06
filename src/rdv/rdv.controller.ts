import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { RdvService } from './rdv.service';

class CreateRdvDto {
  userId: string;
  prestation: string;
  date: string;
  prix: string;
}

@Controller('rdv')
export class RdvController {
  constructor(private rdvService: RdvService) {}

  @Post()
  create(@Body() body: CreateRdvDto) {
    return this.rdvService.create(
      body.userId,
      body.prestation,
      body.date,
      body.prix,
    );
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: string) {
    return this.rdvService.findByUser(userId);
  }

  @Patch(':rdvId/statut')
  updateStatut(@Param('rdvId') rdvId: string, @Body('statut') statut: string) {
    return this.rdvService.updateStatut(rdvId, statut);
  }
}
