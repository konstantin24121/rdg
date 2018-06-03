// Api routes

/**
 * Return Api error
 * @param       {string} code
 * @param       {string} message
 * @constructor
 */
function ApiError(code, message) {
  return {
    success: false,
    error: { code, message },
  };
}

module.exports = function createApi(app, db, io) {
  // Get Deals list from db
  app.get('/api/deals', (req, res) => {
    const data = db.get('deals').value();
    res.send({ success: true, data });
  });

  // Get Deal by id
  // if find, else return error
  app.get('/api/deals/:id', (req, res) => {
    const { id } = req.params;
    const record = db.get('deals').getById(id).value();
    if (record) {
      res.send({ success: true, data: record });
    } else {
      res.send(ApiError('not_found', `Deal ${id} not found`));
    }
  });

  // Create new Deal
  // and write it in db
  // Send socket event
  app.post('/api/deals', (req, res) => {
    const { value, date } = req.body;
    const socketId = req.get('socketid');
    if (Number(value) !== value) {
      res.send(ApiError('validation_error', 'Value must be a number'));
    }
    if (!Number.isInteger(date)) {
      res.send(ApiError('validation_error', 'Date must be a integer timestamp'));
    }

    db.get('deals')
      .insert({ value, date })
      .write()
      .then((record) => {
        io.emit('new_deal', { ...record, webSocketId: socketId });
        res.send({ success: true, data: record });
      });
  });

  // Remove Deal by id
  // if find, else return error
  // send socket event
  app.delete('/api/deals', (req, res) => {
    const { id } = req.body;
    const socketId = req.get('socketid');
    const record = db.get('deals').getById(id).value();
    if (record) {
      db.get('deals')
        .removeById(id)
        .write()
        .then(() => {
          io.emit('remove_deal', { id, webSocketId: socketId });
          res.send({ success: true, data: { id } });
        });
    } else {
      res.send(ApiError('not_found', `Deal ${id} not found`));
    }
  });
};
