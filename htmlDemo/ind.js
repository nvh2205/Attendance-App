// let nameInput = document.getElementById('name');
// let titleInput = document.getElementById('title');
// let priceInput = document.getElementById('price');


// let insert = document.getElementById('insert');
// let select = document.getElementById('select');
// let update = document.getElementById('update');

// let delete_btn = document.getElementById('delete');



// const add_cars_autoId=(name,title,price) => {
//     db.collection('Cars').add(
//         {
//             name:name,
//             price:price,
//             title:title,
            
//         }
//     ).then(()=>{
//         console.log('Successfully added')
//     })
//     .catch(err=>{
//         console.log('Error',err.message)
//     })
// }


// //Add custom ID
// const add_cars_customId=(name,price,title)=>{
//     db.collection('Cars').doc(price).set(
//         {
//             name:name,
//             price:price,
//             title:title,
            
//         }
//     ).then(()=>{
//         console.log('Successfully added')
//     })
//     .catch(err=>{
//         console.log('Error',err.message)
//     })
// }


// //.........Update
// const update_cars_customId=(name,price,title)=>{
//     db.collection('Cars').doc(price).update(
//         {
//             name:name,
//             price:price,
//             title:title,
            
//         }
//     ).then(()=>{
//         console.log('Successfully added')
//     })
//     .catch(err=>{
//         console.log('Error',err.message)
//     })
// }

// //.........Delete
// const delete_cars_customId=(name,price,title)=>{
//     db.collection('Cars').doc(price).delete(
//         {
//             name:name,
//             price:price,
//             title:title,
            
//         }
//     ).then(()=>{
//         console.log('Successfully added')
//     })
//     .catch(err=>{
//         console.log('Error',err.message)
//     })
// }

// //..............read data
// const read_cars_customId=(price)=>{
//     db.collection('Cars').doc(price).get()
//         .then((doc)=>{
//             if(doc.exists){
//                 nameInput.value=doc.data().name;
//                 titleInput.value=doc.data().title;
//             }
//             else{
//                 console.log('Err')
//             }
//         })
// }

// const read_cars_customId1=async ()=>{
//     const arr=[];
//     await db.collection('Cars').get().then((querySnapshot) => {
       
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             const obj = {...doc.data(),id:doc.id}
//             arr.push(obj);
//             console.log(doc.id, " => ", doc.data());
//         });
        
       
//     })
//     return arr
  
    
// }

// const  a = async ()=>{
//     let data = await read_cars_customId1();
//     console.log(data)
//     return data
// }

// const b = await read_cars_customId1();
// console.log (b);




// //insert
// insert.onclick = ()=>{
//     let name=nameInput.value;

//     let title=titleInput.value;

//     let price=priceInput.value;
//     add_cars_customId(name, price, title)

// }

// update.onclick=() =>{
//     let name=nameInput.value;

//     let title=titleInput.value;

//     let price=priceInput.value;
//     update_cars_customId(name, price, title)
// }


// select.onclick=() =>{

//     let price=priceInput.value;

//     read_cars_customId(price)
// }

let p = document.getElementById('p')

import {getAllClass} from './abc.js';
import { logIn,updateClass,getAllStudent } from './abc.js';

logIn('admin@gmail.com',123456);

var a = await getAllClass();

console.log(a)

const newOb=
    {   id:"Xq5PP2RvLCNifpl9Tsvp",
        name:'L',
        teacher: 'Lia',
        numberOfStudent:40

    };
updateClass(newOb)


let abc=[];
const getAllStudent1 = async (listClass) => {
    //const listClass = await getAllClass();
    const dataAllStudent = [];
    let a = [];
    let a1=[];
     a = listClass.map(async (item, index) => {
        let b =[];
        await db.collection(`/classes/${item.id}/studentList`).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const obj = { ...doc.data(), id: doc.id }
                    console.log(doc.id, " => ", doc.data());
                    b.push(obj);
                    dataAllStudent.push(obj)
                    abc.push(obj)
                });
                

            })
            .catch(err => {
                console.log('Get All Student Error', err.message)
            })

         return b;   
    })
    console.log(a,'a')
    a.forEach((item) => {
        item.then((data) => {
           a1.push(data);
        })
    })
    //a[1].then((data) => {console.log(data)});
     return dataAllStudent;
}
let c= await getAllStudent(a);
 console.log(c)


