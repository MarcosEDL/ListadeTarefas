// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2Ol3KZZ7MQCjaSkM_9TgZk6uPlePvggI",
  authDomain: "listadetarefas-528a7.firebaseapp.com",
  projectId: "listadetarefas-528a7",
  storageBucket: "listadetarefas-528a7.appspot.com",
  messagingSenderId: "1010202414985",
  appId: "1:1010202414985:web:4667507900e6a7356bdb58",
  measurementId: "G-J5EMYEVBWC",
  databaseURL: "https://listadetarefas-528a7-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getDatabase();
//const tarefasRef = ref(database, "tarefas");

//get(tarefasRef).then((snapshot) => {
  //if(snapshot.exists()) {
    //const data = snapshot.val();
    //console.log("Dados de tarefas:", data);
  //} else {
    //console.log("Nenhum dado encontrado.");
  //}
//}).catch((error) => {
  //console.error("Erro ao ler dados:", error)
//});

export default app