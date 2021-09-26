
import "./router.js";

//let $app = document.getElementById('app');


// let allClass = await getAllClass();
// let allStudent=await getAllStudent() ;
//console.log(allStudent);
//let [allClass, allStudent] = await Promise.all([ getAllClass(), getAllStudent()])
//let idUser=null;
// await auth.onAuthStateChanged(user=>{
//     if(user){
//         idUser = user.uid;
//     }
// });

//console.log(allClass, allStudent)



//List student
// allStudent.map((student,index)=>{
//     delete student.attendance;
//     delete student.noAttendance
// })
//appendTo($app, new ListStudent_copy({allStudent: allStudent,idUser: idUser,allClass:allClass}));


//atten-------
// allClass.map((item,index)=>{
//     let listStudent=[];
//     allStudent.map((student,indexStuden)=>{
//         if(student.className==item.name){
//             listStudent.push(student);
            
//         }
//     })
//     item.studenInClass=listStudent;
// })
//----------
//atten-------
//appendTo($app,new Attendance({allClass:allClass,allStudent:allStudent,idUser: idUser}))

let $app = document.getElementById('app');

window.onload = function() {
    auth.onAuthStateChanged((user) => {
        console.log(user);
        if(user != null) {
            router.navigate('/index');
        } else {
            router.navigate('/login');
        }
    });
}

//---list class


//appendTo($app, new ListClass({allStudent: allStudent,idUser: idUser,allClass:allClass}),new ModalWarning());

// var imported= document.createElement('script');
// imported.src='./assets/New folder/assets/js/app.js'
// document.body.appendChild(imported)


