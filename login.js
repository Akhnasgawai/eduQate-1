document.getElementById("getOtp").addEventListener("submit", (event) => {
  event.preventDefault();
});
document.getElementById("login").addEventListener("submit", (event) => {
  event.preventDefault();
});

var getOtp = document.getElementById("getOtp");
var login = document.getElementById("login");
var register = document.getElementById("register");
var btn = document.getElementById("btn");

function registered() {
  getOtp.style.display = "none";
  login.style.display = "none";
  register.style.display = "block";
  btn.style.left = "110px";
}

function logined() {
  getOtp.style.display = 'block';
  login.style.display = "none";
  register.style.display = "none";
  btn.style.left = "0";
}
render();

function render() {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  recaptchaVerifier.render();
}
firebase.auth().onAuthStateChanged(function (user) {
  console.log(user);
  if (user) {
    location.replace("homepage.html");
  }
});

function phoneAuth() {
  var number = document.getElementById("phoneNumber").value;
  const loginFields = document.getElementById("login");
  console.log(loginFields);
  const otpGenerate = document.getElementById("getOtp");

  firebase
    .auth()
    .signInWithPhoneNumber(number, window.recaptchaVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      coderesult = confirmationResult;
      loginFields.style.display = "block";
      otpGenerate.style.display = "none";
    })
    .catch(function (error) {
      toastr.info(error.message);
    });
}
// function for code verify
function codeverify() {
  var code = document.getElementById("otpfield").value;
  coderesult
    .confirm(code)
    .then(function () {
      
    })
    .catch(function () {
      document.getElementById("otperror").style.visibility = "visible";
    });
}
