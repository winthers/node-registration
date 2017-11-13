
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
    
chai.use(sinonChai);



/**
 * 
 * 1. entering a new user in to the registration process
 * - should take the user and store it in the temp_users database with email/username/password/created_at
 * - should generate and send an email to the user with a registration token.
 * 
 * 2. user clicks that verfication link in the email
 * - upon successfully verifying token: 
 *      - should remove the user from the temp-user to the users database
 * - upun unsuccessfull verify due to timeout token: should give the user a possibility to resend registration email ? 
 */


describe("registration", function() {
    
    
    describe("initialize Registration Process", ()=> {

        it("malformed userobject will result in an error", ()=> {

            var cb = sinon.spy()
            new Registration().initializeRegistrationProccess(null, cb);
            expect(cb).to.have.been.calledWith("malformed user");
        })

        it("correct formed userobject will not result in error", ()=> {
            var cb = sinon.spy()
            new Registration().initializeRegistrationProccess({username: "a", email:"a", password:"a"}, cb);
            expect(cb).to.have.been.calledWith(null);
        })
    })
});


describe("validator", function () {
    describe("isString", ()=> {
        it("will verify string", ()=> {
            expect(Validator.isString("")).to.equal(true, "should be valid string")
            expect(Validator.isString(10)).to.equal(false, "should not be valid  string")
            
        })
        it("notEmpty", ()=> {
            expect(Validator.isString("", {notEmpty:true})).to.equal(false, "should not be valid string")
        })
        it("minLength", ()=> {
            expect(Validator.isString("", {minLength:3})).to.equal(false, "should not be valid string")
            expect(Validator.isString("123", {minLength:3})).to.equal(true, "should not be valid string")
        })
        it("maxLength", ()=> {
            expect(Validator.isString("", {maxLength:3})).to.equal(true, "should  be valid string")
            expect(Validator.isString("1234", {maxLength:3})).to.equal(false, "should not be valid string")
        })
        it("test", ()=> {
            expect(Validator.isString("",     {test: value => { return /^\d/.test(value)}} )).to.equal(false, "should  not be valid string")
            expect(Validator.isString("1234", {test: value => { return /^\d/.test(value)}} )).to.equal(true, "should be valid string")
        })
    })

    describe("isEmail", ()=> {
        it("will fail on invalid emails ", ()=> {
            expect(Validator.isEmail("a.lol")).to.equal(false, "invalid  email");
            expect(Validator.isEmail("a#@.lol")).to.equal(false, "invalid  email");
        })
        it("will validate email", ()=> {
            expect(Validator.isEmail("foobar@domain.lol")).to.equal(true, "valid email");
        })
    })
})


class Validator {
   static  isString (value, settings)  {
        settings = settings || {};
        if(typeof value == "string") {
            
             if (settings.hasOwnProperty("notEmpty")){
                 if(value !== ""){

                     return true;
                 }else {
                     return false;
                 }
             }
           
            if (settings.hasOwnProperty("minLength")) {
                if(value.length >= settings.minLength) {
                    return true;
                }else {
                    return false;
                }
            }
            if (settings.hasOwnProperty("maxLength")) {
                if(value.length <= settings.maxLength) {
                    return true;
                }else {
                    return false;
                }
            }
            if (settings.hasOwnProperty("test")) {
                return settings.test(value);
            }
            // if (settings.test && !value.test(settings.test))


            return true;
            
        }
        return false
    }


    // use this insted: https://github.com/mailcheck/mailcheck
    static isEmail (value) {
        //[source](http://emailregex.com/)
       return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
       
    }
}

class Registration  {

    constructor (db) {}

    /** @param user any {username:string, email:string, password:string} */
    initializeRegistrationProccess (user, cb) {

        var errorMessage = "malformed user";
        if(!user) return cb(errorMessage);

        if(user.hasOwnProperty("username")  && user.username !==""
        && user.hasOwnProperty("email")     && user.email !==""
        && user.hasOwnProperty("password")  && user.password !=="") {
            cb(null);
        }
        else {
            cb( errorMessage)
        }
        
    }

}