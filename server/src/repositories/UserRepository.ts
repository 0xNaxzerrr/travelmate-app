import { prisma } from '../lib/prisma';
import { IRegistrationData } from '../interfaces/IUser';
import { hash } from 'bcrypt';

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async createUser(data: IRegistrationData) {
    const hashedPassword = await hash(data.password, 10);
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword
      }
    });
  }

  async findWithTrips(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        trips: true
      },
      select: {
        id: true,
        email: true,
        name: true,
        trips: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
}