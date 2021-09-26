import BaseComponent from "../BaseComponent.js";
import InputWrapper from "../components/InputWrapper.js";

import { logIn } from "../models/user.js";
import { appendTo, validateEmail } from "../utils.js";
import ModalWarning from "./ModalWarning.js";
export default class LogInScreen extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            // lưu dữ liệu người dùng nhập vào
            data: {
                email: '',
                password: '',
            },

            // lưu thông tin về lỗi của các truờng thông tin
            errors: {
                email: '',
                password: '',
            }
        };
    }

    /**
     * Xử lý sự kiện onchange của ô input
     */
    handleInputChange = (fieldName, fieldValue) => {
        //console.log(fieldName + ' = ' + fieldValue);



        
        let tmpState = this.state;
        
        tmpState.data[fieldName] = fieldValue.trim();
        this.setState(tmpState);
      // console.log(this.state)
    }



    render() {
        let $container = document.createElement('div');
        $container.classList.add('wrapper');

        let $row = document.createElement('div')
        $row.classList.add('row');



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
        $radius.classList.add('card','radius-15');

        $response.appendChild($radius)

        let $row_gutters = document.createElement('div');
        $row_gutters.classList.add('row','no-gutters');

        $radius.appendChild($row_gutters);

        let $card = document.createElement('div');
        $card.classList.add('col-lg-6');

        $row_gutters.appendChild($card)


        let $img =document.createElement('div');
        $img.classList.add('col-lg-6')

        $img.innerHTML=`<img src="assets/images/login-images/login-frent-img.jpg" class="card-img login-img h-100" alt="...">`
        $row_gutters.appendChild($img)

        let $divTitle = document.createElement('div');
        $divTitle.classList.add('text-center');

        let $imgApp = document.createElement('img');
        $imgApp.src = 'assets/images/logo-icon.png';
        $imgApp.width = '80'

        let $titile = document.createElement('h3');
        $titile.classList.add('mt-4');
        $titile.classList.add('font-weight-bold');
        $titile.textContent = 'Log In'
        $divTitle.append($imgApp, $titile)



        let _email = new InputWrapper({
            addClass: 'mt-4',
            label: 'Email',
            placeholder: 'Email',
            type: 'email',
            error: this.state.errors.email,
            value: this.state.data.email,
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






        let $btn = document.createElement('button');
        $btn.classList.add('btn', 'btn-primary', 'btn-block');
        $btn.innerHTML = "Register";

        let $form = document.createElement('form');
        $form.classList.add('card-body')
        $form.classList.add('p-md-5')

        $form.onsubmit = this.handleRegister;

    
        $form.append($divTitle)

        $form.innerHTML +=`
            <div class="login-separater text-center"> <span>Đăng nhập với Email</span>
				<hr />
			</div>`

        appendTo($form, _email, _password);
        // $form.append(_name.render(), _email.render(), _password.render(), _confirmPassword.render(), $btn);
        
        let $hr=document.createElement('hr')
        $form.append($hr)

        $form.append($btn);

        let $logIn = document.createElement('div')

         $logIn.innerHTML=`
            <div class="text-center mt-4">
                <p class="mb-0">Bạn chưa có tài khoản <a href="/index.html#/register">- Register</a>
                </p>
            </div>`
            $form.append($logIn);
        // HTMLElement || Node || HTML String
        $card.append($form)

        return $container;
    }



    handleRegister = (event) => {
        let isPassed = true;


        event.preventDefault(); // chặn chuyển hướng đến action
        let data = this.state.data;
        let errors = this.state.errors;
        errors.email = '';
        errors.password = '';


        if (data.email == '' || !validateEmail(data.email)) {
            errors.email = 'Invalid email';
            isPassed = false
        }

        if (data.password == ''|| data.password.length<6) {
            errors.password = 'Invalid password';
            isPassed = false
        }



        if (isPassed) {
            logIn(data.email, data.password)
            return;
        }

        let tmpState = this.state;
        tmpState.errors = errors;
        //console.log(this.state)
        this.setState(tmpState);
        

    }
}