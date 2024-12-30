import { TripRepository } from '../repositories/TripRepository';
import { OpenAIService } from './OpenAIService';
import { StorageService } from './StorageService';
import { ITrip, IPhoto } from '../interfaces/ITrip';
import { NotFoundException } from '../exceptions/NotFoundException';
import { ForbiddenException } from '../exceptions/ForbiddenException';

export class TripService {
  constructor(
    private tripRepository: TripRepository,
    private openAIService: OpenAIService,
    private storageService: StorageService
  ) {}

  async planTrip(userId: string, country: string, duration: number): Promise<ITrip> {
    const suggestion = await this.openAIService.generateItinerary(country, duration);
    
    const trip = await this.tripRepository.create({
      userId,
      destination: {
        country,
        cities: suggestion.cities
      },
      duration,
      recommendations: suggestion.recommendations,
      startDate: new Date(),
      endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
    });

    return trip;
  }

  async addPhoto(userId: string, tripId: string, photoData: {
    base64Image: string;
    caption?: string;
    location: { latitude: number; longitude: number };
  }): Promise<ITrip> {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.userId !== userId) throw new ForbiddenException('Not authorized');

    const photoUrl = await this.storageService.uploadPhoto(
      photoData.base64Image,
      tripId
    );

    const photo: IPhoto = {
      url: photoUrl,
      caption: photoData.caption,
      location: photoData.location,
      takenAt: new Date()
    };

    return this.tripRepository.addPhoto(tripId, photo);
  }

  async shareTrip(userId: string, tripId: string): Promise<string> {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.userId !== userId) throw new ForbiddenException('Not authorized');

    trip.isPublic = true;
    if (!trip.shareableLink) {
      trip.shareableLink = `${tripId}-${Math.random().toString(36).substr(2, 9)}`;
    }

    await this.tripRepository.update(tripId, {
      isPublic: true,
      shareableLink: trip.shareableLink
    });

    return trip.shareableLink;
  }

  async getSharedTrip(shareableLink: string): Promise<ITrip> {
    const trip = await this.tripRepository.findSharedTrip(shareableLink);
    if (!trip || !trip.isPublic) {
      throw new NotFoundException('Trip not found');
    }
    return trip;
  }
}