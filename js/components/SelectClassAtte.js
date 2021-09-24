import BaseComponent from "../BaseComponent.js"

export default class SelectClassAtte extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    };

    render(){

        let indexSelectClass = this.props.indexSelectClass;

        let $div_title= document.createElement('div');
        $div_title.className='card-title d-flex';

        let $div_dash=document.createElement('div');
        $div_dash.className='mb-0 vertical-dash';

        $div_dash.innerHTML+='Thông Tin Điểm Danh Các Học Sinh';

        $div_title.appendChild($div_dash);

        let $div_btn_group=document.createElement('div');
        $div_btn_group.className='btn-group ml-5';

        $div_title.appendChild($div_btn_group);

        let $button=document.createElement('button');
        $button.type='button';
        $button.className='btn btn-info dropdown-toggle';
        $button.setAttribute('data-toggle','dropdown');

        //Content button 

        let contentButton = indexSelectClass == null ? 'Lựa chọn lớp' : this.props.classList[indexSelectClass].name

        $button.innerHTML+=`${contentButton}`;
        let $span_button=document.createElement('span');
        $span_button.className='caret';

        $button.appendChild($span_button);

        $div_btn_group.appendChild($button);

        let $ul=document.createElement('ul');
        $ul.className='dropdown-menu scrollable-menu';
        $ul.setAttribute('role','menu');
        
        $div_btn_group.appendChild($ul);

        this.props.classList.map((item,index) => {
            let $li=document.createElement('li');
            let $p_select=document.createElement('p');
            $p_select.className='dropdown-item select-class'
            $p_select.innerHTML +=item.name;

            $li.appendChild($p_select);

            $ul.appendChild($li);

            let $div_dropdow=document.createElement('div');
            $div_dropdow.className='dropdown-divider'
            $ul.appendChild($div_dropdow);

            $li.onclick=()=>{ 
                this.props.onHandleSelectClass(item,index)
            }
        })

        return $div_title;


    }
}