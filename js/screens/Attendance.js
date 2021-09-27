
import SelectClassAtte from "../components/SelectClassAtte.js";
import BaseComponent from "../BaseComponent.js";
import Sidebar from "../components/Sidebar.js";
import { appendTo, renderHtml } from "../utils.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import InputWrapper from "../components/InputWrapper.js";
import TableAtten from "../components/TableAtten.js";
import { logIn, getAllClass, getAllStudent, updateStudent,register,deleteStudent } from "../models/user.js";

export default class Attendance extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            sortValue: null,
            searchValue: [],
            allClass: [],
            selectClass: {},
            indexSelectClass: null,
            checkEdit: false,
            noteAtten:'',
            allStudent: [],
        }
    }

    async componentDidMount() {
        let tmpState = this.state;
        let [allClass, allStudent] = await Promise.all([getAllClass(), getAllStudent()]);
        //let allClass= await getAllClass();

       
        tmpState.selectClass=allClass[1];
        tmpState.allStudent=[...allStudent];
        
        let allClassNew=[...allClass];
        allClassNew.map((item, index) => {
            let listStudent = [];
            allStudent.map((student, indexStuden) => {
                if (student.className == item.name) {
                    listStudent.push(student);
    
                }
            })
            item.studenInClass = listStudent;
        })
        tmpState.allClass=[...allClassNew];
        this.setState(tmpState);
    }

    onHandleSelectClass = (value, index) => {
        const tmpState = this.state;
        tmpState.selectClass = value;
        tmpState.indexSelectClass = index;
        tmpState.searchValue=[];
        tmpState.search='';
        this.setState(tmpState);

    }

    onHandleClickEdit = (indexStudent, atten, action) => {
        const tmpState = this.state;

        //let content = tmpState.noteAtten
        
        let student = tmpState.selectClass.studenInClass[indexStudent];

        let indexAtten = student.attendance.findIndex((item) => item.date == atten);

        let indexNoAtten =student.noAttendance.findIndex((item) => item.date == atten)

        if (action == 'push' && indexAtten == -1) {
            student.attendance.push({date:atten,content:''});
            student.noAttendance.splice(indexNoAtten,1);
        } else if (action == 'remove' && indexAtten != -1) {
            student.attendance.splice(indexAtten, 1);
            student.noAttendance.push({date:atten,content:''});
        }

        tmpState.selectClass.studenInClass[indexStudent] = student;
        console.log(this.state,'state')

         updateStudent(student);
        this.setState(tmpState);
    }

    handleClickEdit = () => {
        let tmpState = this.state;
        tmpState.checkEdit = !tmpState.checkEdit;
        //tmpState.selectClass
        this.setState(tmpState);
    }

    //---Note: Attendance
    onChangeComment = (indexStudent, atten,valueComment) => {
       // console.log(indexStudent, atten,valueComment,'yl')

        const tmpState = this.state;

        //let content = tmpState.noteAtten
        
        let student = tmpState.selectClass.studenInClass[indexStudent];

        let indexAtten = student.attendance.findIndex((item) => item.date == atten);

        let indexNoAtten =student.noAttendance.findIndex((item) => item.date == atten)

        if(indexAtten == -1){
            student.noAttendance[indexNoAtten] = {date:atten,content:valueComment};
        }else{
            student.attendance[indexAtten] = {date:atten,content:valueComment};
        }

        tmpState.selectClass.studenInClass[indexStudent] = student;
        console.log(this.state,'state')

         updateStudent(student);
        this.setState(tmpState);
    }

    //---search
    onChangeSearch = (fieldValue) => {
        //console.log('fieldName' + ' = ' + fieldValue);
        let tmpState = this.state;

        tmpState.search= fieldValue.trim();

        tmpState.searchValue = '';

        this.setState(tmpState);
       
    }

    handleClickSearch=()=>{
        let tmpState = this.state;

        let arrSearch=[]

        tmpState.selectClass.studenInClass.forEach((item,index)=>{
            if (item.name.toUpperCase().includes(tmpState.search.toUpperCase().trim())) {
                arrSearch.push(item);
            }
        })
        
        if(arrSearch.length == 0){
           
            arrSearch.push('No results found');
        }

        tmpState.searchValue=arrSearch;
        this.setState(tmpState);
        
    }

    handleSort=(value)=>{
        let tmpState = this.state;
        tmpState.selectClass.studenInClass.sort((a,b)=>{
            if(a.name > b.name) return value;
            else if(a.name < b.name) return -value;
            else return 0;
        })
        tmpState.sortValue=value;
        this.setState(tmpState);
    }

    render() {
        let $container = document.createElement('div')
        $container.classList.add('wrapper')

        appendTo($container, new Sidebar());
        appendTo($container, new Header());




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
        $page_breadcrumb.classList.add('page-breadcrumb',  'd-md-flex', 'justify-content-center', 'align-items-center', 'mb-3');

        $page_content.appendChild($page_breadcrumb);

        let $breadcrumb_title = document.createElement('div');
        $breadcrumb_title.classList.add('breadcrumb-title', 'pr-3');
        $breadcrumb_title.innerHTML += 'Thông Tin Điểm Danh'

        $page_breadcrumb.appendChild($breadcrumb_title);

        let $line = document.createElement('div')
        $line.classList.add('line', 'mb-5');

        $page_content.appendChild($line);

        let $card = document.createElement('div')
        $card.className = 'card';

        $page_content.appendChild($card);

        let $card_body = document.createElement('div');
        $card_body.className = 'card-body';

        $card.appendChild($card_body);

        appendTo($card_body, new SelectClassAtte({
            classList: this.state.allClass,
            indexSelectClass: this.state.indexSelectClass,
            onHandleSelectClass: this.onHandleSelectClass,

        }));

        let $hr_ = document.createElement('hr');
        $card_body.appendChild($hr_);

        let $div_table_responsive = document.createElement('div');
        $div_table_responsive.className = 'table-responsive';

        $card_body.appendChild($div_table_responsive);

        let $div_row_responsive = document.createElement('div')
        $div_row_responsive.className = 'row';
        $div_row_responsive.setAttribute('style', 'width:100%');

        $div_table_responsive.appendChild($div_row_responsive);

        let $div_col = document.createElement('div')
        $div_col.className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12';

        $div_row_responsive.appendChild($div_col);
        //search------sort
        let $row_search_sort = document.createElement('div')
        $row_search_sort.classList.add('row', 'mb-3', 'mt-3');

        $div_col.appendChild($row_search_sort);

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
        $div_sort.classList.add('col-xs-6', 'col-sm-6', 'col-md-6', 'col-lg-6', 'd-flex');

        $row_search_sort.appendChild($div_sort);

        let $div_btn_group_sort = document.createElement('div')
        $div_btn_group_sort.classList.add('btn-group', 'pr-5', 'vertical-dash');

        $div_sort.appendChild($div_btn_group_sort);

        let $button_sort = document.createElement('button');
        $button_sort.classList.add('btn', 'btn-primary');
        $button_sort.type = 'button';
        $button_sort.innerHTML += 'Sắp Xếp';

        $div_btn_group_sort.appendChild($button_sort);

        //-------------Edit
        if (this.props.idUser == 'FPO9ngD4KTf2VW3euMiXVOa651X2') {

            //-------------Edit 
            let $div_edit = document.createElement('div');
            $div_edit.className = 'ml-3';

            $div_sort.appendChild($div_edit);

            //-------update-atten
            let $button_update = document.createElement('button');
            $button_update.classList.add('btn', 'btn-warning', 'ml-5');
            $button_update.type = 'button';

            let $i_update = document.createElement('i');
            $i_update.classList.add('fadeIn', 'animated', 'bx', 'bx-pencil', 'mr-2');

            $button_update.onclick = () => {
                this.handleClickEdit();
            }

            $button_update.appendChild($i_update);
            $button_update.innerHTML += this.state.checkEdit == true ? 'Complete' : 'Edit ';
            $div_edit.appendChild($button_update);
            $div_edit.appendChild(document.createTextNode('\u00A0\u00A0\u00A0\u00A0'));
          
        }


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
        $a_sort_az.classList.add('dropdown-item','p-sort');
        $a_sort_az.innerHTML += 'TÊN : A->Z';

        $a_sort_az.onclick=()=>{
            this.handleSort(1);
            
        }

        let $a_sort_za = document.createElement('p');
        $a_sort_za.classList.add('dropdown-item','p-sort');
        $a_sort_za.innerHTML += 'TÊN : Z->A';
        $a_sort_za.onclick=()=>{
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

        if(this.state.searchValue[0]=='No results found'){
            let $h4_seach=document.createElement('h4');
            $h4_seach.className='text-center';
            $h4_seach.innerHTML+='Không có kết quả bạn tìm :(('
            $div_col.appendChild($h4_seach)
        }
         if(this.state.selectClass == {}){
            let $h4_seach=document.createElement('h4');
            $h4_seach.className='text-center';
            $h4_seach.innerHTML+='Không có kết quả bạn tìm :(('
            $div_col.appendChild($h4_seach)
        }
        if(this.state.selectClass.id){
            let $table_atter = new TableAtten({
                selectClass: this.state.selectClass,
                //idUser: this.props.idUser,
                searchValue:this.state.searchValue,
                checkEdit: this.state.checkEdit,
                noteAtten:this.state.noteAtten,
                onHandleEditAtten: (inedxStudent, indexAtten, action) => { this.onHandleClickEdit(inedxStudent, indexAtten, action); },
                onChangeComment:this.onChangeComment,
            });
    
            appendTo($div_col, $table_atter);

        }
        //...........table
        



        var imported = document.createElement('script');
        imported.src = './assets/js/app.js'
        document.body.appendChild(imported)


        return $container;


    }
}