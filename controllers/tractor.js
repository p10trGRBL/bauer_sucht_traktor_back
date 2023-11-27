//performing CRUD operations on tractor posts
import Tractor from '../models/Tractor.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

//get all tractors

//alternative with utils asyncHandler
// export const getAllTractors = asyncHandler(async(req, res, next)=>{
//   const tractors = await Tractor.find().populate('owner');
//   res.json(tractors);
//});

export const getAllTractors = async (req, res, next) => {
    try {
        const tractors = await Tractor.find().populate('owner');
        if(!tractors.length) {
           // throw new Error();
           //throw {message: 'book not found'};
           //with utils ErrorResponse: 
           // throw new ErrorResponse('Schlepper nicht gefunden', 404); 
        throw {statusCode: 404, message: 'Schlepper nicht gefunden'};
        }
        res.json(tractors);
    } catch (error) {
        next(error);
    }
};

//get tractor post  By ID
 export const getTractorById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const tractor = await Tractor.findById(id).populate('owner');
        if(!tractor) {
            throw {statusCode: 404, message: 'Schlepper nicht gefunden'};
        }
        res.send(tractor);
    } catch (error) {
        next(error);
    }
 };



// add new Tractor/post 

// export const addNewTractor = async (req, res, next) => {
//     try {
//         const {brand, model, productionYear, power, image_url, extras, availableFrom, availableTo, tags, price, publishedDate, location, owner } = req.body;
//         const newBook = new Book({name, author, image_url, tags, publishedDate})
//         const savedBook = await newBook.save();
//         res.status(201).json(savedBook);
//         const newTractor = await Tractor.create(
//             {brand, model, productionYear, power, image_url, extras, availableFrom, availableTo, tags, price, publishedDate, location } );
//         res.status(201).json(newTractor);
//     } catch (error) {
//         next(error);
//     }
// };
export const addNewTractor = asyncHandler (async (req, res, next)=>{
    const {body, uid} = req;

    const newTractor = await Tractor.create({...body, owner: uid});
    const populatedTractor = await Tractor.findById(newTractor._id).populate('owner');
    res.status(201).json(populatedTractor);
})

//update a post/tractor 

// export const updateTractor = async (req, res, next) => {
//     const {id} = req.params;
//     const {brand, model, productionYear, power, image_url, extras, availableFrom, availableTo, tags, price, publishedDate, location, owner }= req.body;
//     try {
//         const updatedTractor = await Tractor.findByIdAndUpdate(id, 
//             {brand, model, productionYear, power, image_url, extras, availableFrom, availableTo, tags, price, publishedDate, location, owner }, 
//             {new: true});
//         if(!updatedTractor) { throw {statusCode: 404, message: 'Schlepper nicht gefunden'}}
//         res.json(updatedTractor);
//     } catch (error) {
//        next(error); 
//     }
// };
export const updateTractor = asyncHandler(async(req,res,next)=>{
    const { body, params: {id}, uid } = req;

    const found = await Tractor.findById(id);
    if(!found) throw new ErrorResponse('Schlepper nicht gefunden!', 404);
    if(uid !== found.owner.toString()) throw new ErrorResponse('Nicht Dein Tractor!', 401);

    const updatedTractor = await Tractor.findByIdAndUpdate(id, body, {new: true}).populate('owner');
    res.json(updatedTractor);
});


//add a tag to record
export const addTagToTractor = async (req, res, next) => {
    const {id} = req.params;
    const {tag} = req.body;

    try {
        const tractor = await Tractor.findById(id);
        if(!tractor) {throw {statusCode: 404, message: 'Schlepper nicht gefunden'}}
        tractor.tags.push(tag);
        const updatedTractor = await tractor.save();
        res.json(updatedTractor);
    } catch (error) {
        next(error);
    }
};

//add an extra to post/tractor

export const addExtraToTractor = async (req, res, next) => {
    const {id} = req.params;
    const {extra} = req.body;

    try {
        const tractor = await Tractor.findById(id);
        if(!tractor) {throw {statusCode: 404, message: 'Schlepper nicht gefunden'}}
        tractor.extras.push(extra);
        const updatedTractor = await tractor.save();
        res.json(updatedTractor);
    } catch (error) {
        next(error);
    }
}


//delete a tractor
// export const deleteTractor = async (req, res, next) => {
//  const {id} = req.params;
// try {
//     const deletedTractor = await Tractor.findByIdAndDelete(id);
// if(!deletedTractor) {throw {statusCode: 404, message: 'Schlepper nicht gefunden'}}
// res.status(200).json({message: "Schlepper gelöscht!"});

// } catch (error) {
//     next(error);
// }

// };
export const deleteTractor = asyncHandler(async(req, res, next)=>{
    const {
        
        params: {id},
        uid
    } = req;

    const found =await Tractor.findById(id);
    if(!found) throw new ErrorResponse(`Schlepper mit ID ${id} nicht gefunden`, 404);
    if(uid !== found.owner.toString()) throw new ErrorResponse('Keine Berechtigung', 401);

    const deletedTractor = await Tractor.findByIdAndDelete(id, {new: true}).populate('owner');
    res.json({success: `Schlepper mit ID ${id} wurde erfolgreich gelöscht!`});
});
