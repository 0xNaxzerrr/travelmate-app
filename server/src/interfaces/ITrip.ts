import { ICity, ICoordinates } from './ILocation';

export interface IPhoto {
  url: string;
  caption?: string;
  location: ICoordinates;
  takenAt: Date;
}

export interface IEquipment {
  item: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ITrip {
  id: string;
  userId: string;
  destination: {
    country: string;
    cities: ICity[];
  };
  startDate: Date;
  endDate: Date;
  duration: number;
  status: 'planned' | 'ongoing' | 'completed';
  photos: IPhoto[];
  recommendations: {
    equipment: IEquipment[];
  };
  shareableLink?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}