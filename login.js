import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, set, push, ref, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
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

var email = document.getElementById('email')
var password = document.getElementById('password')

window.loginUser = function () {
    var obj = {
        email: email.value,
        password: password.value
    }
    console.log(obj)
    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (res) {
            alert("Login Successfully",res)

            var id = res.user.uid

            var reference = ref(db,`users/${id}`)

            onValue(reference,function(data){
                var responseUser = data.val()
                
                console.log(responseUser)
                localStorage.setItem("userData",JSON.stringify(responseUser))
                localStorage.setItem('key',JSON.stringify(id))
                window.location.href="todo/index.html"
            })


        }).catch(function(err){
            console.log(err)
        })
}