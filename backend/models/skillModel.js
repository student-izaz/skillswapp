const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);