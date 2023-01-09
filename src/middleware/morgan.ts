import morgan from 'morgan';

// morgan.token('body', (req, res) => {
//   JSON.stringify(req.body);
// });

export default morgan(
  ':method :url :status :res[content-length] - :response-time ms'
);
