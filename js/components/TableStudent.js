import BaseComponent from "../BaseComponent.js";
import { appendTo, renderHtml } from "../utils.js";

export default class TableStudent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleClickUpdate(valueStudent) {
        this.props.handleSelectStudent(valueStudent);
    }

    handleClickDelete = (value) => {
        this.props.handleDelete(value)
    }

    render() {

        //let tdElement=JSON.parse(JSON.stringify(this.props.tdElement));
        //this.props.tdElement;
        let tdElement =  this.props.tdElement.map((student,index)=>{
            return JSON.parse(JSON.stringify(student));
        
        })

        tdElement.map((student,index)=>{
            delete student.attendance;
            delete student.noAttendance;
        
        })

        //console.log(this.props.tdElement)

        let $container = document.createElement('div');
        $container.classList.add('row', 'mt-3');

        let $div_1 = document.createElement('div');
        $div_1.classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');

        $container.appendChild($div_1);

        let $table = document.createElement('table');
        $table.classList.add('table', 'table-bordered', 'table-hover');
        $div_1.appendChild($table);
        let $thead = document.createElement('thead');
        let $tr = document.createElement('tr');

        $thead.appendChild($tr);

        $table.appendChild($thead);


        if (tdElement.length > 0) {
           

           

            this.props.thElement.forEach((item, index) => {
                let $th = document.createElement('th');
                $th.classList.add('text-center');
                $th.innerHTML = `${item}`;
                $tr.appendChild($th);


            })

            let $tbody = document.createElement('tbody');

            $table.appendChild($tbody);




            tdElement.map((item, index) => {

                let $tr_body = document.createElement('tr');
                $tbody.appendChild($tr_body);
                let $td_index = document.createElement('td');
                $td_index.innerHTML = `${index + 1}`
                $tr_body.appendChild($td_index)

                const ordered = {};
                Object.keys(item).sort().forEach(function (key) {
                    ordered[key] = item[key];
                });


                Object.keys(ordered).map((value) => {
                    
                    if (value != 'id' && value != 'idClass') {
                        let $td = document.createElement('td');
                        $td.classList.add('text-center');

                        let $span_td = document.createElement('span')
                        $span_td.classList.add('label', 'label-success');

                        if(value=='studyTime'){
                            let length = item[value].length
                            $span_td.innerHTML = `${item[value][0]}<i class="lni lni-arrow-right mr-2 ml-2"></i>${item[value][length-1]}`
                        }else{
                            $span_td.innerHTML = `${item[value]}`
                        }

                        

                        $td.appendChild($span_td);
                        $tr_body.appendChild($td);
                    }

                })

                this.props.thElement.map((value) => {
                    if (value == 'Hành Động') {
                        //Action admin

                        let $td_action = document.createElement('td');
                        $td_action.classList.add('text-center');

                        let $button_update = document.createElement('button');
                        $button_update.classList.add('btn', 'btn-warning');
                        $button_update.type = 'button';
                        // $button_update.setAttribute('data-toggle', 'modal')
                        // $button_update.setAttribute('data-target','#exampleModal7')

                        $button_update.onclick = () => {
                            this.handleClickUpdate(this.props.tdElement[index]);
                        }

                        let $i_update = document.createElement('i');
                        $i_update.classList.add('fadeIn', 'animated', 'bx', 'bx-pencil', 'mr-2');


                        $button_update.appendChild($i_update);
                        $button_update.innerHTML += 'Sửa ';
                        $td_action.appendChild($button_update);
                        $td_action.appendChild(document.createTextNode('\u00A0\u00A0\u00A0\u00A0'));


                        let $button_delete = document.createElement('button');
                        $button_delete.classList.add('btn', 'btn-danger');
                        $button_delete.type = 'button';
                        //$button_delete.setAttribute('data-toggle', 'modal')
                        //$button_delete.setAttribute('data-target','#exampleModal3')

                        let $i_delete = document.createElement('i');
                        $i_delete.classList.add('fadeIn', 'animated', 'bx', 'bx-trash', 'mr-2');


                        $button_delete.appendChild($i_delete);
                        $button_delete.innerHTML += 'Xóa';
                        $button_delete.onclick = () => { this.handleClickDelete(this.props.tdElement[index]) }
                        $td_action.appendChild($button_delete);

                        $tr_body.appendChild($td_action);
                    }
                })
            })
            return $container;
        }
        else{
            let $h4_seach=document.createElement('h4');
            $h4_seach.className='text-center';
            $h4_seach.innerHTML+='Không có kết quả bạn tìm :(('
            $thead.appendChild($h4_seach);

            return $container;
        }


    }

}