import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

class InscriptionDto {
  nom: string;
  email: string;
  password: string;
}

class ConnexionDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('inscription')
  inscription(@Body() body: InscriptionDto) {
    return this.authService.inscription(body.nom, body.email, body.password);
  }

  @Post('connexion')
  connexion(@Body() body: ConnexionDto) {
    return this.authService.connexion(body.email, body.password);
  }
}
