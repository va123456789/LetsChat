var firebaseConfig = {
    apiKey: "AIzaSyDpg72k5sn5HQhWcNWkmLyCmEXz1IlJh2k",
    authDomain: "kwitter-a39ba.firebaseapp.com",
    databaseURL: "https://kwitter-a39ba-default-rtdb.firebaseio.com",
    projectId: "kwitter-a39ba",
    storageBucket: "kwitter-a39ba.appspot.com",
    messagingSenderId: "997609471816",
    appId: "1:997609471816:web:bc4aa8781574ebb9d0bd7d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name - " + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}

getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}