
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Achievement = require('../models/Achievement');
const Tracker = require('../models/Tracker');
const Task = require('../models/Task');
const Project = require('../models/Project');

// @route   GET api/achievements
// @desc    Get user achievements
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.user.id })
      .sort({ unlockedAt: -1 });
    
    // Format data for frontend
    const formattedAchievements = achievements.map(achievement => ({
      id: achievement._id,
      name: achievement.name,
      description: achievement.description,
      badgeIcon: achievement.badgeIcon,
      unlockedAt: achievement.unlockedAt
    }));
    
    res.json(formattedAchievements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/achievements/check
// @desc    Check for new achievements
// @access  Private
router.post('/check', auth, async (req, res) => {
  try {
    const newAchievements = [];
    const existingAchievements = await Achievement.find({ user: req.user.id });
    const existingAchievementNames = existingAchievements.map(a => a.name);
    
    // Check for first day achievement
    const trackerEntries = await Tracker.find({ user: req.user.id });
    if (trackerEntries.length === 1 && !existingAchievementNames.includes('First Day')) {
      const newAchievement = await createAchievement(
        req.user.id,
        'First Day',
        'Logged your first day of coding',
        'first-day-badge'
      );
      newAchievements.push(newAchievement);
    }
    
    // Check for 7-day streak
    const streakResponse = await checkStreak(req.user.id, 7, 'Week Streak', existingAchievementNames);
    if (streakResponse) newAchievements.push(streakResponse);
    
    // Check for 30-day streak
    const monthStreakResponse = await checkStreak(req.user.id, 30, 'Month Streak', existingAchievementNames);
    if (monthStreakResponse) newAchievements.push(monthStreakResponse);
    
    // Check for task completions
    const completedTasks = await Task.countDocuments({ 
      user: req.user.id,
      status: 'completed'
    });
    
    if (completedTasks >= 10 && !existingAchievementNames.includes('Task Master')) {
      const newAchievement = await createAchievement(
        req.user.id,
        'Task Master',
        'Completed 10 tasks',
        'task-master-badge'
      );
      newAchievements.push(newAchievement);
    }
    
    // Check for completed projects
    const completedProjects = await Project.countDocuments({
      user: req.user.id,
      status: 'completed'
    });
    
    if (completedProjects >= 1 && !existingAchievementNames.includes('Project Finisher')) {
      const newAchievement = await createAchievement(
        req.user.id,
        'Project Finisher',
        'Completed your first project',
        'project-finisher-badge'
      );
      newAchievements.push(newAchievement);
    }
    
    // Format the response
    const formattedAchievements = newAchievements.map(achievement => ({
      id: achievement._id,
      name: achievement.name,
      description: achievement.description,
      badgeIcon: achievement.badgeIcon,
      unlockedAt: achievement.unlockedAt
    }));
    
    res.json({ newAchievements: formattedAchievements });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Helper function to check streak achievements
async function checkStreak(userId, days, achievementName, existingAchievements) {
  if (existingAchievements.includes(achievementName)) return null;
  
  // Get all user's tracker entries sorted by date
  const entries = await Tracker.find({ user: userId })
    .sort({ date: 1 })
    .select('date');
  
  if (entries.length < days) return null;
  
  // Format dates and create a Set for O(1) lookups
  const trackedDates = new Set();
  entries.forEach(entry => {
    const dateStr = new Date(entry.date).toISOString().split('T')[0];
    trackedDates.add(dateStr);
  });
  
  // Look back from most recent entries to find streak
  let streakCount = 0;
  let lastDate = null;
  
  for (let i = entries.length - 1; i >= 0; i--) {
    const currentDate = new Date(entries[i].date);
    if (!lastDate) {
      streakCount = 1;
      lastDate = currentDate;
      continue;
    }
    
    // Check if dates are consecutive
    const diffTime = Math.abs(lastDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streakCount++;
      if (streakCount >= days) {
        return createAchievement(
          userId,
          achievementName,
          `Coded for ${days} days in a row`,
          `${achievementName.toLowerCase().replace(' ', '-')}-badge`
        );
      }
    } else {
      // Break in streak
      break;
    }
    
    lastDate = currentDate;
  }
  
  return null;
}

// Helper function to create a new achievement
async function createAchievement(userId, name, description, badgeIcon) {
  const achievement = new Achievement({
    user: userId,
    name,
    description,
    badgeIcon,
    unlockedAt: Date.now()
  });
  
  await achievement.save();
  return achievement;
}

module.exports = router;
