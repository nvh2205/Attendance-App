import BaseComponent from "../BaseComponent.js";
import { appendTo,renderHtml } from "../utils.js";
import InputWrapper from "../components/InputWrapper.js";

export default class ModalWarning extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={

        }   
           
    }

   
    render(){
    
       let $div_madal=document.createElement("div");
       $div_madal.className="modal fade";
       $div_madal.setAttribute('id','exampleModal3');
       $div_madal.setAttribute('tabindex','-1');
       $div_madal.setAttribute('role','dialog');
       $div_madal.setAttribute('aria-hidden','true');

       let $div_modal_dialog=document.createElement("div");
       $div_modal_dialog.className="modal-dialog modal-dialog-centered";

       $div_madal.appendChild($div_modal_dialog);

       let $div_madal_content=document.createElement("div");
       $div_madal_content.className='modal-content';

       $div_modal_dialog.appendChild($div_madal_content);

       let $div_madal_header=document.createElement("div");
       $div_madal_header.className='modal-header';

       $div_madal_content.appendChild($div_madal_header);

       let $h5_title=document.createElement("h5");
       $h5_title.className='modal-title';
        $h5_title.innerHTML+=this.props.contenHeader?`${this.props.contenHeader}`:'Lỗi rồi';

        $div_madal_header.appendChild($h5_title);

        let $button_close=document.createElement("button");
        $button_close.className='close';
        $button_close.type='button';
        $button_close.setAttribute('data-dismiss','modal');
        $button_close.setAttribute('aria-labe','Close');

        let $span_close=document.createElement("span");
        $span_close.setAttribute('aria-hidden','true');
        $span_close.innerHTML+='&times;';

        $button_close.appendChild($span_close);
        $div_madal_header.appendChild($button_close);

        let $div_modal_body=document.createElement("div");
        $div_modal_body.className='modal-body font-20';
        $div_modal_body.innerHTML+=`${this.props.content}`;

        $div_madal_content.appendChild($div_modal_body);

        let $div_modal_footer=document.createElement("div");
        $div_modal_footer.className='modal-footer';

        $div_madal_content.appendChild($div_modal_footer);

        let $button_close_footer=document.createElement("button");
        $button_close_footer.className='btn btn-danger';
        $button_close_footer.type="button";
        $button_close_footer.setAttribute('data-dismiss','modal');
        $button_close_footer.innerHTML+='Close';

        $div_modal_footer.appendChild($button_close_footer);


        return $div_madal;



    }
}