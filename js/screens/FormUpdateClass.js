import BaseComponent from "../BaseComponent.js";
import InputWrapper from "../components/InputWrapper.js";
import SelectWrapper from "../components/SelectWrapper.js"
import { logIn } from "../models/user.js";
import { appendTo, validateEmail, date,filterDate } from "../utils.js";

export default class FormUpdateClass extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            // lưu dữ liệu người dùng nhập vào

            data: {
                name: `${this.props.dataUpdate ? this.props.dataUpdate.name : ''}`,
                numberOfStudent: `${this.props.dataUpdate ? this.props.dataUpdate.numberOfStudent : ''}`,
                teacher: `${this.props.dataUpdate ? this.props.dataUpdate.teacher : ''}`,
                id: `${this.props.dataUpdate ? this.props.dataUpdate.id : ''}`,
                studyTime: this.props.dataUpdate ? this.props.dataUpdate.studyTime : [],

            },
            err: {
                name: '',
                numberOfStudent: '',
                teacher: '',
                studyTime:[]
            }


        };
    }



    onChangeUpdate = (fieldName, fieldValue) => {
        //console.log(fieldName + ' = ' + fieldValue);
        let tmpState = this.state;

        tmpState.data[fieldName] = fieldValue.trim();


        this.setState(tmpState);
        //console.log(this.state,1);

    }

    handleClickCloseForm = () => {
        this.props.closeForm();
    }

    //--click studyTime 
    handleClickCalender=() => {
        let tmpState = this.state;
        tmpState.data.studyTime.push('');
        tmpState.err.studyTime.push('');
        this.setState(tmpState);
    }

    //change studyTime 
    onChangeUpdateCalen=(fieldValue,indexData) => {
        let tmpState = this.state;

        tmpState.data.studyTime[indexData] = fieldValue.trim();

        //tmpState.data.studyTime = filterDate(tmpState.data.studyTime)
        
        this.setState(tmpState);
        //console.log(this.state)
    }

    render() {


        let $card = document.createElement("div");
        $card.className = 'card';

        let $card_body = document.createElement("div");
        $card_body.className = 'card-body';

        $card.appendChild($card_body);

        let $div_titles = document.createElement("div");
        $div_titles.className = 'd-flex justify-content-between'
        let $h4_titles = document.createElement("h4");
        $h4_titles.innerHTML += `${this.props.title} Class`;
        let $button_titles = document.createElement("button");
        $button_titles.type = "button";
        $button_titles.className = 'btn btn-danger radius-20';
        $button_titles.onclick = this.handleClickCloseForm;
        let $i_title = document.createElement("i");
        $i_title.className = 'fadeIn animated bx bx-x';

        $button_titles.appendChild($i_title);
        $div_titles.appendChild($h4_titles);
        $div_titles.appendChild($button_titles)

        let $hr = document.createElement("hr");


        $card_body.appendChild($div_titles);
        $card_body.appendChild($hr);
        let $div_body = document.createElement("div");
        $card_body.appendChild($div_body);

        let $form = document.createElement("form");
        $div_body.appendChild($form);

        let _name = new InputWrapper({
            addClassInput: 'form-control radius-30',
            label: 'Name--',
            placeholder: 'Name Class: ',
            type: 'text',
            value: this.state.data.name,
            error: this.state.err.name,
            onchange: (event) => { this.onChangeUpdate('name', event.target.value); },
        })

        let _numberOfStudent = new InputWrapper({
            addClassInput: 'form-control radius-30',
            label: 'Number of Student',
            placeholder: 'Number of Student: ',
            type: 'number',
            value: this.state.data.numberOfStudent,
            error: this.state.err.numberOfStudent,
            onchange: (event) => { this.onChangeUpdate('numberOfStudent', event.target.value); },
        })

        let _teacher = new InputWrapper({
            addClassInput: 'form-control radius-30',
            label: 'Name Teacher',
            placeholder: 'Name Teacher: ',
            type: 'text',
            value: this.state.data.teacher,
            error: this.state.err.teacher,
            onchange: (event) => { this.onChangeUpdate('teacher', event.target.value); },
        })

        let $div_listCalendar = document.createElement('div');
        $div_listCalendar.className = 'form-group';

        let today = new Date();
        today = date(today)


        if (this.state.data.id != '') {
            appendTo($form, _name, _numberOfStudent, _teacher);
        } else {
            appendTo($form, _name, _numberOfStudent, _teacher);
        }



        let $div_action = document.createElement('div');
        $div_action.className = 'text-center';

        //---Button update
        let $button_update = document.createElement("button");
        $button_update.className = 'btn btn-warning';
        $button_update.type = 'submit';
        let $i_update = document.createElement('i');
        $i_update.className = 'fadeIn animated bx bx-edit-alt mr-2'

        $button_update.appendChild($i_update);
        $button_update.innerHTML += `${this.props.title}`;

        $form.onsubmit = this.handleUpdate

        $div_action.appendChild($button_update);
        $div_action.innerHTML += '&nbsp; &nbsp; &nbsp; &nbsp;'



        //--Button Cancel
        let $button_cancel = document.createElement("button");
        $button_cancel.className = 'btn btn-danger';
        $button_cancel.type = 'button';
        let $i_cancel = document.createElement('i');
        $i_cancel.className = 'fadeIn animated bx bx-x mr-2'
        $button_cancel.appendChild($i_cancel);
        $button_cancel.innerHTML += 'Hủy Bỏ';
        $button_cancel.onclick = () => {
            this.handleClickCancel();
        }
        $div_action.appendChild($button_cancel);

        let $br = document.createElement('br');

         //---- calender
        let $div_calender = document.createElement('div');
        $div_calender.className = 'form-group font-30 text-center'

        // let $in=document.createElement('input');
        // $in.type = 'text';
        // $in.setAttribute('data-role','calendarpicker');

        let $button_add_calender = document.createElement('button');
        $button_add_calender.className='btn btn-outline-info';
        $button_add_calender.innerHTML+='Thêm lịch học'

        let $i_calender = document.createElement('i');
        $i_calender.className = 'lni lni-circle-plus ml-2';
        $button_add_calender.appendChild($i_calender);
        $div_calender.appendChild($button_add_calender);
        
        //-----select day in calendar
        let $div_form_group_calendar=document.createElement('div');
        $div_form_group_calendar.className='form-group';
        let $label_calendar=document.createElement('label');
        $label_calendar.innerHTML+='Chọn lịch: ';
        $div_form_group_calendar.appendChild($label_calendar);

        this.state.data.studyTime.map((item, index) => {
            let _calendar = new InputWrapper({
                addClassInput: 'mt-2',
                placeholder: 'Choose Calendar: ',
                type: 'text',
                atributes: [{ key: 'data-min-date', value: `${today}` },
                { key: 'data-role', value: 'calendarpicker' },],
                value: item,
                error: this.state.err.studyTime[index],
                onchange: (event) => { this.onChangeUpdateCalen(event.target.value,index); },
            })
            appendTo($div_form_group_calendar,_calendar);
        })
        //----click calender
        if (this.state.data.id == '') {
            $button_add_calender.onclick=()=>{
                this.handleClickCalender();
            }
            $form.appendChild($div_form_group_calendar);
            $form.appendChild($div_calender);   
        }
        

        $form.appendChild($br); 
        $form.appendChild($div_action);

        

        return $card;
    }

    handleClickCancel = () => {
        this.props.clickCancel();
    }

    // clearForm = () => {
    //     let tmpState = this.state;
    //     tmpState.data.name = '';
    //     tmpState.data.className = 'Chọn lớp đăng kí';
    //     tmpState.data.yearOfBirth = '';
    //     tmpState.data.email = '';
    //     this.setState(tmpState);
    // }

    handleUpdate = (event) => {



        event.preventDefault(); // chặn chuyển hướng đến action
        let isPassed = true;
        let data = this.state.data;
        let errors = this.state.err;
        errors.name = '';
        errors.numberOfStudent='';
        errors.teacher='';

        if (data.name == '') {
            errors.name = 'Bạn ko được để trống';
            isPassed = false
        }

       

        if (data.numberOfStudent == '') {
            errors.numberOfStudent ='Bạn ko được để trống'
            isPassed = false
        }

        if (data.teacher == '') {
            errors.teacher ='Bạn ko được để trống'
            isPassed = false
        }

        data.studyTime.map((item,index) => {
            if(item.trim() == '') {
                errors.studyTime[index]='Bạn ko được để trống lịch học';
                isPassed = false
            }else{
                errors.studyTime[index]='';
            }
        })

        if(data.studyTime.length == 0) {
            isPassed = false
            alert('Bạn hãy chọn lịch học')
        }

        if (isPassed) {
            if (data.id === '') {
                this.props.addClass(data);
            }
            else {
                this.props.handleUpdateClass(data);

            }
            this.props.closeForm();
            //this.clearForm();
            return;
        }

        let tmpState = this.state;
        tmpState.err = errors;
        //console.log(this.state)
        this.setState(tmpState);


    }
}