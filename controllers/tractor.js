//performing CRUD operations on tractor posts
import Tractor from '../models/Tractor.js';

//get all tractors

export const getAllTractors = async (req, res, next) => {
    try {
        const tractors = await Tractor.find();
        if(!tractors.length) {
           // throw new Error();
           //throw {message: 'book not found'};
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
        const tractor = await Tractor.findById(id);
        if(!tractor) {
            throw {statusCode: 404, message: 'Schlepper nicht gefunden'};
        }
        res.send(tractor);
    } catch (error) {
        next(error);
    }
 };



// add new Tractor/post

export const addNewTractor = async (req, res, next) => {
    try {
        const {brand, model, productionYear, power, image_url, extras, availableFrom, availableTo, tags, price, publishedDate } = req.body;
        // const newBook = new Book({name, author, image_url, tags, publishedDate})
        // const savedBook = await newBook.save();
        // res.status(201).json(savedBook);
        const newTractor = await Tractor.create(
            {brand, model, productionYear, power, image_url, extras, availableFrom, availableTo, tags, price, publishedDate } );
        res.status(201).json(newTractor);
    } catch (error) {
        next(error);
    }
};

//update a post/tractor 

export const updateTractor = async (req, res, next) => {
    const {id} = req.params;
    const {brand, model, productionYear, power, image_url, extras, availableFrom, availableTo, tags, price, publishedDate }= req.body;
    try {
        const updatedTractor = await Tractor.findByIdAndUpdate(id, 
            {brand, model, productionYear, power, image_url, extras, availableFrom, availableTo, tags, price, publishedDate }, 
            {new: true});
        if(!updatedTractor) { throw {statusCode: 404, message: 'Schlepper nicht gefunden'}}
        res.json(updatedTractor);
    } catch (error) {
       next(error); 
    }
};

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
export const deleteTractor = (req, res, next) => {
 const {id} = req.params;
try {
    const deletedTractor = Tractor.findByIdAndDelete(id);
if(!deletedTractor) {throw {statusCode: 404, message: 'Schlepper nicht gefunden'}}
res.status(200).json({message: "Schlepper gelöscht!"});

} catch (error) {
    next(error);
}

};

