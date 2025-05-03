
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Tracker = require('../models/Tracker');
const Project = require('../models/Project');
const mongoose = require('mongoose');

// @route   GET api/tracker
// @desc    Get user's tracker entries
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = { user: req.user.id };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const entries = await Tracker.find(query)
      .populate('project', 'title')
      .sort({ date: -1 });
    
    // Format entries for the frontend
    const formattedEntries = entries.map(entry => ({
      id: entry._id,
      date: entry.date,
      hours: entry.hours,
      mood: entry.mood,
      languages: entry.languages,
      project: entry.project ? {
        id: entry.project._id,
        title: entry.project.title
      } : null,
      notes: entry.notes
    }));
    
    res.json(formattedEntries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tracker
// @desc    Add a tracker entry
// @access  Private
router.post('/', [
  auth,
  [
    check('date', 'Date is required').not().isEmpty(),
    check('hours', 'Hours are required and must be a number').isNumeric(),
    check('mood', 'Mood is required and must be between 1 and 5').isInt({ min: 1, max: 5 })
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { date, hours, mood, languages, project, notes } = req.body;

  try {
    // Check if project exists if provided
    if (project) {
      const projectExists = await Project.findById(project);
      if (!projectExists) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      // Make sure user owns project
      if (projectExists.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }
    }
    
    // Check if entry for this date already exists
    const entryDate = new Date(date);
    const startOfDay = new Date(entryDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(entryDate.setHours(23, 59, 59, 999));
    
    const existingEntry = await Tracker.findOne({
      user: req.user.id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });
    
    if (existingEntry) {
      return res.status(400).json({ message: 'Entry for this date already exists' });
    }

    // Create tracker entry
    const trackerEntry = new Tracker({
      user: req.user.id,
      date: new Date(date),
      hours,
      mood,
      languages: languages || [],
      project,
      notes
    });

    await trackerEntry.save();
    res.json(trackerEntry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tracker/stats
// @desc    Get tracker statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    // Get total hours
    const totalHoursResult = await Tracker.aggregate([
      { $match: { user: mongoose.Types.ObjectId.createFromHexString(req.user.id) } },
      { $group: { _id: null, hours: { $sum: "$hours" } } }
    ]);
    
    const totalHours = totalHoursResult.length > 0 ? totalHoursResult[0].hours : 0;
    
    // Get language stats
    const languageStats = await Tracker.aggregate([
      { $match: { user: mongoose.Types.ObjectId.createFromHexString(req.user.id) } },
      { $unwind: "$languages" },
      { $group: { _id: "$languages.name", hours: { $sum: "$languages.hours" } } },
      { $sort: { hours: -1 } }
    ]);
    
    // Get daily average
    const dailyAverage = await Tracker.aggregate([
      { $match: { user: mongoose.Types.ObjectId.createFromHexString(req.user.id) } },
      { 
        $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          hours: { $avg: "$hours" },
          mood: { $avg: "$mood" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      totalHours,
      languageStats,
      dailyAverage
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tracker/streak
// @desc    Get user's current streak
// @access  Private
router.get('/streak', auth, async (req, res) => {
  try {
    // Get all user's tracker entries sorted by date
    const entries = await Tracker.find({ user: req.user.id })
      .sort({ date: 1 })
      .select('date');
    
    if (entries.length === 0) {
      return res.json({ currentStreak: 0, maxStreak: 0 });
    }
    
    // Format dates and create a Set for O(1) lookups
    const trackedDates = new Set();
    entries.forEach(entry => {
      const dateStr = new Date(entry.date).toISOString().split('T')[0];
      trackedDates.add(dateStr);
    });
    
    // Calculate current streak
    const today = new Date();
    let currentDate = new Date(today);
    let currentStreak = 0;
    
    // Look back up to 30 days to find most recent streak
    for (let i = 0; i < 30; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (trackedDates.has(dateStr)) {
        currentStreak++;
        // Move to previous day
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    // Calculate max streak
    let maxStreak = 0;
    let currentMaxStreak = 0;
    let prevDate = null;
    
    entries.forEach(entry => {
      const currentDate = new Date(entry.date);
      
      if (prevDate) {
        // Check if dates are consecutive
        const diffTime = prevDate.getTime() - currentDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // Consecutive day
          currentMaxStreak++;
        } else {
          // Break in streak
          if (currentMaxStreak > maxStreak) {
            maxStreak = currentMaxStreak;
          }
          currentMaxStreak = 1;
        }
      } else {
        currentMaxStreak = 1;
      }
      
      prevDate = currentDate;
    });
    
    // Check one more time in case the longest streak was the last one
    if (currentMaxStreak > maxStreak) {
      maxStreak = currentMaxStreak;
    }
    
    res.json({
      currentStreak,
      maxStreak
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
