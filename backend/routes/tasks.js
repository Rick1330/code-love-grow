
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const Project = require('../models/Project');

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, priority, project, assignedTo, search, startDate, endDate } = req.query;
    
    // Build query
    const query = { user: req.user.id };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (project) query.project = project;
    if (assignedTo) query.assignedTo = assignedTo;
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (startDate || endDate) {
      query.dueDate = {};
      if (startDate) query.dueDate.$gte = new Date(startDate);
      if (endDate) query.dueDate.$lte = new Date(endDate);
    }

    const tasks = await Task.find(query)
      .populate('project', 'title')
      .sort({ createdAt: -1 });

    // Transform data for frontend
    const formattedTasks = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      project: task.project ? {
        id: task.project._id,
        title: task.project.title
      } : null,
      createdAt: task.createdAt
    }));

    res.json(formattedTasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/:id
// @desc    Get task by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project', 'title');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post('/', [
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('priority', 'Priority is required').isIn(['low', 'medium', 'high', 'urgent']),
    check('status', 'Status is required').isIn(['pending', 'in_progress', 'completed', 'cancelled']),
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, project, dueDate, priority, assignedTo, status, tags } = req.body;

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

    // Create task
    const task = new Task({
      title,
      description,
      user: req.user.id,
      project,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      assignedTo: assignedTo || req.user.id,
      status
    });

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, project, dueDate, priority, assignedTo, status } = req.body;

  // Build task object
  const taskFields = {};
  if (title) taskFields.title = title;
  if (description !== undefined) taskFields.description = description;
  if (project) taskFields.project = project;
  if (dueDate) taskFields.dueDate = new Date(dueDate);
  if (priority) taskFields.priority = priority;
  if (assignedTo) taskFields.assignedTo = assignedTo;
  if (status) {
    taskFields.status = status;
    if (status === 'completed') {
      taskFields.completedAt = Date.now();
    }
  }

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Check if project exists & user owns it (if changing project)
    if (project && project !== task.project?.toString()) {
      const projectExists = await Project.findById(project);
      if (!projectExists) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      // Make sure user owns project
      if (projectExists.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
