const express = require('express')
const app = express()
const port = 3000
const { MongoClient } = require("mongodb");
const dbName = "iCreamDB"


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.post('/product', function(request, response){

  
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri = "mongodb://localhost:27017/test";
  const client = new MongoClient(uri);
  async function run() {
    try {
      await client.connect();
      // database and collection code goes here
      
    const db = client.db('test')
    const coll = db.collection("productListing");
      // insert code goes here

    const result = await coll.insertOne(request.body);

      // display the results of your operation
      console.log(result.insertedId);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  

  console.log(request.body);      // your JSON
  //  response.send(request.body);    // echo the result back
  response.status(200).send({'message':'Insert Successful'})
});

app.get('/getData', (request, res) => {

  MongoClient.connect('mongodb://localhost:27017/test', (err, client) => {
      if (err) throw err

      const db = client.db('test')

      db.collection('productListing').find().toArray((err, result) => {
      if (err) throw err

      
      console.log('get Data method called')
      res.json(result)
      })
  })
})

const db_connection_string = 'mongodb://localhost:27017/iCreamDB'


function logRequest(api, request) {
  console.log("log function called")
  MongoClient.connect(db_connection_string, (err, client) => {
    if (err) throw err

    const db = client.db(dbName)
    const date = new Date()

    var log = {
      date: date,
      calledAPI: api,
      request: request
    }

    db.collection('Logs').insertOne(log, (err, res) => {
      if (err) throw err

      client.close()
    })
  })
}

app.get('/getCustomer', (req, res) => {

  MongoClient.connect(db_connection_string, (err, client) => {
      if (err) throw err
      
      logRequest(request.url, request.method, request.body._id)

      const db = client.db(dbName)

      db.collection('User').find().toArray((err, result) => {
      if (err) throw err
      
      console.log('get Data method called')
      logRequest("getCustomer", "req")

      res.json(result)
      })
  })
})

app.put('/login', (request, response) => {
  MongoClient.connect(db_connection_string, (err, client) => {
    
    if (err) throw err

    logRequest(request.url, request.method, request.body._id)
    
    const db = client.db(dbName)

    console.log(request.body)

    var email = request.body.emailAddress
    var password = request.body.password

    db.collection('User').findOne( { emailAddress: email, password: password}, (err, result) => {
      if (err) throw err

      if (result) {
        response.status(200).send(result)
      } else {
        response.statusMessage = "Unauthorized Access";
        response.status(401).end();
      }
    })
  })
})

app.get('/getService', (request, res) => {
  MongoClient.connect(db_connection_string, (err, client) => {
    if (err) throw err

    logRequest(request.url, request.method, request.body._id)

    const db = client.db(dbName)

    db.collection('Service').find().toArray((err, result) => {
      if (err) throw err

      res.json(result)
    })
  })
})

app.put('/customer',function(request, response){

  MongoClient.connect(db_connection_string, (err, client) => {
      if (err) throw err

      logRequest(request.url, request.method, request.body._id)

      const db = client.db(dbName)
      var id = new require('mongodb').ObjectID(request.body._id)

      db.collection('User').updateOne({_id: id},{$set:{
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        emailAddress:request.body.emailAddress,
        phoneNumber:request.body.phoneNumber,
        dateOfBirth:request.body.dateOfBirth,
        password:request.body.password,
        }}).then((result) => {
          console.log(result);
        }).catch((err) => {
            console.log(err);
        })
  })
})

app.put('/service', function(request, response) {
  MongoClient.connect(db_connection_string, (err, client) => {
    if (err) throw err
    
    logRequest(request.url, request.method, request.body._id)
    const db = client.db(dbName)
    var id = new require('mongodb').ObjectID(request.body._id)

    db.collection('Service').updateOne({_id : id}, {$set: {
      title: request.body.title,
      description: request.body.description,
      lastModified: request.body.lastModified
    }}).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    })
  })
})

app.put('/deleteService', function(request, response) {
  MongoClient.connect(db_connection_string, (err, client) => {
    if (err) throw err

    logRequest(request.url, request.method, request.body._id)

    const db = client.db(dbName)
    var id = new require('mongodb').ObjectID(request.body._id)
    try {
      db.collection('Service').deleteOne({_id : id})
    } catch (e) {
      console.log(e)
    }
  })
  response.status(200).send({'message':'Delete Successful'})
})

app.put('/registerCustomer', function(request, response) {
  console.log("Register Customer called")
  MongoClient.connect(db_connection_string, (err, client) => {
    if (err) throw err

    logRequest(request.url, request.method, request.body._id)
    const db = client.db(dbName)
    var newUser = { 
      firstName:request.body.firstName,
      lastName:request.body.lastName,
      emailAddress:request.body.emailAddress,
      phoneNumber:request.body.phoneNumber,
      dateOfBirth:request.body.dateOfBirth,
      password:request.body.password
    }
    // TODO: Add catch error
    db.collection('User').insertOne(newUser, function(err, res) {
      if (err) throw err

      client.close()
    })
  })
  
  response.status(200).send({'message':'Insert Successful'})
})

app.put('/registerService', function(request, response) {
  console.log("Register Service is called")
  MongoClient.connect(db_connection_string, (err, client) => {
    if (err) throw err

    logRequest(request.url, request.method, request.body._id)
    const db = client.db(dbName)
    var newService = {
      title: request.body.title,
      description: request.body.description,
      dateAdded: request.body.dateAdded,
      lastModified: request.body.lastModified,
      user: request.body.user
    }

    db.collection('Service').insertOne(newService, function(err, res) {
      if (err) throw err

      client.close()
    })
  })
  response.status(200).send({'message':'Insert Successful'})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})