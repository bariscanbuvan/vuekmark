const mongoose = require('mongoose');

const DashboardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
  },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true }],
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
