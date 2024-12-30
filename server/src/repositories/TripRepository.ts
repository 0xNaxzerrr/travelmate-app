import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';
import { IPhoto } from '../interfaces/ITrip';

export class TripRepository {
  async findById(id: string) {
    return prisma.trip.findUnique({
      where: { id }
    });
  }

  async findByUser(userId: string) {
    return prisma.trip.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(data: Prisma.TripCreateInput) {
    return prisma.trip.create({ data });
  }

  async addPhoto(tripId: string, photo: IPhoto) {
    return prisma.trip.update({
      where: { id: tripId },
      data: {
        photos: {
          push: photo
        }
      }
    });
  }

  async findSharedTrip(shareableLink: string) {
    return prisma.trip.findUnique({
      where: { 
        shareableLink,
        isPublic: true
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });
  }

  async updateStatus(
    tripId: string,
    status: 'PLANNED' | 'ONGOING' | 'COMPLETED'
  ) {
    return prisma.trip.update({
      where: { id: tripId },
      data: { status }
    });
  }
}