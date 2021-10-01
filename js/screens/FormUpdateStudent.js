import BaseComponent from "../BaseComponent.js";
import InputWrapper from "../components/InputWrapper.js";
import SelectWrapper from "../components/SelectWrapper.js"
import { logIn } from "../models/user.js";
import { appendTo, validateEmail } from "../utils.js";

export default class FormUpdateStudent extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            // lưu dữ liệu người dùng nhập vào

            data: {
                name: `${this.props.dataUpdate ? this.props.dataUpdate.name : ''}`,
                yearOfBirth: `${this.props.dataUpdate ? this.props.dataUpdate.yearOfBirth : ''}`,
                className: `${this.props.dataUpdate ? this.props.dataUpdate.className : 'Chọn lớp đăng kí'}`,
                email: `${this.props.dataUpdate ? this.props.dataUpdate.email : ''}`,
                id: `${this.props.dataUpdate ? this.props.dataUpdate.id : ''}`,
                password: '',
                confirmPassword: '',
                attendance: this.props.dataUpdate ? this.props.dataUpdate.attendance : [],
                noAttendance: this.props.dataUpdate ? this.props.dataUpdate.noAttendance : [],
                rootClassName: `${this.props.dataUpdate ? this.props.dataUpdate.className : ''}`,

            },
            err: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                className: ''
            }


        };
    }



    onChangeUpdate = (fieldName, fieldValue) => {
        //console.log(fieldName + ' = ' + fieldValue);
        let tmpState = this.state;

        if(fieldName != 'className'){
            console.log(fieldName + ' = ' + fieldValue)
            tmpState.data[fieldName] = fieldValue.trim();

        }else{
            tmpState.data[fieldName] = fieldValue;
        }


        //console.log(tmpState.data[fieldName])
        this.setState(tmpState);
        //console.log(this.state,1);

    }

    handleClickCloseForm = () => {
        this.props.closeForm();
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
        $h4_titles.innerHTML += `${this.props.title} Học Sinh`;
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
            placeholder: 'Name Student: ',
            type: 'text',
            value: this.state.data.name,
            error: this.state.err.name,
            onchange: (event) => { this.onChangeUpdate('name', event.target.value); },
        })

        let _yearOfBirth = new InputWrapper({
            addClassInput: 'form-control radius-30',
            label: 'yearOfBirth',
            placeholder: 'Year Of Birth: ',
            type: 'number',
            value: this.state.data.yearOfBirth,
            onchange: (event) => { this.onChangeUpdate('yearOfBirth', event.target.value); },
        })

        let _SelectWrapper = new SelectWrapper({
            addClass: 'radius-30',
            label: 'Class',
            value: this.state.data.className,
            error: this.state.err.className,
            option: this.props.allClass,
            onchange: (event) => {
                this.onChangeUpdate('className', event.target.value);
            }
        })


        let _email = new InputWrapper({
            addClassInput: 'form-control radius-30',
            label: 'Email',
            placeholder: 'Email',
            type: 'email',
            error: this.state.err.email,
            value: this.state.data.email,
            //oninput:this.handleInputChange('email'),
            onchange: (event) => {
                this.onChangeUpdate('email', event.target.value);
            }
        });

        let _password = new InputWrapper({
            addClassInput: 'form-control radius-30',
            label: 'Password',
            placeholder: 'Password',
            type: 'password',
            error: this.state.err.password,
            value: this.state.data.password,
            //oninput:this.hanldeOnInput('password'),
            onchange: (event) => {
                this.onChangeUpdate('password', event.target.value);
            }
        });

        let _confirmPassword = new InputWrapper({
            addClassInput: 'form-control radius-30',
            label: 'Confirm Password',
            placeholder: 'Confirm password',
            type: 'password',
            error: this.state.err.confirmPassword,
            value: this.state.data.confirmPassword,
            //oninput:this.handleInputChange('confirmPassword'),
            onchange: (event) => {
                this.onChangeUpdate('confirmPassword', event.target.value);
            }
        });

        if (this.state.data.id != '') {
            appendTo($form, _name, _yearOfBirth, _SelectWrapper);
        } else {
            appendTo($form, _name, _email, _password, _confirmPassword, _yearOfBirth, _SelectWrapper);
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

        let $br = document.createElement('br')
        $form.appendChild($br);
        $form.appendChild($div_action);

        return $card;
    }

    handleClickCancel = () => {
        this.props.clickCancel();
    }

    clearForm = () => {
        let tmpState = this.state;
        tmpState.data.name = '';
        tmpState.data.className = 'Chọn lớp đăng kí';
        tmpState.data.yearOfBirth = '';
        tmpState.data.email = '';
        this.setState(tmpState);
    }

    handleUpdate = (event) => {



        event.preventDefault(); // chặn chuyển hướng đến action
        let isPassed = true;
        let data = this.state.data;
        let errors = this.state.err;
        errors.name = '';
        errors.className = ''

        if (data.name == '') {
            errors.name = 'Bạn ko được để trống';
            isPassed = false
        }

        if (data.id == '') {
            if (data.email == '' || !validateEmail(data.email)) {
                errors.email = 'Invalid email';
                isPassed = false
            }

            if (data.password == '' || data.password.length < 6) {
                errors.password = 'Invalid password';
                isPassed = false
            }

            if (data.confirmPassword == '') {
                errors.confirmPassword = 'Invalid password confirmation';
                isPassed = false
            }

            if (data.password != '' && data.confirmPassword != '' && data.password != data.confirmPassword) {
                errors.confirmPassword = 'Password confirmation is not correct';
                isPassed = false
            }
        }

        if (data.className == 'Chọn lớp đăng kí') {
            errors.className = 'You need to choose the registration class'
            isPassed = false
        }



        if (isPassed) {
            if (data.id === '') {
                let indexClassName = this.props.allClass.findIndex((item) => item.name == data.className);
                let time_current = new Date();
                time_current = time_current.getTime();
                this.props.allClass[indexClassName].studyTime.map((item) => {
                    let time_study = new Date(item);
                    time_study = time_study.getTime();
                    if (time_study < time_current) {
                        let obj = {};
                        obj.content = '';
                        obj.date = item
                        data.noAttendance.push(obj);
                    }
                })







                this.props.addStudent(data);
            }
            else {

                if (data.className != data.rootClassName) {
                    let indexClassName = this.props.allClass.findIndex((item) =>{ 
                              
                       return item.name == data.className});
                    let time_current = new Date();
                    time_current = time_current.getTime();
                    data.noAttendance=[];
                    this.props.allClass[indexClassName].studyTime.map((item) => {
                        let time_study = new Date(item);
                        time_study = time_study.getTime();
                        if (time_study < time_current) {
                            let obj = {};
                            obj.content = '';
                            obj.date = item
                            data.noAttendance.push(obj);
                        }
                    })
                    data.attendance=[];
                   this.props.handleUpdateStudent(data);
                }else{

                    this.props.handleUpdateStudent(data);

                }   


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