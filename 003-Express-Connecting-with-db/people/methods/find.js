const _find = (req, res) => {
  const connection = req.app.get('sql-connection');
  connection.query('show tables', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    console.log(fields);
    res.send('GET handler for /people route.');
  });
};

module.exports = _find;
