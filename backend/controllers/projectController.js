
const Project = require('../models/Project');
const { ApiError } = require('../middleware/errorHandler');

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Private
 */
const getProjects = async (req, res, next) => {
  try {
    let query = {};
    
    // If not admin, only show user's projects
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }

    const projects = await Project.find(query);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Private
 */
const createProject = async (req, res, next) => {
  try {
    const { title, description, deadline, tags } = req.body;

    const newProject = new Project({
      title,
      description,
      deadline,
      tags,
      user: req.user.id
    });

    const project = await newProject.save();
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private
 */
const updateProject = async (req, res, next) => {
  try {
    const { title, description, deadline, tags } = req.body;

    // Build project object
    const projectFields = {};
    if (title) projectFields.title = title;
    if (description) projectFields.description = description;
    if (deadline) projectFields.deadline = deadline;
    if (tags) projectFields.tags = tags;

    let project = await Project.findById(req.params.id);

    if (!project) {
      throw new ApiError('Project not found', 404);
    }

    // Make sure user owns the project or is an admin
    if (project.user.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new ApiError('Not authorized to update this project', 403);
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private
 */
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      throw new ApiError('Project not found', 404);
    }

    // Make sure user owns the project or is an admin
    if (project.user.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new ApiError('Not authorized to delete this project', 403);
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Project removed' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get project by ID
 * @route   GET /api/projects/:id
 * @access  Private
 */
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      throw new ApiError('Project not found', 404);
    }

    // Make sure user owns the project or is an admin/manager
    if (
      project.user.toString() !== req.user.id && 
      req.user.role !== 'admin' && 
      req.user.role !== 'manager'
    ) {
      throw new ApiError('Not authorized to view this project', 403);
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById
};
