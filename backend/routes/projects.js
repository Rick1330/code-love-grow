
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const checkPermission = require('../middleware/checkPermission');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById
} = require('../controllers/projectController');

// @route   GET api/projects
// @desc    Get all projects
// @access  Private
router.get('/', auth, getProjects);

// @route   POST api/projects
// @desc    Create a project
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty()
    ],
    validateRequest
  ],
  createProject
);

// @route   GET api/projects/:id
// @desc    Get project by ID
// @access  Private
router.get('/:id', auth, getProjectById);

// @route   PUT api/projects/:id
// @desc    Update project
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('title', 'Title is required').optional(),
      check('description', 'Description must be a string').optional().isString()
    ],
    validateRequest
  ],
  updateProject
);

// @route   DELETE api/projects/:id
// @desc    Delete project
// @access  Private - Admin or Owner only
router.delete(
  '/:id',
  [auth, authorize(['admin', 'user'])],
  deleteProject
);

module.exports = router;
