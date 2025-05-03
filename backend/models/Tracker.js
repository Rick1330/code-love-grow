
const mongoose = require('mongoose');

const TrackerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  hours: {
    type: Number,
    required: true,
    min: 0
  },
  mood: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  languages: [{
    name: String,
    hours: Number
  }],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  notes: {
    type: String
  }
});

// Index for efficient date queries
TrackerSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('Tracker', TrackerSchema);
