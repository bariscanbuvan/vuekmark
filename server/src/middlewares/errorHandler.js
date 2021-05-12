let Error = require('./ApiError');
const mongoose = require('mongoose');

function errorHandler(err, req, res, next) {
     if (err.message === 'invalid token') {
          return res.status(401).json({ message: 'Invalid Token' });
     }
     else if (err.message === 'jwt must be provided') {
          return res.status(401).json({ message: err.message });
     }
     else if (err instanceof mongoose.Error.CastError) {
          return res.sendStatus(400)
     } else if (err instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ data: req.body, message: err.message });
     } else if (err instanceof Error) {
          
          return res.status(err.status).json({ message: err.message });
     }
     console.log(err)
     return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;