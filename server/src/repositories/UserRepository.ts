import { User, UserDocument } from '../models/User';
import { IRegistrationData } from '../interfaces/IUser';
import { hash } from 'bcrypt';
import { Types } from 'mongoose';

export class UserRepository {
  async findById(id: string): Promise<UserDocument | null> {
    return User.findById(id).select('-password');
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email });
  }

  async createUser(data: IRegistrationData): Promise<UserDocument> {
    const hashedPassword = await hash(data.password, 10);
    return User.create({
      ...data,
      password: hashedPassword
    });
  }

  async findWithTrips(userId: string): Promise<UserDocument | null> {
    return User.findById(userId)
      .populate('trips')
      .select('-password');
  }

  async addTripToUser(userId: string, tripId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      $push: { trips: new Types.ObjectId(tripId) }
    });
  }
}