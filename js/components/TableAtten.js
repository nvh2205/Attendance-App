import BaseComponent from "../BaseComponent.js"
import InputWrapper from './InputWrapper.js';
import { appendTo, renderHtml } from "../utils.js";

export default class TableAtten extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onHandleClickEdit = (inedxStudent, indexRemoveX, action) => {
        this.props.onHandleEditAtten(inedxStudent, indexRemoveX, action)
    }

    onChangeUpdate=(indexStudent, studyTime, fieldValue)=>{
        this.props.onChangeComment(indexStudent, studyTime, fieldValue);
    }

    render() {

        
        //let idAdmin = this.props.idUser

        let studenInClass = this.props.searchValue.length>0&&this.props.searchValue[0]!='No results found' ? this.props.searchValue: this.props.selectClass.studenInClass
        let studyTime = this.props.selectClass.studyTime
        let checkEdit = this.props.checkEdit

        let $container = document.createElement('div');
        $container.classList.add('row', 'mt-15');

        let $div_1 = document.createElement('div');
        $div_1.classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');

        $container.appendChild($div_1);

        let $div_table_scroll = document.createElement('div');
        $div_table_scroll.setAttribute('id', 'table-scroll');

        $div_table_scroll.className = 'table-scroll';

        $div_1.appendChild($div_table_scroll);

        let $div_table_wrapper = document.createElement('div')
        $div_table_wrapper.className = 'table-wrap';

        $div_table_scroll.appendChild($div_table_wrapper);

        let $table = document.createElement('table');
        $table.className = 'main-table';

        $div_table_wrapper.appendChild($table);

        let $t_head = document.createElement('thead');
        $table.appendChild($t_head);

        let $tr_head = document.createElement('tr');
        $t_head.appendChild($tr_head);

        let $th_fix = document.createElement('th');
        $th_fix.className = 'fixed-side text-center';
        $th_fix.setAttribute('scope', 'col');
        $th_fix.innerHTML += `Tên Học Sinh`;
        $tr_head.appendChild($th_fix);
        this.props.selectClass.studyTime.map((item, index) => {
            let $th_head = document.createElement('th');
            $th_head.className = ' text-center';
            $th_head.setAttribute('scope', 'col');
            $th_head.innerHTML += `${item}`;

            $tr_head.appendChild($th_head);


        })




        let $t_body = document.createElement('tbody');
        $table.appendChild($t_body);




        let time_current = new Date();
        time_current = time_current.getTime();

        studenInClass.map((student, indexStudent) => {
            let $tr_body = document.createElement('tr');


            let $th_body = document.createElement('th');
            $th_body.className = 'fixed-side text-center'
            $th_body.innerHTML += `${student.name}`;
            $tr_body.appendChild($th_body);

            let arr_td = [];
            studyTime.map((time, index) => {

                let time_study = new Date(time);
                time_study = time_study.getTime();

                let $td_body = document.createElement('td');
                $td_body.className = 'text-center font-30';
                $tr_body.appendChild($td_body);

                arr_td.push($td_body);
                if (time_current < time_study) {
                    let $i_planet = document.createElement('i');
                    $i_planet.className = 'fadeIn animated bx bx-planet icon-custom-comment'
                    arr_td[index].appendChild($i_planet);

                }
            })

            if (checkEdit == false) {
                student.attendance.forEach((item) => {
                    let index = studyTime.findIndex((time) => time === item.date);
                    let $i_check = document.createElement('i');
                    $i_check.className = 'fadeIn animated bx bx-check mr-2 icon-custom-check ';
                    arr_td[index].appendChild($i_check);

                    let $p_comment=document.createElement('p');
                    $p_comment.className='font-13';
                    $p_comment.innerHTML +=`${item.content}`;
                    arr_td[index].appendChild($p_comment);


                })

                student.noAttendance.map((item) => {
                    let index = studyTime.findIndex((time) => time === item.date);
                    let $i_x = document.createElement('i');
                    $i_x.className = 'fadeIn animated bx bx-x icon-custom-x';
                    arr_td[index].appendChild($i_x);

                    let $p_comment=document.createElement('p');
                    $p_comment.className='font-13';
                    $p_comment.innerHTML +=`${item.content}`;
                    arr_td[index].appendChild($p_comment);

                })
            }
            else {

                student.attendance.forEach((item) => {
                    let index = studyTime.findIndex((time) => time === item.date);
                    let $i_check = document.createElement('i');
                    $i_check.className = 'fadeIn animated bx bx-check mr-2 icon-custom icon-active';


                    let $i_x = document.createElement('i');
                    $i_x.className = 'fadeIn animated bx bx-x icon-custom  mr-2';




                    let $i_comment = document.createElement('i');
                    $i_comment.className = 'fadeIn animated bx bx-comment-detail icon-custom';

                    arr_td[index].appendChild($i_check);
                    arr_td[index].appendChild($i_x);
                    arr_td[index].appendChild($i_comment);

                    let $p_comment=document.createElement('p');
                    $p_comment.className='font-13';
                    $p_comment.innerHTML +=`${item.content}`;
                    arr_td[index].appendChild($p_comment);

                    
                    $i_check.onclick = () => {
                        this.onHandleClickEdit(indexStudent, studyTime[index], 'push');
                    }

                    $i_x.onclick = () => {
                        this.onHandleClickEdit(indexStudent, studyTime[index], 'remove');
                    }

                    //let _commentValue = 

                    let _comment = new InputWrapper({
                        addClassInput:'form-control radius-30 font-13',
                        placeholder: 'Note:....',
                        type: 'text',
                        value: item.content,
                        onchange: (event) => {
                            this.onChangeUpdate(indexStudent, studyTime[index], event.target.value);
                        }
                    });

                    $i_comment.onclick=()=>{
                        $p_comment.className='hidden-display';
                        appendTo(arr_td[index],_comment)
                    }

                })

                student.noAttendance.forEach((item) => {
                    let index = studyTime.findIndex((time) => time === item.date);
                    let $i_check = document.createElement('i');
                    $i_check.className = 'fadeIn animated bx bx-check mr-2 icon-custom';


                    let $i_x = document.createElement('i');
                    $i_x.className = 'fadeIn animated bx bx-x icon-custom  mr-2 icon-active';

                   



                    let $i_comment = document.createElement('i');
                    $i_comment.className = 'fadeIn animated bx bx-comment-detail icon-custom';

                    arr_td[index].appendChild($i_check);
                    arr_td[index].appendChild($i_x);
                    arr_td[index].appendChild($i_comment);

                    let $p_comment=document.createElement('p');
                    $p_comment.className='font-13';
                    $p_comment.innerHTML +=`${item.content}`;
                    arr_td[index].appendChild($p_comment);

                    $i_check.onclick = () => {
                        this.onHandleClickEdit(indexStudent, studyTime[index], 'push');
                    }

                    $i_x.onclick = () => {
                        this.onHandleClickEdit(indexStudent, studyTime[index], 'remove');
                    }

                    let _comment = new InputWrapper({
                        addClassInput:'form-control radius-30 font-13',
                        placeholder: 'Note:....',
                        type: 'text',
                        value: item.content,
                        onchange: (event) => {
                            this.onChangeUpdate(indexStudent, studyTime[index], event.target.value);
                        }
                    });

                    $i_comment.onclick=()=>{
                        $p_comment.className='hidden-display';
                        appendTo(arr_td[index],_comment)
                    }
                })


                


            }









            $t_body.appendChild($tr_body);


        })


        return $container;
    }
}