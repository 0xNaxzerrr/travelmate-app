import { Router } from 'express';
import { TripController } from '../controllers/TripController';
import { verifyToken } from '../middleware/auth';
import { validateTripCreation } from '../middleware/validation';

const router = Router();
const tripController = new TripController();

/**
 * @swagger
 * /api/trips:
 *   post:
 *     tags: [Trips]
 *     summary: Create a new trip
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country
 *               - duration
 *             properties:
 *               country:
 *                 type: string
 *               duration:
 *                 type: number
 *     responses:
 *       201:
 *         description: Trip created successfully
 */
router.post('/', verifyToken, validateTripCreation, tripController.planTrip);

/**
 * @swagger
 * /api/trips/{tripId}/photos:
 *   post:
 *     tags: [Trips]
 *     summary: Add a photo to a trip
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - base64Image
 *               - location
 *             properties:
 *               base64Image:
 *                 type: string
 *               caption:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *     responses:
 *       200:
 *         description: Photo added successfully
 */
router.post('/:tripId/photos', verifyToken, tripController.addPhoto);

/**
 * @swagger
 * /api/trips/{tripId}/share:
 *   post:
 *     tags: [Trips]
 *     summary: Share a trip
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trip shared successfully
 */
router.post('/:tripId/share', verifyToken, tripController.shareTrip);

/**
 * @swagger
 * /api/trips/shared/{shareableLink}:
 *   get:
 *     tags: [Trips]
 *     summary: Get a shared trip
 *     parameters:
 *       - in: path
 *         name: shareableLink
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trip details
 */
router.get('/shared/:shareableLink', tripController.getSharedTrip);

export default router;