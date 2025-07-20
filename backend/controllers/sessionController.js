const Session = require('../models/sessionModel');
const User = require('../models/userModel');

// POST /api/sessions - Create a new session
exports.createSession = async (req, res) => {
  try {
    const { teacherId, skill, scheduledTime, meetingLink } = req.body;

    if (!teacherId || !skill || !scheduledTime) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const session = new Session({
      teacherId,
      learnerId: req.user.userId,
    // learnerId,
      skill,
      scheduledTime,
      meetingLink,
    });

    await session.save();
    res.status(201).json({ message: 'Session created', session });
  } catch (error) {
    res.status(500).json({ message: 'Error creating session', error: error.message });
  }
};

// GET /api/sessions/my-sessions - Get all sessions for logged-in user
exports.getUserSessions = async (req, res) => {
  try {
    const userId = req.user.userId;

    const sessions = await Session.find({
      $or: [{ learnerId: userId }, { teacherId: userId }],
    }).populate('teacherId', 'name email')
      .populate('learnerId', 'name email')
      .sort({ scheduledTime: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions', error: error.message });
  }
};

// PATCH /api/sessions/:id/status - Update session status
exports.updateSessionStatus = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const { status } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    session.status = status;
    await session.save();

    res.json({ message: 'Session status updated', session });
  } catch (error) {
    res.status(500).json({ message: 'Error updating session status', error: error.message });
  }
};

// GET /api/sessions - Get all sessions (admin or debug route)
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate('teacherId', 'name email')
      .populate('learnerId', 'name email')
      .sort({ scheduledTime: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sessions', error: error.message });
  }
};
