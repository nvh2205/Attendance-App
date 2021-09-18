import { appendTo } from './utils.js'
import RegisterScreens from './screens/RegisterScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import InforStudent from './screens/InforStudent.js'
import ListStudent_copy from './screens/ListStudent-copy.js'
import {getAllClass,getAllStudent} from './models/user.js'
import ModalUpdateStudent from './screens/ModalUpdateStuden.js'
import ModalWarning from "./screens/ModalWarning.js";

let $app = document.getElementById('app');


let allClass = await getAllClass();
let allStudent=await getAllStudent() ;
//console.log(allStudent);
let idUser=null;
await auth.onAuthStateChanged(user=>{
    if(user){
        idUser = user.uid;
    }
});


appendTo($app, new ListStudent_copy({allStudent: allStudent,idUser: idUser,allClass:allClass}),new ModalWarning());
//appendTo($app,new ListStudent())





var imported= document.createElement('script');
imported.src='./assets/New folder/assets/js/app.js'
document.body.appendChild(imported)


