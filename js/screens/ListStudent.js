import BaseComponent from "../BaseComponent.js";
import Sidebar from "../components/Sidebar.js";
import { appendTo,renderHtml } from "../utils.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Table from "../components/Table.js";
import Modal from "../components/Modal.js";
import {logIn,getAllClass,getAllStudent} from "../models/user.js";





export default class ListStudent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={
            thElement:this.props.idUser=='FPO9ngD4KTf2VW3euMiXVOa651X2' ? ['STT','Tên','Năm Sinh','Email','Tên Lớp','Hành Động']:['STT','Tên','Năm Sinh','Email','Tên Lớp']
        }
    }

    render(){
        //console.log(this.props)
        let $container = document.createElement('div')
        $container.classList.add('wrapper')

        let modal = new Modal().render().outerHTML;

        let table = new Table({
            thElement:this.state.thElement,
            tdElement:this.props.allStudent

        });

        

        //appendTo($container, new Sidebar());
        //appendTo($container, new Header());


       
        $container.innerHTML+=`           <div class="page-wrapper">
        <!--page-content-wrapper-->
        <div class="page-content-wrapper">
            <div class="page-content">
                <!--breadcrumb-->
                <div
                    class="page-breadcrumb d-none d-md-flex justify-content-center align-items-center mb-3 ">
                    <div class="breadcrumb-title pr-3">Danh sách học sinh</div>

                </div>
                <div class="line mb-5"></div>
                <!--end breadcrumb-->
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <h4 class="mb-0">Danh sách các học sinh</h4>
                        </div>
                        <hr />
                        <div class="table-responsive">

                            <div class="row" style="width:100%">

                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dataTable">
                                    <button type="button" class="btn btn-primary" data-toggle="modal"
                                        data-target="#exampleModal7">
                                        <i class="lni lni-circle-plus mr-2"></i>Thêm Công Việc
                                    </button>

                                    <!-- Modal -->
                                    
                                    
                                    <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog"
                                        aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Modal title</h5>
                                                    <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close"> <span
                                                            aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">Bạn có chắc muốn xóa</div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-dismiss="modal">Close</button>
                                                    <button type="button"
                                                        class="btn btn-danger">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <!-- .......... -->
                                    <div class="row mb-3 mt-3">
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <div class="input-group">
                                                <input type="text" class="form-control"
                                                    placeholder="Nhập từ khóa..." />
                                                <span class="input-group-btn ml-2">
                                                    <button class="btn btn-primary" type="button">
                                                        <i class="fadeIn animated bx bx-search mr-2"></i>Tìm
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-primary">Sắp
                                                    xếp</button>
                                                <button type="button"
                                                    class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split"
                                                    data-toggle="dropdown"> <span class="sr-only">Toggle
                                                        Dropdown</span>
                                                </button>
                                                <div
                                                    class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                                                    <p class="dropdown-item">TÊN : A->Z<i
                                                            class="fadeIn animated bx bx-check ml-1"></i>
                                                    </p>
                                                    <div class="dropdown-divider"></div> <a
                                                        class="dropdown-item" href="javascript:;">TÊN :
                                                        Z->A</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <!-- .....Table..... -->
                                    ${table.render().outerHTML}
                                   
                                    <!-- Phân trang -->
                                    <div class="row mt-2">
                                    <div class="col-sm-12 col-md-7">
                                        <div class="dataTables_paginate paging_simple_numbers d-flex  justify-content-end"
                                            id="example_paginate ">
                                            <ul class="pagination ">
                                                <li class="paginate_button page-item previous disabled"
                                                    id="example_previous"><a href="#"
                                                        aria-controls="example" data-dt-idx="0"
                                                        tabindex="0" class="page-link">Prev</a>
                                                </li>
                                                <li class="paginate_button page-item active"><a
                                                        href="#" aria-controls="example"
                                                        data-dt-idx="1" tabindex="0"
                                                        class="page-link">1</a></li>
                                                <li class="paginate_button page-item "><a
                                                        href="#" aria-controls="example"
                                                        data-dt-idx="2" tabindex="0"
                                                        class="page-link">2</a></li>
                                                <li class="paginate_button page-item "><a
                                                        href="#" aria-controls="example"
                                                        data-dt-idx="3" tabindex="0"
                                                        class="page-link">3</a></li>

                                                <li class="paginate_button page-item next"
                                                    id="example_next"><a href="#"
                                                        aria-controls="example" data-dt-idx="7"
                                                        tabindex="0" class="page-link">Next</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                 </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!--end page-content-wrapper-->
    </div>`


    //appendTo($container,new Footer())
    return $container;

    }
}