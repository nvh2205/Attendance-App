import BaseComponent from "../BaseComponent.js";
import { appendTo,renderHtml } from "../utils.js";
import InputWrapper from "../components/InputWrapper.js";

export default class ModalUpdateStudent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={
            data:{
                name:this.props.dataUpdate.name,
                yearOfBirth:'',
                className:'',
            },
            err:{
                name:this.props.errUpdate.name,
                className:''
            }
        }   
           
    }

    onChangeUpdate = (fieldName, fieldValue, field) => {
        console.log(fieldName + ' = ' + fieldValue);
        let tmpState = this.state;

        tmpState.data[fieldName] = fieldValue.trim();
       

        this.setState(tmpState);
        field.classList.add('show')
    }
    
    render(){

        console.log(this.props)
        let $container=document.createElement('div');
        $container.classList.add('modal','fade');
        
        $container.setAttribute('id','exampleModal7');
        $container.setAttribute('tabindex','-1');
        $container.setAttribute('role','dialog');
        $container.setAttribute('aria-hidden','true');

        let $modal_dialog=document.createElement('div');
        $modal_dialog.className='modal-dialog modal-dialog-centered';

        $container.appendChild($modal_dialog);

        let $modal_content=document.createElement('div');
        $modal_content.className='modal-content radius-30';

        $modal_dialog.appendChild($modal_content);

        let $modal_header=document.createElement('div');
        $modal_header.className='modal-header border-bottom-0';
        let $button_modal_header=document.createElement('button');
        $button_modal_header.type='button';
        $button_modal_header.className='close';
        $button_modal_header.setAttribute('data-dismiss','modal');
        $button_modal_header.setAttribute('aria-label','Close');

        let $span_modal_header=document.createElement('span');
        $span_modal_header.setAttribute('aria-hidden','true');

        $span_modal_header.innerHTML+='&times;';

        $button_modal_header.appendChild($span_modal_header);
        $modal_header.appendChild($button_modal_header);
        $modal_content.appendChild($modal_header);

        //..........Body 
        let $modal_body = document.createElement('div');
        $modal_body.className='modal-body p-5'; 

        let _name = new InputWrapper({
            addClassInput:'form-control-lg radius-30',
            label:'Name--',
            placeholder:'Name Student: ',
            type:'text',
            value:this.state.data.name,
            error:this.state.err.name,
            onchange:(event)=>{this.onChangeUpdate('name',event.target.value,$container);},
        })

        appendTo($modal_body,_name)
        $modal_content.appendChild($modal_body);


    return $container;
    }
}