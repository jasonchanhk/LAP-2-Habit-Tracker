const request = require("supertest");
const server = require("../app");

describe("server API",()=>{
    let api;

    beforeAll(()=>{
        api = server.listen(5000, ()=>{
            console.log("App is running on port 5000")
        });
    });

    afterAll((done)=>{
        console.log("stopping test server");
        api.close(done);
    });
});