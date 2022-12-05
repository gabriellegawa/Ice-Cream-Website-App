const express = require('express')
const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/test', (err, client) => {
  if (err) throw err

  const db = client.db('test')

  db.collection('productListing').find().toArray((err, result) => {
    if (err) throw err

    // console.log(result)
  })
})


app.use(express.json());

app.post('/product', function(request, response){

  const { MongoClient } = require("mongodb");
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri =
    "mongodb://localhost:27017/test";
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


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/getData', (req, res) => {
    // res.json({
    //     "productId":1,
    //     "productName":"Ice cream"
    // })

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

app.get('/getCustomer', (req, res) => {
  // res.json({
  //     "productId":1,
  //     "productName":"Ice cream"
  // })

  MongoClient.connect(db_connection_string, (err, client) => {
      if (err) throw err

      const db = client.db('iCreamDB')

      db.collection('User').find().toArray((err, result) => {
      if (err) throw err

      
      console.log('get Data method called')

      // console.log(result)
      res.json(result)
      })
  })
})
  

app.put('/customer',function(request, response){
  console.log(request.body._id);
  MongoClient.connect(db_connection_string, (err, client) => {
      if (err) throw err

      const db = client.db('iCreamDB')
      // {_id: request.body._id}
      var id = new require('mongodb').ObjectID(request.body._id)//req.params.id

      // db.collection('User').findOne({'_id':id})
      // .then(function(doc) {
      //        if(!doc)
      //            throw new Error('No record found.');
      //      console.log(doc);//else case
      //  });
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

app.put('/registerCustomer', function(request, response) {
  console.log("Register Customer called")
  MongoClient.connect(db_connection_string, (err, client) => {
    if (err) throw err
    const db = client.db('iCreamDB')
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})