import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReadingSchema = new Schema({
  temperature: {
    type: Number,
    required: true,
  },
  smokeDetect: {
    type: Number,
    required: true,
  },
  thermalDetect: {
    type: Number,
    required: true,
  },
  
  // Updated field to store image data as binary and its content type
  image: {
    data: Buffer, // Store binary data of the image
    contentType: String // Store content type of the image (e.g., "image/jpeg")
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

const Reading = mongoose.model('Reading', ReadingSchema);

export default Reading;
