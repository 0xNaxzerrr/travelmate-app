import { User } from '../entities/User';
import { BaseRepository } from './BaseRepository';
import { IRegistrationData } from '../interfaces/IUser';
import { hash } from 'bcrypt';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async createUser(data: IRegistrationData): Promise<User> {
    const hashedPassword = await hash(data.password, 10);
    return this.create({
      ...data,
      password: hashedPassword
    });
  }

  async findWithTrips(userId: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id: userId },
      relations: ['trips']
    });
  }
}