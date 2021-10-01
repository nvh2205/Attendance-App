import BaseComponent from "../BaseComponent.js";
import Sidebar from "../components/Sidebar.js";
import { appendTo } from "../utils.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import TableStudent from "../components/TableStudent.js";
import InputWrapper from "../components/InputWrapper.js";
import FormUpdateStudent from "./FormUpdateStudent.js";
import { getAllStudent, getAllClass, updateStudent, register, deleteStudent, addUser } from "../models/user.js";





export default class ListStudent_copy extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            thElement: this.props.idUser == 'FPO9ngD4KTf2VW3euMiXVOa651X2' ? ['STT', 'Tên Lớp', 'Email', 'Tên', 'Năm Sinh', 'Hành Động'] : ['STT', 'Tên Lớp', 'Email', 'Tên', 'Năm Sinh'],
            searchValue: '',
            dataUpdate: {},
            isDisplayForm: false,
            allStudent: [],
            allClass: [],
            search: '',
            sortValue: null,
            rootAllStudent: []
        }
    }

    handleSelectStudent = (valueStudent) => {
        //console.log(valueStudent);
        let tmpState = this.state;
        tmpState.dataUpdate = valueStudent
        tmpState.isDisplayForm = true;

        this.setState(tmpState);
        //console.log(this.state);
    }

    handleUpdateStudent = (value) => {
        //console.log(value, 'update');
        updateStudent(value);
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('users').onSnapshot(snapshot => {
                    let x = this.state
                    x.isDisplayForm = false;
                    let data = snapshot.docs;
                    
                    
                    let dataAllStudent = [];

                     data.map((item) => {
                        const obj = { ...item.data(), id: item.id }
                        dataAllStudent.push(obj);
                    })

                    x.allStudent =[...dataAllStudent];
                    x.rootAllStudent= [...dataAllStudent];


                    this.setState(x);

                })
            }
        });
    }

    handleClickAdd = () => {
        let tmpState = this.state;
        tmpState.isDisplayForm = true;
        tmpState.dataUpdate = {};
        this.setState(tmpState);
    }

    //Close form when clicked
    closeForm = () => {
        let tmpState = this.state;
        // tmpState.dataUpdate=null;
        tmpState.isDisplayForm = false;
        this.setState(tmpState);
    }

    addStudent = (value) => {
        addUser(value.email, value.password, value.className, value.yearOfBirth, value.name, value.attendance, value.noAttendance);
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('users').onSnapshot(snapshot => {
                    let x = this.state

                    let data = snapshot.docs;

                    x.isDisplayForm = false;

                    let dataAllStudent = [];

                     data.map((item) => {
                        const obj = { ...item.data(), id: item.id }
                        dataAllStudent.push(obj);
                    })

                    x.allStudent =[...dataAllStudent];
                    x.rootAllStudent= [...dataAllStudent];

                    this.setState(x);

                })
            }
        });

        //console.log(value)

    }

    //Delete 
    handleDelete = (value) => {
        deleteStudent(value);
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('users').onSnapshot(snapshot => {
                    let x = this.state
                    x.isDisplayForm = false;
                    let data = snapshot.docs;

                    let dataAllStudent = [];

                     data.map((item) => {
                        const obj = { ...item.data(), id: item.id }
                        dataAllStudent.push(obj);
                    })

                    x.allStudent =[...dataAllStudent];
                    x.rootAllStudent= [...dataAllStudent];

                    this.setState(x);

                })
            }
        });
    }

    //search for students
    onChangeSearch = (fieldValue) => {
        //console.log('fieldName' + ' = ' + fieldValue);
        let tmpState = this.state;

        tmpState.search = fieldValue.trim();
        let rootAllStudent = tmpState.rootAllStudent
        tmpState.allStudent = [...rootAllStudent]
        this.setState(tmpState);
        //console.log(this.state,1);

    }

    //Chuyển sang create khi cancle
    clickCancel = () => {
        let tmpState = this.state;
        tmpState.isDisplayForm = true;
        tmpState.dataUpdate = {};
        this.setState(tmpState);
    }

    handleClickSearch = () => {
        let tmpState = this.state;

        let arrSearch = []

        tmpState.allStudent.forEach((item, index) => {
            if (item.name.toUpperCase().includes(tmpState.search.toUpperCase().trim())) {
                arrSearch.push(item);
            }
        })

        tmpState.allStudent = arrSearch;
        this.setState(tmpState);
    }

    //sort
    handleSort = (value) => {
        let tmpState = this.state;
        tmpState.allStudent.sort((a, b) => {
            if (a.name > b.name) return value;
            else if (a.name < b.name) return -value;
            else return 0;
        })
        tmpState.sortValue = value;
        this.setState(tmpState);
    }

    async componentDidMount() {
        let tmpState = this.state;
        let [allClass, allStudent] = await Promise.all([getAllClass(), getAllStudent()]);
        //let allClass= await getAllClass();
        tmpState.allClass = [...allClass];
        tmpState.allStudent = [...allStudent];
        tmpState.rootAllStudent = [...allStudent];
        this.setState(tmpState);
    }


    render() {
        //console.log(this.state.a,'a:')
        //console.log(this.props, 'props')
        let $container = document.createElement('div')
        $container.classList.add('wrapper')

        appendTo($container, new Sidebar());
        appendTo($container, new Header());


        // let $moadl_update = new ModalUpdateStudent(
        //     {
        //         dataUpdate: this.state.dataUpdate,
        //         errUpdate: this.state.errUpdate,

        //     })
        // appendTo($container, $moadl_update)

        let $page_wrapper = document.createElement('div')
        $page_wrapper.classList.add('page-wrapper');


        $container.appendChild($page_wrapper);

        let $page_content_wrapper = document.createElement('div');
        $page_content_wrapper.classList.add('page-content-wrapper');

        $page_wrapper.appendChild($page_content_wrapper);

        let $page_content = document.createElement('div');
        $page_content.classList.add('page-content');

        $page_content_wrapper.appendChild($page_content);

        let $page_breadcrumb = document.createElement('div');
        $page_breadcrumb.classList.add('page-breadcrumb', 'd-md-flex', 'justify-content-center', 'align-items-center', 'mb-3');

        $page_content.appendChild($page_breadcrumb);

        let $breadcrumb_title = document.createElement('div');
        $breadcrumb_title.classList.add('breadcrumb-title', 'pr-3');
        $breadcrumb_title.innerHTML += 'Danh Sách Học Sinh'

        $page_breadcrumb.appendChild($breadcrumb_title);

        let $line = document.createElement('div')
        $line.classList.add('line', 'mb-5');

        $page_content.appendChild($line);

        let $row_form = document.createElement('div');
        $row_form.classList.add('row');
        $page_content.appendChild($row_form);

        //--------Hiển thị Form
        let display_form = this.state.isDisplayForm;
        let $div_form = document.createElement('div');
        $div_form.className = 'col-12 col-lg-4';


        let $form_update = null;
        if (this.state.dataUpdate['id']) {

            //Update
            $form_update = new FormUpdateStudent({
                dataUpdate: this.state.dataUpdate,
                allClass: this.state.allClass,
                handleUpdateStudent: this.handleUpdateStudent,
                closeForm: this.closeForm,
                title: 'Update',
                clickCancel: this.clickCancel
            })
            //Create   a new

        }
        else {
            $form_update = new FormUpdateStudent({
                allClass: this.state.allClass,
                addStudent: this.addStudent,
                closeForm: this.closeForm,
                title: 'Create',
                clickCancel: this.clickCancel

            })
        }


        if (display_form === true) {
            $row_form.appendChild($div_form);
            appendTo($div_form, $form_update);
        }

        //---Hiển thị bảng
        let $div_table = document.createElement('div');
        let className_table = display_form === true ? 'col-12 col-lg-8' : 'col-12 col-lg-12';
        $div_table.className = `${className_table}`;

        $row_form.appendChild($div_table);

        let $card = document.createElement('div')
        $card.classList.add('card');

        $div_table.appendChild($card);

        let $card_body = document.createElement('div')
        $card_body.classList.add('card-body');

        $card.appendChild($card_body);

        let $card_title = document.createElement('div')
        $card_title.classList.add('card-title');

        $card_body.appendChild($card_title);

        let $h4_card_title = document.createElement('h4');
        $h4_card_title.classList.add('mb-0');
        $h4_card_title.innerHTML += 'Danh Sách Các Học Sinh';

        $card_title.appendChild($h4_card_title);

        let $hr = document.createElement('hr');
        $card_body.appendChild($hr);

        let $table_response = document.createElement('div');
        $table_response.classList.add('table-responsive');
        $card_body.appendChild($table_response);

        let $row_table_response = document.createElement('div');
        $row_table_response.classList.add('row');
        $row_table_response.style.width = "100%";

        $table_response.appendChild($row_table_response);

        let $div_column = document.createElement('div')
        $div_column.classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');

        $row_table_response.appendChild($div_column);

        let $button_add = document.createElement('button');
        $button_add.classList.add('btn', 'btn-primary');
        $button_add.type = "button";

        let $i_button_add = document.createElement('i');
        $i_button_add.classList.add('lni', 'lni-circle-plus', 'mr-2');

        $button_add.appendChild($i_button_add);
        $button_add.innerHTML += 'Thêm Học Sinh'

        //Add student
        $button_add.onclick = this.handleClickAdd;

        if (this.props.idUser == 'FPO9ngD4KTf2VW3euMiXVOa651X2') {
            $div_column.appendChild($button_add);
        }

        let $row_search_sort = document.createElement('div')
        $row_search_sort.classList.add('row', 'mb-3', 'mt-3');

        $div_column.appendChild($row_search_sort);

        let $div_search = document.createElement('div')
        $div_search.classList.add('col-xs-6', 'col-sm-6', 'col-md-6', 'col-lg-6');

        $row_search_sort.appendChild($div_search);

        let $div_input_search = document.createElement('div');
        $div_input_search.classList.add('input-group');

        $div_search.appendChild($div_input_search);

        let $input_search = new InputWrapper({

            type: 'text',
            value: this.state.search,
            placeholder: 'Nhập từ khóa...',
            onchange: (event) => {
                this.onChangeSearch(event.target.value);
            }
        })

        appendTo($div_input_search, $input_search);

        let $span_input_search = document.createElement('span');
        $span_input_search.classList.add('input-group-btn', 'ml-2');
        let $button_search = document.createElement('button');
        $button_search.classList.add('btn', 'btn-primary');
        $button_search.type = "button";
        let $i_search = document.createElement('i');
        $i_search.classList.add('fadeIn', 'animated', 'bx', 'bx-search', 'mr-2');
        $button_search.appendChild($i_search);
        $button_search.innerHTML += 'Tìm';

        $button_search.onclick = () => {
            this.handleClickSearch();
        }

        $span_input_search.appendChild($button_search);

        $div_input_search.appendChild($span_input_search);

        //.........Sort
        let $div_sort = document.createElement('div');
        $div_sort.classList.add('col-xs-6', 'col-sm-6', 'col-md-6', 'col-lg-6');

        $row_search_sort.appendChild($div_sort);

        let $div_btn_group_sort = document.createElement('div')
        $div_btn_group_sort.classList.add('btn-group');

        $div_sort.appendChild($div_btn_group_sort);

        let $button_sort = document.createElement('button');
        $button_sort.classList.add('btn', 'btn-primary');
        $button_sort.type = 'button';
        $button_sort.innerHTML += 'Sắp Xếp';

        $div_btn_group_sort.appendChild($button_sort);

        let $button_drop = document.createElement('button');
        $button_drop.type = 'button';
        $button_drop.classList.add('btn', 'btn-primary', 'bg-split-primary', 'dropdown-toggle', 'dropdown-toggle-split');
        $button_drop.setAttribute('data-toggle', 'dropdown');
        let $span_drop = document.createElement('span');
        $span_drop.classList.add('sr-only');
        $span_drop.innerHTML += 'Toggle Dropdown'
        $button_drop.appendChild($span_drop);

        $div_btn_group_sort.appendChild($button_drop);

        let $i_sort = document.createElement('i');
        $i_sort.className = 'fadeIn animated bx bx-check ml-1';

        let $div_drop_menu = document.createElement('div')
        $div_drop_menu.classList.add('dropdown-menu', 'dropdown-menu-right', 'dropdown-menu-lg-left');
        let $a_sort_az = document.createElement('p');
        $a_sort_az.classList.add('dropdown-item', 'p-sort');
        $a_sort_az.innerHTML += 'TÊN : A->Z';

        $a_sort_az.onclick = () => {
            this.handleSort(1);

        }

        let $a_sort_za = document.createElement('p');
        $a_sort_za.classList.add('dropdown-item', 'p-sort');
        $a_sort_za.innerHTML += 'TÊN : Z->A';
        $a_sort_za.onclick = () => {
            this.handleSort(-1);

        }


        if (this.state.sortValue == 1) {

            $a_sort_az.appendChild($i_sort)
        } else if (this.state.sortValue == -1) {
            $a_sort_za.appendChild($i_sort);
        }

        $div_drop_menu.appendChild($a_sort_az);
        $div_drop_menu.appendChild($a_sort_za);

        $div_btn_group_sort.appendChild($div_drop_menu);




        let $table = new TableStudent({
            thElement: this.state.thElement,
            tdElement: this.state.allStudent,
            handleSelectStudent: this.handleSelectStudent,
            handleDelete: this.handleDelete

        });

        appendTo($div_column, $table)




        var imported = document.createElement('script');
        imported.src = './assets/js/app.js'
        document.body.appendChild(imported)



        appendTo($container, new Footer())
        return $container;

    }
}