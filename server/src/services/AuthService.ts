import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { UserRepository } from '../repositories/UserRepository';
import { ILoginCredentials, IRegistrationData, IUser } from '../interfaces/IUser';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '../config';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(data: IRegistrationData): Promise<{ user: IUser; token: string }> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = await this.userRepository.createUser(data);
    const token = this.generateToken(user.id);

    return { user, token };
  }

  async login(credentials: ILoginCredentials): Promise<{ user: IUser; token: string }> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user.id);

    return { user, token };
  }

  private generateToken(userId: string): string {
    return sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });
  }
}