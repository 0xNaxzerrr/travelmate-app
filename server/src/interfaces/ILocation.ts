export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface ICity {
  name: string;
  country: string;
  coordinates: ICoordinates;
  duration: number;
  activities: string[];
}