// const test = require('ava');
//   const sinon = require('sinon');
//   const jwt = require('jsonwebtoken');
  
//   let stub;
  
//   test.before(t => {
//       stub = sinon.stub(jwt, 'verify').callsFake(() => {
//           return Promise.resolve({success: 'Token is valid'});
//       });
//   })
  
//   test('should return success', async t => {
//       const testToken = 'test';
//       const testSecret = 'test secret';
  
//       const result = await jwt.verify(testToken, testSecret);
  
//       console.log(result);
  
//       t.is(result.success, 'Token is valid');
//   });
  
//   test.after('cleanup', t => {
//       stub.restore();
//   })


//do a test for does a token exit and is it verified 

// Endpoint testing with mocha and chai and chai-http

    // Import libraries
    // const chai = require('chai');
    // const chaiHttp = require('chai-http');
    // const should = chai.should();
    // var mongoose = require("mongoose");

    // // Import server
    // var server = require('../server');

    // // Import Todo Model
    // //var Todo = require("./../models/habit");
    // var User = require("./../models/user");

    // // use chaiHttp for making the actual HTTP requests        
    // chai.use(chaiHttp);

    // describe('Todo API', function() {

    //     it('should Register user, login user, check token and delete a todo on /todo/<id> DELETE', function(done) {
    //         chai.request(server)

    //             // register request
    //             .post('/auth/register')

    //             // send user registration details
    //             .send({
    //                     'fullName': 'Paul Oluyege',
    //                     'email': 'tester@gmail.com',
    //                     'password': 'tester'
    //                 }

    //             ) // this is like sending $http.post or this.http.post in Angular
    //             .end((err, res) => { // when we get a resonse from the endpoint

    //                 // in other words,
    //                 // the res object should have a status of 201
    //                 res.should.have.status(201);

    //                 // follow up with login
    //                 chai.request(server)
    //                     .post('/auth/sign_in')
    //                     // send user login details
    //                     .send({
    //                         'email': 'tester@gmail.com',
    //                         'password': 'tester'
    //                     })
    //                     .end((err, res) => {
    //                         console.log('this runs the login part');
    //                         res.body.should.have.property('token');
    //                         var token = res.body.token;

    //                         // follow up with requesting user protected page
    //                         chai.request(server)
    //                             .get('/todos')
    //                             .end(function(err, res) {
    //                                 chai.request(server)
    //                                     .delete('/todo/' + res.body[0]._id)

    //                                     // we set the auth header with our token
    //                                     .set('Authorization', 'JWT ' + token)
    //                                     .end(function(error, resonse) {
    //                                         resonse.should.have.status(200);
    //                                         resonse.body.should.have.property('message');
    //                                         resonse.body.message.should.equal('Authorized User, Action Successful!');
    //                                         done();
    //                                     });
    //                             })
    //                     })
    //             })
    //     })
    // });

//



//do a test for is the admin retriving all the users



//do a test for does the user successfully retrive its own data 



    
    
    
    
    
    
    
    
    