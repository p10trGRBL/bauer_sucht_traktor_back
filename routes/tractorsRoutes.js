import express from 'express';
import * as tractorController from '../controllers/tractor.js';
import verifyToken from '../middleware/verifyToken.js';



const tractorsRouter = express.Router();
tractorsRouter
.route('/')
.get(tractorController.getAllTractors)
.post(verifyToken, tractorController.addNewTractor);

tractorsRouter
.route('/:id')
.get(tractorController.getTractorById)
.put(verifyToken, tractorController.updateTractor)
.delete(verifyToken, tractorController.deleteTractor);

tractorsRouter.route('/:id/addTag').patch(verifyToken, tractorController.addTagToTractor);
tractorsRouter.route('/:id/addExtra').patch(verifyToken, tractorController.addExtraToTractor);

export default tractorsRouter;