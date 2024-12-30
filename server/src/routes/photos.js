const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const photoController = require('../controllers/photoController');
const { validatePhotoUpload } = require('../middleware/validation');

/**
 * @swagger
 * /api/trips/{tripId}/photos:
 *   post:
 *     tags: [Photos]
 *     summary: Upload une nouvelle photo pour un voyage
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
 *       201:
 *         description: Photo ajoutée avec succès
 */
router.post('/:tripId/photos', 
  verifyToken,
  validatePhotoUpload,
  photoController.uploadPhoto
);

/**
 * @swagger
 * /api/trips/{tripId}/photos/{photoId}:
 *   delete:
 *     tags: [Photos]
 *     summary: Supprime une photo d'un voyage
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Photo supprimée avec succès
 */
router.delete('/:tripId/photos/:photoId',
  verifyToken,
  photoController.deletePhoto
);

/**
 * @swagger
 * /api/trips/{tripId}/photos:
 *   get:
 *     tags: [Photos]
 *     summary: Récupère toutes les photos d'un voyage
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
 *         description: Liste des photos récupérée avec succès
 */
router.get('/:tripId/photos',
  verifyToken,
  photoController.getTripPhotos
);

module.exports = router;