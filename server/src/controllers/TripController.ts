import { Request, Response, NextFunction } from 'express';
import { TripService } from '../services/TripService';
import { AuthRequest } from '../interfaces/AuthRequest';

export class TripController {
  constructor(private tripService: TripService) {}

  planTrip = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { country, duration } = req.body;
      const trip = await this.tripService.planTrip(
        req.user.id,
        country,
        duration
      );
      res.status(201).json(trip);
    } catch (error) {
      next(error);
    }
  };

  addPhoto = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { tripId } = req.params;
      const { base64Image, caption, location } = req.body;
      
      const updatedTrip = await this.tripService.addPhoto(
        req.user.id,
        tripId,
        { base64Image, caption, location }
      );
      
      res.json(updatedTrip);
    } catch (error) {
      next(error);
    }
  };

  shareTrip = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { tripId } = req.params;
      const shareableLink = await this.tripService.shareTrip(req.user.id, tripId);
      
      res.json({ shareableLink });
    } catch (error) {
      next(error);
    }
  };

  getSharedTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { shareableLink } = req.params;
      const trip = await this.tripService.getSharedTrip(shareableLink);
      
      res.json(trip);
    } catch (error) {
      next(error);
    }
  };
}