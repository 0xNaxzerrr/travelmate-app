import { Trip, TripDocument } from '../models/Trip';
import { ITrip, IPhoto } from '../interfaces/ITrip';
import { Types } from 'mongoose';

export class TripRepository {
  async findById(id: string): Promise<TripDocument | null> {
    return Trip.findById(id);
  }

  async findByUser(userId: string): Promise<TripDocument[]> {
    return Trip.find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 });
  }

  async create(data: Partial<ITrip>): Promise<TripDocument> {
    return Trip.create(data);
  }

  async update(id: string, data: Partial<ITrip>): Promise<TripDocument | null> {
    return Trip.findByIdAndUpdate(id, data, { new: true });
  }

  async addPhoto(tripId: string, photo: IPhoto): Promise<TripDocument | null> {
    return Trip.findByIdAndUpdate(
      tripId,
      { $push: { photos: photo } },
      { new: true }
    );
  }

  async findSharedTrip(shareableLink: string): Promise<TripDocument | null> {
    return Trip.findOne({ shareableLink, isPublic: true }).populate('userId', 'name');
  }

  async updateStatus(
    tripId: string,
    status: 'planned' | 'ongoing' | 'completed'
  ): Promise<TripDocument | null> {
    return Trip.findByIdAndUpdate(
      tripId,
      { $set: { status } },
      { new: true }
    );
  }
}