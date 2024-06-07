exports.handleErrors = (err, req, res, next) => {
    console.error(err.stack);
    next();
    res.status(500).json({ error: 'Something went wrong!' });
   
  };
  
  