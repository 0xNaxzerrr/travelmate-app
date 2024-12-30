import { Repository } from 'typeorm';
import { Trip } from '../entities/Trip';
import { BaseRepository } from './BaseRepository';
import { IPhoto } from '../interfaces/ITrip';

export class TripRepository extends BaseRepository<Trip> {
  constructor() {
    super(Trip);
  }

  async findByUser(userId: string): Promise<Trip[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' }
    });
  }

  async findSharedTrip(shareableLink: string): Promise<Trip | null> {
    return this.repository.findOne({
      where: { shareableLink, isPublic: true },
      relations: ['user']
    });
  }

  async addPhoto(tripId: string, photo: IPhoto): Promise<Trip | null> {
    const trip = await this.findById(tripId);
    if (!trip) return null;

    trip.photos = [...trip.photos, photo];
    return this.repository.save(trip);
  }

  async updateStatus(
    tripId: string,
    status: 'planned' | 'ongoing' | 'completed'
  ): Promise<Trip | null> {
    const trip = await this.findById(tripId);
    if (!trip) return null;

    trip.status = status;
    return this.repository.save(trip);
  }
}