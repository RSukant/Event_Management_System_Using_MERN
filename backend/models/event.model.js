import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
},  {
    timestamps: true,  //createdAt and updatedAt
    } 
);

const Event = mongoose.model('Event', eventSchema);
//mongoose will take it as events collection in the database

export default Event;