const express = require('express');
const bodyParser = require('body-parser');
var sql = require('mssql');

let app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/state/:id', (req, res) => {
  var config = {
    user: 'sa',
    password: 'Hoplong6688',
    server: '118.27.193.183',
    database: 'PatliteV2'
  }
  sql.connect(config, (err) => {
    if (err) {
      res.send(err);
    } else {
      var request = new sql.Request();
      console.log('connected db')
    }
    
    queryString = `SELECT MAC_ADDRESS, CURRENT_STATE, TIME_OFF, TIME_GREEN, TIME_RED, TIME_YELLOW, ACTUAL_QTY FROM PATLITE_STATE_CONTROL WHERE MAC_ADDRESS='${req.params.id}'`

    request.query(queryString, (err, recordset) => {
      if (err) {
        res.send(err);
      } else {
        console.dir(JSON.stringify(recordset));
        res.status(200).send(recordset);
      }
    });
  });
});

app.listen(5000, () => {
  console.log('Server is running...')
})
