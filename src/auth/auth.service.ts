import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async inscription(nom: string, email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(nom, email, hashedPassword);
    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { token, user: { nom: user.nom, email: user.email } };
  }

  async connexion(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { token, user: { nom: user.nom, email: user.email } };
  }
}
