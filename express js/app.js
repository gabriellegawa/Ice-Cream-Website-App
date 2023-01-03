
const express = require('express')
const app = express()
const port = 3000
const { MongoClient } = require("mongodb")
const dbName = "iCreamDB"
const auth = require("./auth.js")
const jwtValidation = require("./jwtValidation.js")

app.get('/', (request, response) => {
  response.send('Hello World!')
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

app.get('/getData', (request, response) => {

  MongoClient.connect('mongodb://localhost:27017/test', (err, client) => {
      if (err) throw err

      const db = client.db('test')

      db.collection('productListing').find().toArray((err, result) => {
      if (err) throw err

      
      console.log('get Data method called')
      response.json(result)
      })
  })
})

const db_connection_string = 'mongodb://localhost:27017/iCreamDB'


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

app.get('/getCustomer', (request, response) => {

  MongoClient.connect(db_connection_string, (err, client) => {
      if (err) throw err
      logRequest(request.url, request.method, request.body._id)
      
      const db = client.db(dbName)
      if (request.body.role !== "Admin") {
        response.status(401).send({"message": "Unauthorized"})
      }
      else {
        db.collection('User').find().toArray((err, result) => {
          if (err) throw err
          
        response.status(200).json(result)
        })
      }
  })
})


app.put('/login', (request, response) => {
  MongoClient.connect(db_connection_string, (err, client) => {
    
    if (err) throw err

    logRequest(request.url, request.method, request.body._id)
    
    const db = client.db(dbName)

    db.collection('User').findOne( { emailAddress: request.body.emailAddress, password: request.body.password}, (err, result) => {
      if (err) throw err
      
      if (result != null) {
        response.status(200).json({
          idToken: auth.generateToken(String(result._id)),
          expiresIn: 120,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.emailAddress,
          role: result.role
        })
      }
      else {
        response.status(401).send({'message':'User not found'})
      }
    })
  })
})

app.get('/getService', jwtValidation.checkIfAuthenticated(), (request, response) => {
  MongoClient.connect(db_connection_string, (err, client) => {
    if (err) throw err
    console.log(jwtValidation.checkIfAuthenticated())
    logRequest(request.url, request.method, request.body._id)

    const db = client.db(dbName)

    db.collection('Service').find().toArray((err, result) => {
      if (err) throw err

      response.json(result)
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
    db.collection('User').insertOne(newUser, function(err, response) {
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

    db.collection('Service').insertOne(newService, function(err, response) {
      if (err) throw err

      client.close()
    })
  })
  response.status(200).send({'message':'Insert Successful'})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})