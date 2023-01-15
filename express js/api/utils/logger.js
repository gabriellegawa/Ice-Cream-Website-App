const colors = {
	trace: 'white',
	debug: 'blue',
	info: 'green',
	warn: 'yellow',
	crit: 'red',
	fatal: 'red',
};

function logRequest(url, method, request) {
    console.log("log function called")
    MongoClient.connect(db_connection_string, (err, client) => {
      if (err) throw err
  
      const db = client.db(dbName)
      var date = new Date().toLocaleString()
  
      var log = {
        date: date,
        url: url,
        method: method,
        request_id: request
      }
  
      db.collection('Logs').insertOne(log, (err, response) => {
        if (err) throw err
  
        client.close()
      })
    })
  }