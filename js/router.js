import LogInScreen from "./screens/LoginScreen.js";
import RegisterScreen from './screens/RegisterScreen.js';
import ListClass from "./screens/ListClass.js";
import ListStudent from "./screens/ListStudent.js";
import Attendance from './screens/Attendance.js';
import { getAllClass, getAllStudent,selectStudent,getImgUser } from './models/user.js'
import InforStudent from "./screens/InforStudent.js";
import { appendTo } from "./utils.js";
import ModalWarning from './screens/ModalWarning.js'
let router = new Navigo(null, true, '#');

//let [allClass, allStudent] = await Promise.all([getAllClass(), getAllStudent()])

let $app = document.getElementById('app');

let idUser = null;
await auth.onAuthStateChanged(user => {
    if (user != null) {
        idUser = user.uid;
        router.navigate('/index');
    } else {
        router.navigate('/login');
    }
});

router.on('/login', function () {
    $app.innerHTML = '';
    appendTo($app, new LogInScreen(),new ModalWarning({content:'Tên đăng nhập hoặc mật khẩu không đúng'}));
}).resolve();

router.on('/register', function () {
    $app.innerHTML = '';
    appendTo($app, new RegisterScreen(),new ModalWarning({content:'Email đã được đăng kí'}));
}).resolve();

//-------Khai bao de truyen props info
// let [inforStudent,imgStudent]=[{},{}]
// if(idUser=='FPO9ngD4KTf2VW3euMiXVOa651X2'){
//     [inforStudent,imgStudent]=[{name:'ADMIN',className:'ADMIN',email:'ADMIN',yearOfBirth:'ADMIN'},{link:'./assets/images/avatar-admin.jpg'}]
// }else{
//      [inforStudent,imgStudent]= await Promise.all([selectStudent(idUser),getImgUser(idUser)]) 

// }

router.on('/index', function () {
    if (!auth.currentUser) {
        router.navigate('/login');
        return;
    }
    

    $app.innerHTML = '';
    appendTo($app, new InforStudent(),new ModalWarning({content:"Upload file successfully",contenHeader:"Success"}));
}).resolve();


router.on('/list-student', function () {
    $app.innerHTML = '';
    appendTo($app, new ListStudent({ idUser: idUser }),new ModalWarning({content:'Email đã được đăng kí'}));
}).resolve();


router.on('/list-class', function () {
    $app.innerHTML = '';
    appendTo($app, new ListClass({  idUser: idUser }));
}).resolve();

router.on('/attendance', function () {
    // let allClassNew=[...allClass];
    // allClassNew.map((item, index) => {
    //     let listStudent = [];
    //     allStudent.map((student, indexStuden) => {
    //         if (student.className == item.name) {
    //             listStudent.push(student);

    //         }
    //     })
    //     item.studenInClass = listStudent;
    // })
    $app.innerHTML = '';
    appendTo($app, new Attendance({ idUser: idUser }));
}).resolve();

window.router = router;