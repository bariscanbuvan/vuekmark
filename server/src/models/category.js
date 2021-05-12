const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required' ],
    },
    color: {
        type: String,
         required: [true, 'Color is required' ],
    },
    visible: {
        type: Boolean,
    },
    dashboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard', required:true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Category', CategorySchema);
