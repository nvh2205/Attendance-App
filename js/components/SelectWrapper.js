import BaseComponent from "../BaseComponent.js";
import { getAllClass } from "../models/user.js";


export default class SelectWrapper extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {


        let $container = document.createElement('div');
        $container.classList.add('form-group');
        
        $container.className=(`${this.props.addClass}`);

        let $select = document.createElement('select');
        let $lable = document.createElement('lable');

       
        $lable.innerHTML = this.props.label;

        $select.classList.add('form-control');
        $select.required=true;
        
        let $error = document.createElement('div');
        $error.classList.add('text-danger');
        $error.innerText = this.props.error;
        

        $select.innerHTML = `<option value="Chọn lớp đăng kí">Chọn lớp học bạn đăng kí</option>`
        this.props.option.forEach((item,index)=>{
            
            $select.innerHTML+=`<option>${item.name}</option>`
        })


        $select.value = this.props.value;
        $select.onchange = this.props.onchange;


        $container.appendChild($lable);
        $container.appendChild($select);
        $container.appendChild($error);

        return $container;
    }
}