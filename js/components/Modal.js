import BaseComponent from "../BaseComponent.js";
import { appendTo,renderHtml } from "../utils.js";
import InputWrapper from "./InputWrapper.js";

export default class Modal extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={
            data:{
                name:'',
                yearOfBirth:'',
                className:'',
            },
            err:{
                name:'',
                className:''
            }
        }   
           
    }

    handleInputChange = (event) => {
        console.log(event)
        //console.log(fieldName + ' = ' + fieldValue);
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        let tmpState = this.state;
        
        tmpState.data[name] = value.trim();
        this.setState(tmpState);
       console.log(this.state)
    }
    
    render(){

        let _name = new InputWrapper({
            addClass: "123",
            label: "Name",
            placeholder: "Name:...",
            type: "text",
            error:this.state.err.name,
            value:this.state.data.name,
            onChange: (event) => {
                this.handleInputChange('name', event.target.value);
            }
        })

        let $form = document.createElement('form');
        $form.classList.add('card-body')
        $form.classList.add('p-md-5')



        $form.innerHTML +=`
            <div class="login-separater text-center"> <span>Đăng nhập với Email</span>
				<hr />
			</div>`

        appendTo($form, _name);

        let $container=renderHtml`      <div class="modal fade" id="exampleModal7" tabindex="-1" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content radius-30">
                <div class="modal-header border-bottom-0">
                    <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close"> <span
                            aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div class="modal-body p-5">
                    <h3 class="text-center">Thêm Học Sinh</h3>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text"
                            class="form-control form-control-lg radius-30" 
                            name='name' 
                            value="${this.state.data.name}"
                           onchange="handleChangeInput(this.event)"
                        />
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text"
                            class="form-control form-control-lg radius-30" />
                    </div>

                    <div class="form-group">
                        <label>Class Name</label>
                        <input type="text"
                            class="form-control form-control-lg radius-30" />
                    </div>

                    <div class="form-group">
                        <label>Year of Birth</label>
                        <input type="number"
                            class="form-control form-control-lg radius-30" />
                    </div>
                    <hr>
                    <div class="form-group">
                        <button type="button"
                            class="btn btn-primary radius-30 btn-lg btn-block">ADD
                            Student</button>
                    </div>


                </div>
            </div>
        </div>
    </div>`



    return $container;
    }
}