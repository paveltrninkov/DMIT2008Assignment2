/* 
  Login Service Will Authenticate an email and password
  return a true or false response.
  false returns will keep users on the login page with errors
  true will redirect user to the dashboard.html
*/
const fileService = require('./fileService')
 
// common js module  import === require
// export import es modules  Browser...
// exports or module.exports  requre commonjs  NODE (BUNDLER RUN BROWSER)
exports.authenticate = (credential)=>{
 
   const {email, password} = {...credential}
   const users = fileService.getFileContents('../data/users.json');
   // flush the authentication
   
 const authUser =  users.reduce((authObj, user)=>{
     
    if(user.email === email){
      authObj.validEmail = true;
    }else{
       // errorObj
    }

    if(user.password === password){
      authObj.validPassword = true;
    }else{
      // passwordError authObj.passwordError = "something"
    }

    if(authObj.validEmail===true && authObj.validPassword===true){
        authObj.user = user;
    }
         
    return authObj

   }, {validEmail:false, validPassword:false, user:null})

    // ternary opertoar   ()?true:false
    // if() else
    // truthy falsy
   const auth0 = authUser.user ? {user:authUser.user}: formatErrors(authUser);
   return auth0

}

exports.validate = (info) =>
{
  const {email, password} = {...info};

  let valid = true;
  // object for validation
  let auth;
  // trim() to remove white spaces
  if ((email.trim().length == 0)) 
  {
    valid = false;
  }
  if ((password.trim()).length == 0)
  {
    valid = false;
  }
  // check if valid
  if (valid)
  {
    auth = {
      email:null,
      password:null
    }
  }
  else
  {
    auth = {
      email:"Please input an email.",
      password:"Please input a password."
    }
  }
  return auth;
}
 
const formatErrors = function(user){
  let passwordWarning = ""
  let emailWarning = ""

  if(user.validPassword === false){passwordWarning= `password doesn't seem to be correct`}
  if(user.validEmail === false){ emailWarning= `email doesn't seem to be correct`}

  return {user:null, emailWarning, passwordWarning}
}
