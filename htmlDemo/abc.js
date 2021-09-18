//--Get list class
export async function logIn(email, password) {

    try {
        await auth.signInWithEmailAndPassword(email, password);
        console.log('success')
    } catch (e) {
        console.log('error:', e.message)
    }

}

//------------Class---=--------------------------------
export const getAllClass = async () => {
    const dataAllClass = [];
    await db.collection('classes').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const obj = { ...doc.data(), id: doc.id }
                dataAllClass.push(obj);

            });

        })
        .catch(err => {
            console.log('Error', err.message)
        })
    return dataAllClass;
}


//--Select class 
export const selectClass = async (idClass) => {
    const selectClass = {}
    await db.collection('classes').doc(idClass).get()
        .then((doc) => {
            if (doc.exists) {
                const obj = { ...doc.data(), id: doc.id }
                selectClass = JSON.parse(JSON.stringify(obj));
            }
            else {
                console.log('Err')
            }

        })

    return selectClass;

}



//-Update class 
export const updateClass = async (newClass) => {

    await db.collection('classes').doc(newClass.id).update({
        name: newClass.name,
        teacher: newClass.teacher,
        numberOfStudent: newClass.numberOfStudent,
    })
        .then(() => { console.log('Update Succes') })
        .catch(err => { console.log('Update Err:', err.message) })

}


//-Delete Class 
export const deleteClass = async (deleteClass) => {

    await db.collection('classes').doc(deleteClass.id).delete()
        .then(() => { console.log('Delete Succes') })
        .catch(err => { console.log('Err Delete', err.message) })
}



//-------------------------Student --------------------
//Get all students
export const getAllStudent = async (listClass) => {

    const functionThatReturnsAPromise = item => { //a function that returns a promise
        return db.collection(`/classes/${item.id}/studentList`).get()
    }

    //handle get data student
    const doSomethingAsync = async item => {
        let arrStudent = [];
        await functionThatReturnsAPromise(item).then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const obj = { ...doc.data(), id: doc.id, idClass:item.id }
                arrStudent.push(obj);
            });
        })
            .catch(err => {
                console.log('Get All Student Error', err.message)
            })
        return arrStudent
    }

    let listStudent = [];
    //Concurrent handling of map functions
    const getData = async () => {
        return Promise.all(listClass.map(item => doSomethingAsync(item)))
    }

    //Get data from getData function then save list student
    await getData().then(data => {
        data.forEach((item) => {
            item.forEach((itemChild) => {
                listStudent.push(itemChild);
            })
        })
    })

    return listStudent;
}


//Get student information
export const getStudent = async (student) => {

    
    const selectClass = {}
    await db.collection(`/classes/${student.idClass}/studentList/${student.id}`).get()
        .then((doc) => {
            if (doc.exists) {
                const obj = { ...doc.data(), id: doc.id,idClass:student.idClass }
                selectClass = JSON.parse(JSON.stringify(obj));
            }
            else {
                console.log('Err')
            }

        })

    return selectClass;

}
