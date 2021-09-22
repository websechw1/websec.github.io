// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import * as fbauth from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCa5TpRrrlL5pAWbhEqyR72GsvrrdblreY",
    authDomain: "discord-f9823.firebaseapp.com",
    databaseURL: "https://discord-f9823-default-rtdb.firebaseio.com",
    projectId: "discord-f9823",
    storageBucket: "discord-f9823.appspot.com",
    messagingSenderId: "488378244438",
    appId: "1:488378244438:web:6cadd89ee24e0cb2330af7",
    measurementId: "G-NDZL27Q5GR"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

let db = rtdb.getDatabase(app);
let titleRef = rtdb.ref(db, "/chats");
let msg = document.getElementById('msg')
let sub = document.getElementById('sub')
let chats = document.getElementById('chats')
let username = document.getElementById('username')
let auth = fbauth.getAuth(app);
let useremail = ''
rtdb.onValue(titleRef, ss=>{
  let val = ss.val()
  chats.innerHTML = ''
  for (let chat in val) {
    let newMsg = document.createElement('li')
    chats.appendChild(newMsg)
    newMsg.innerText = val[chat].user + ': ' +val[chat].msg
  }
});

let sendMsg = () => {
  let user = username.value
  console.log(useremail)
  if (useremail) {
    rtdb.push(titleRef, {
      msg: msg.value,
      user: useremail
    })
    msg.value = ''
  }
  else {
    alert('login')
  }
}

$("#register").on("click", ()=>{
  let email = $("#regemail").val();
  let p1 = $("#regpass1").val();
  let p2 = $("#regpass2").val();
  if (p1 != p2){
    alert("Passwords don't match");
    return;
  }
  fbauth.createUserWithEmailAndPassword(auth, email, p1).then(somedata=>{
    let uid = somedata.user.uid;
    let userRoleRef = rtdb.ref(db, `/users/${uid}/roles/user`);
    rtdb.set(userRoleRef, true);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
});
$("#login").on("click", ()=>{
  let email = $("#logemail").val();
  let pwd = $("#logpass").val();
  fbauth.signInWithEmailAndPassword(auth, email, pwd).then(
    somedata=>{
      console.log(somedata);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});
let renderUser = function(userObj){
  $("#app").append(`<button type="button" id="logout">Logout</button>`);
  $("#logout").on("click", ()=>{
    fbauth.signOut(auth);
  })
}
fbauth.onAuthStateChanged(auth, user => {
      if (!!user){
        $(".login").hide();
        $(".register").hide()
        $("#app").show();
        $(".background").show();
        useremail = user.email;
        renderUser(user);
      } else {
        $(".login").show();
        $(".register").hide()
        $(".background").hide();
        $("#app").html("");
      }
});

$("#regButton").on("click", () => {
  $(".register").toggle()
  $(".login").toggle()
})
sub.addEventListener("click", sendMsg)