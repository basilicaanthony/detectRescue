import  readModel from '../models/readModels.js'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';



export const getAllReadings = async (req, res) => {
  try {
    const readings = await readModel.find(); // Remove the filter to fetch all readings
    res.status(StatusCodes.OK).json({ readings });
  } catch (error) {
    console.error('Error fetching readings:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch readings' });
  }
};


//export const newReading = async (req, res) => {
  //const { smokeDetect, thermalDetect, temperature } = req.body;
  //const newReading = { id: nanoid(), smokeDetect, thermalDetect, temperature };
  //readings.push(newReading);
  //res.status(201).json({ reading: newReading });
//};

export const newReading = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const { smokeDetect, temperature,thermalDetect } = req.body;
    const reading = await readModel.create({smokeDetect,thermalDetect,temperature});
    res.status(StatusCodes.CREATED).json({reading});
  
}



export const singleReading = async (req, res) => {
  try {
    const reading = await readModel.findById(req.params.id);
    res.status(StatusCodes.OK).json({ reading });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

