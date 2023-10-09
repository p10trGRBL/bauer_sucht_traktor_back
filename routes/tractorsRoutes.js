import express from 'express';
import * as tractorController from '../controllers/tractor.js';


const tractorsRouter = express.Router();
tractorsRouter
.route('/')
.get(tractorController.getAllTractors)
.post(tractorController.addNewTractor);

tractorsRouter
.route('/:id')
.get(tractorController.getTractorById)
.put(tractorController.updateTractor)
.delete(tractorController.deleteTractor);

tractorsRouter.route('/:id/addTag').patch(tractorController.addTagToTractor);
tractorsRouter.route('/:id/addExtra').patch(tractorController.addExtraToTractor);

export default tractorsRouter;