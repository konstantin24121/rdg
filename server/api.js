// Api routes
function ApiError(code, message) {
  return {
    success: false,
    error: { code, message },
  };
}

module.exports = function createApi(app, db, io) {
  // Get Deals list
  app.get('/api/deals', (req, res) => {
    const data = db.get('deals').value();
    res.send({ success: true, data });
  });

  // Get Deal by id
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
  app.post('/api/deals', (req, res) => {
    const { value, date, clientId } = req.body;
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
        io.emit('new_deal', { ...record, webSocketId: clientId });
        res.send({ success: true, data: record });
      });
  });

  // Remove Deal by id
  app.delete('/api/deals', (req, res) => {
    const { id, clientId } = req.body;
    const record = db.get('deals').getById(id).value();
    if (record) {
      db.get('deals')
        .removeById(id)
        .write()
        .then(() => {
          io.emit('remove_deal', { id, webSocketId: clientId });
          res.send({ success: true, data: { id } });
        });
    } else {
      res.send(ApiError('not_found', `Deal ${id} not found`));
    }
  });
};
