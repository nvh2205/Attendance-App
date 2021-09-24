import { appendTo } from './utils.js'
import RegisterScreens from './screens/RegisterScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import InforStudent from './screens/InforStudent.js'
import ListStudent_copy from './screens/ListStudent-copy.js'
import {getAllClass,getAllStudent} from './models/user.js'
import ModalUpdateStudent from './screens/ModalUpdateStuden.js'
import ModalWarning from "./screens/ModalWarning.js";
import Attendance from './screens/Attendance.js'
let $app = document.getElementById('app');


// let allClass = await getAllClass();
// let allStudent=await getAllStudent() ;
//console.log(allStudent);
let [allClass, allStudent] = await Promise.all([ getAllClass(), getAllStudent()])
let idUser=null;
await auth.onAuthStateChanged(user=>{
    if(user){
        idUser = user.uid;
    }
});

//console.log(allClass, allStudent)

allClass.map((item,index)=>{
    let listStudent=[];
    allStudent.map((student,indexStuden)=>{
        if(student.className==item.name){
            listStudent.push(student);
            
        }
    })
    item.studenInClass=listStudent;
})


//appendTo($app, new ListStudent_copy({allStudent: allStudent,idUser: idUser,allClass:allClass}),new ModalWarning());
//appendTo($app,new ListStudent())
appendTo($app,new Attendance({allClass:allClass,allStudent:allStudent,idUser: idUser}))





// var imported= document.createElement('script');
// imported.src='./assets/New folder/assets/js/app.js'
// document.body.appendChild(imported)


