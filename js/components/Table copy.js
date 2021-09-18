import BaseComponent from "../BaseComponent.js";
import { appendTo,renderHtml } from "../utils.js";

export default class Table extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

     handClickUpdate =(a)=>{
        console.log(a)
    }

    render() {

        //console.log(this.props)

        const adminAction =(user)=>{
            let action='';
            this.props.thElement.forEach((item, index) => {
                if(item=='Hành Động'){
                    action=renderHtml`<td class="text-center">
                    <button type="button" class="btn btn-warning"
                        data-toggle="modal"
                        data-target="#exampleModal7"
                       
                        >
                        <i
                            class="fadeIn animated bx bx-pencil mr-2"></i>Sửa
                    </button>
                    &nbsp;
                    <button type="button" class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#exampleModal3">
                        <i
                            class="fadeIn animated bx bx-trash mr-2"></i>Xóa
                    </button>
                </td>`
                }
            })
            return action
        }
       

        let  $table = renderHtml`
        <div class="row mt-15">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                    ${this.props.thElement.map((item,index) => {
                        return renderHtml `<th class="text-center">${item}</th>`
                    })}
                    </tr>
                </thead>
                <tbody>

                    ${this.props.tdElement.map((item,index) => {
                        
                        return renderHtml `<tr>
                            <td>${index+1}</td>
                            ${Object.keys(item).map((value) => {
                                if(value != 'id' && value != 'idClass'){
                                    return renderHtml `<td class="text-center">
                                <span class="label label-success">
                                     ${item[value]}
                                </span>
                            </td>`
                                }
                                else{
                                    return ''
                                }
                                
                            })}
                            ${adminAction(item)}
                        </tr>`
                    })}
                   

                </tbody>

            </table>

            
        </div>
    </div>`
        return $table;

    }

}