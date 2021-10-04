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
let usersRef = rtdb.ref(db, "/users");
let msg = document.getElementById('msg')
let sub = document.getElementById('sub')
let chats = document.getElementById('chats')
let users = document.getElementById('users')
let displayname = document.getElementById('display')
let auth = fbauth.getAuth(app);
let useremail = ''
let userId = ''

rtdb.onValue(titleRef, ss=>{
  let val = ss.val()
  let checkUser = rtdb.ref(db, `/users/${userId}/roles`)
  chats.innerHTML = ''
  rtdb.onValue(checkUser, ss => {
    let role = ss.val();
    if (role.admin == true) {
      for (let chat in val) {
        $("#chats").append(`<li>${val[chat].user}: ${val[chat].msg} <button class='del' data-id=${chat}>Delete Message</button> <button class='edit' data-id=${chat}>Edit Message</button></li>`);
      }
    }
    else {
      for (let chat in val) {
        if (useremail == val[chat].user) {
          $("#chats").append(`<li>${val[chat].user}: ${val[chat].msg} <button class='del' data-id=${chat}>Delete Message</button> <button class='edit' data-id=${chat}>Edit Message</button></li>`);
        }
        else {
          $("#chats").append(`<li>${val[chat].user}: ${val[chat].msg}</li>`);
        }
      }
    }
    $(".del").click(function () {
      let chatId = $(this).attr('data-id')
      let chatRef = rtdb.ref(db, `/chats/${chatId}`)
      rtdb.remove(chatRef)
})
    $(".edit").click(function () {
      let chatId = $(this).attr('data-id')
      let chatRef = rtdb.ref(db, `/chats/${chatId}`)
      rtdb.update(chatRef, {
      msg: msg.value
    })
})
  })
  rtdb.onValue(usersRef, ss=>{
  let val = ss.val()
  users.innerHTML = ''
  for (let uid in val) {
    let user = document.createElement('li');
    users.appendChild(user)
    user.innerText = val[uid].email
  }
  })
});

let sendMsg = () => {
  let display = displayname.value
  if (display) {
    rtdb.push(titleRef, {
      msg: msg.value,
      user: display
    })
    msg.value = ''
  }
  else if (!display) {
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
    let emailRef = rtdb.ref(db, `/users/${uid}/email`)
    rtdb.set(userRoleRef, true);
    rtdb.set(emailRef, email);
  }).catch(function(error) {
    var errorMessage = error.message;
    alert(errorMessage);
  });
});
$("#login").on("click", ()=>{
  let email = $("#logemail").val();
  let pwd = $("#logpass").val();
  fbauth.signInWithEmailAndPassword(auth, email, pwd).then(
    somedata=>{
      console.log(somedata);
    }).catch(function(error) {
      var errorMessage = error.message;
      alert(errorMessage);
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
        $(".panel").show();
        $(".users").show();
        useremail = user.email;
        userId = user.uid
        renderUser(user);
      } else {
        $(".login").show();
        $(".register").hide()
        $(".background").hide();
        $(".panel").hide();
        $(".users").hide();
        $("#app").html("");
      }
});

$("#regButton").on("click", () => {
  $(".register").toggle()
  $(".login").toggle()
})
sub.addEventListener("click", sendMsg)