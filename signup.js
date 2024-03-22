import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, set, push, ref, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAudb43Bz9eQY6ap25ZEbxUKNYHUPEdVSw",
    authDomain: "fmp-todo-app-c63af.firebaseapp.com",
    projectId: "fmp-todo-app-c63af",
    storageBucket: "fmp-todo-app-c63af.appspot.com",
    messagingSenderId: "450310694108",
    appId: "1:450310694108:web:d251ab333413d201f00019",
    measurementId: "G-XY93ZJ5L8Z"

    // Your configuration goes here
};





const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();

var userName = document.getElementById('userName')
var email = document.getElementById('email')
var password = document.getElementById('password')

window.signupUser = function () {
    var obj = {
        userName: userName.value,
        email: email.value,
        password: password.value
    }
    console.log(obj)
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (res) {
            alert("User Created Successfully",res)

            obj.id = res.user.uid

            var reference = ref(db,`users/${obj.id}`)
            set(reference,obj).then(function(){
                console.log("User Added in Database")
                localStorage.setItem('key',JSON.stringify(obj.id))
                window.location.href="todo/index.html"
            }).catch(function(dbError){
                console.log("Database Error",dbError)
            })
        }).catch(function(err){
            console.log(err)
        })
}