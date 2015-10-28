"use strict";

var chai = require("chai");
var expect = chai.expect;
var chaihttp = require("chai-http");
var url = "localhost:3000/api";
process.env.MONGO_URL = "mongodb://localhost/pirates_test";
var mongoose = require("mongoose");
var Recipe = require("./../../models/pirate");

chai.use(chaihttp);

require("./../../server.js");

describe("pirates resource get/post", function(){
  it("should return pirates on get", function(done){
    chai.request(url)
      .get("/pirates")
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
    });
  });
  it("should save pirates", function(done){
    chai.request(url)
      .post("/pirates")
      .send({pirateName:'posttest', hobbies:'maiming, looting, shanty singing'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.pirateName).to.eql('posttest');
        done();
    });
  });
  after(function(done){
    Recipe.remove({pirateName:"posttest"}, function (err){
      if (err) throw err;
      done();
    });
  });
  describe('pirates resource put/delete', function(){
    var recID;
    var recID2;
    before(function(done){
      var newRecipe = new Recipe({pirateName:'deletetest'});
      var newRecipe2 = new Recipe({pirateName:'puttest'});
      newRecipe.save(function(err,data){
        if (err) throw err;
        recID = data._id;
        newRecipe2.save(function(err,data){
          if (err) throw err;
          recID2 = data._id;
          done();
        });
      });
    });
    it('should delete pirates', function(done){
      chai.request(url)
        .delete('/pirates/' + recID)
        .end(function(err, res){
            expect(err).to.eql(null);
            Recipe.find({pirateName:"deletetest"}, function(err, data){
              if (err) throw err;
              expect(data).to.deep.eql([]);
              done();
            });
        });
    });
    it('should update pirates', function(done){
      chai.request(url)
        .put('/pirates/' + recID2)
        .send({pirateName: 'puttest2'})
        .end(function(err, res){
            expect(err).to.eql(null);
            Recipe.find({pirateName:"puttest2"}, function(err, data){
              if (err) throw err;
              expect(data[0].pirateName).to.eql('puttest2');
              Recipe.remove({_id: recID2}, function(err){
                if (err) throw err;
                done();
              });
            });
        });
    });
  });
});
describe("hobbies resource get/post", function(){
  it("should return hobbies on get", function(done){
    chai.request(url)
      .get("/pirates")
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
    });
  });
});
