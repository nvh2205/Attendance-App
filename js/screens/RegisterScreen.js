import BaseComponent from "../BaseComponent.js";
import InputWrapper from "../components/InputWrapper.js";
import SelectWrapper from "../components/SelectWrapper.js";
import { register, getAllClass } from "../models/user.js"
import { appendTo, validateEmail, date } from "../utils.js";



export default class RegisterScreen extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            // lưu dữ liệu người dùng nhập vào
            data: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                optionClass: 'Chọn lớp đăng kí',
                yearOfBirth: '',
                option: '',
                attendance: [],
                noAttendance: [],

            },

            // lưu thông tin về lỗi của các truờng thông tin
            errors: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                optionClass: ''
            },

            allClass: [],
        };
    }

    /**
     * Xử lý sự kiện onchange của ô input
     */

    async componentDidMount() {
        let tmpState = this.state;
        tmpState.allClass = await getAllClass();
        this.setState(tmpState);
    }




    handleInputChange = (fieldName, fieldValue) => {
        //console.log(fieldName + ' = ' + fieldValue);
        let tmpState = this.state;

        tmpState.data[fieldName] = fieldValue.trim();

        // if (fieldName == 'optionClass') {
        //     let index = arrClass.findIndex((item) => item.name == fieldValue)
        //     tmpState.data.option = arrClass[index];
        // }


        this.setState(tmpState);
    }



    render() {
        let $container = document.createElement('div');
        $container.classList.add('wrapper');

        let $row = document.createElement('div')
        $row.classList.add('row');

        //console.log(this.state.data.option)

        let $response = document.createElement('div')
        $response.classList.add('col-12');
        $response.classList.add('col-lg-10');
        $response.classList.add('mx-auto');



        let $flex = document.createElement('div');
        $flex.classList.add('section-authentication-register');
        $flex.classList.add('d-flex');
        $flex.classList.add('align-items-center');
        $flex.classList.add('justify-content-center');

        $container.appendChild($flex);
        $flex.appendChild($row);
        $row.appendChild($response);



        let $radius = document.createElement('div');
        $radius.classList.add('card', 'radius-15');

        $response.appendChild($radius)

        let $row_gutters = document.createElement('div');
        $row_gutters.classList.add('row', 'no-gutters');

        $radius.appendChild($row_gutters);

        let $card = document.createElement('div');
        $card.classList.add('col-lg-6');

        $row_gutters.appendChild($card)


        let $img = document.createElement('div');
        $img.classList.add('col-lg-6')

        $img.innerHTML = `<img src="assets/images/login-images/login-frent-img.jpg" class="card-img login-img h-100" alt="...">`
        $row_gutters.appendChild($img)



        let $divTitle = document.createElement('div');
        $divTitle.classList.add('text-center');

        let $imgApp = document.createElement('img');
        $imgApp.src = 'assets/images/logo-icon.png';
        $imgApp.width = '80'

        let $titile = document.createElement('h3');
        $titile.classList.add('mt-4');
        $titile.classList.add('font-weight-bold');
        $titile.textContent = 'Create an Account'
        $divTitle.append($imgApp, $titile)

        let _name = new InputWrapper({
            addClass: 'mt-4',
            label: 'Name',
            placeholder: 'Your name',
            type: 'text',
            error: this.state.errors.name,
            //oninput:this.hanldeOnInput('name'),
            value: this.state.data.name,

            onchange: (event) => {
                this.handleInputChange('name', event.target.value);
            }

        });

        let _email = new InputWrapper({
            addClass: 'mt-4',
            label: 'Email',
            placeholder: 'Email',
            type: 'email',
            error: this.state.errors.email,
            value: this.state.data.email,
            //oninput:this.handleInputChange('email'),
            onchange: (event) => {
                this.handleInputChange('email', event.target.value);
            }
        });

        let _password = new InputWrapper({
            addClass: 'mt-4',
            label: 'Password',
            placeholder: 'Password',
            type: 'password',
            error: this.state.errors.password,
            value: this.state.data.password,
            //oninput:this.hanldeOnInput('password'),
            onchange: (event) => {
                this.handleInputChange('password', event.target.value);
            }
        });

        let _confirmPassword = new InputWrapper({
            addClass: 'mt-4',
            label: 'Confirm Password',
            placeholder: 'Confirm password',
            type: 'password',
            error: this.state.errors.confirmPassword,
            value: this.state.data.confirmPassword,
            //oninput:this.handleInputChange('confirmPassword'),
            onchange: (event) => {
                this.handleInputChange('confirmPassword', event.target.value);
            }
        });



        let _YearOfBirth = new InputWrapper({
            addClass: 'col-md-6',
            label: 'Year Of Birth',
            placeholder: 'Year Of Birth',
            type: 'number',
            value: this.state.data.yearOfBirth,
            error: '',
            onchange: (event) => {
                this.handleInputChange('yearOfBirth', event.target.value);
            }
        })

        let _SelectWrapper = new SelectWrapper({
            addClass: 'col-md-6',
            label: 'Choose a class',
            value: this.state.data.optionClass,
            error: this.state.errors.optionClass,
            option: this.state.allClass,
            onchange: (event) => {
                this.handleInputChange('optionClass', event.target.value);
            }
        })

        let $formRow = document.createElement('div');
        $formRow.classList.add('form-row');

        appendTo($formRow, _YearOfBirth, _SelectWrapper);



        let $btn = document.createElement('button');
        $btn.classList.add('btn', 'btn-primary', 'btn-block');
        $btn.innerHTML = "Register";

        let $form = document.createElement('form');
        $form.classList.add('card-body')
        $form.classList.add('p-md-5')

        $form.onsubmit = this.handleRegister;


        $form.append($divTitle)

        $form.innerHTML += `
            <div class="login-separater text-center"> <span>Đăng kí với Email</span>
				<hr />
			</div>`

        appendTo($form, _name, _email, _password, _confirmPassword);
        // $form.append(_name.render(), _email.render(), _password.render(), _confirmPassword.render(), $btn);
        $form.append($formRow);

        let $hr = document.createElement('hr')
        $form.append($hr)

        $form.append($btn);

        let $logIn = document.createElement('div')

        $logIn.innerHTML = `
            <div class="text-center mt-4">
                <p class="mb-0">Bạn đã có tài khoản <a href="/index.html#/login">-Login</a>
                </p>
            </div>`
        $form.append($logIn);
        // HTMLElement || Node || HTML String
        $card.append($form)

        return $container;
    }


    hanldeOnInput = (name) => {


        let data = this.state.data;
        let errors = this.state.errors;
        console.log(this.state)
        errors[name] = data[name] == '' ? `Invalid ${name}` : '';

        let tmpState = this.state;
        tmpState.errors = errors;
        // console.log(errors[name])
        this.setState(tmpState);
    }

    handleRegister = (event) => {
        let isPassed = true;


        event.preventDefault(); // chặn chuyển hướng đến action
        let data = this.state.data;
        let errors = this.state.errors;
        errors.name = '';
        errors.email = '';
        errors.password = '';
        errors.confirmPassword = '';
        errors.optionClass = ''

        if (data.name == '') {
            errors.name = 'Invalid name';
            isPassed = false
        }

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

        if (data.optionClass == 'Chọn lớp đăng kí') {
            errors.optionClass = 'You need to choose the registration class'
            isPassed = false
        }

        if (isPassed) {
            let indexClassName = this.state.allClass.findIndex((item) => item.name == data.optionClass);
            let time_current = new Date();
            time_current = time_current.getTime();
            this.state.allClass[indexClassName].studyTime.map((item) => {
                let time_study = new Date(item);
                time_study = time_study.getTime();
                if (time_study < time_current) {
                    let obj = {};
                    obj.content = '';
                    obj.date = item
                    data.noAttendance.push(obj);
                }

            })
            //console.log(data.email, data.password, data.optionClass,data.yearOfBirth,data.name,data.attendance,data.noAttendance)
            register(data.email, data.password, data.optionClass, data.yearOfBirth, data.name, data.attendance, data.noAttendance)
            //window.location.href = 'newPage.html'
            return;
        }

        let tmpState = this.state;
        tmpState.errors = errors;
        //console.log(this.state)
        this.setState(tmpState);


    }
}