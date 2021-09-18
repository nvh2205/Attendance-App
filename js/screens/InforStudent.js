import BaseComponent from "../BaseComponent.js";
import Sidebar from "../components/Sidebar.js";
import { appendTo } from "../utils.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import {logIn,getAllClass,getAllStudent} from "../models/user.js"

//logIn('jj@gmail.com','123456');
logIn('admin@gmail.com','123456');

let allClass = await getAllClass();
let allStudent = await getAllStudent();

let idUser=null;
await auth.onAuthStateChanged(user=>{
    if(user){
        idUser = user.uid;
    }
});



let overViewUser=allStudent.find((item,index)=>{
    return item.id===idUser;
})



export default class InforStudent extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    /**
     * Xử lý sự kiện onchange của ô input
     */



    render() {
        let $container = document.createElement('div')
            $container.classList.add('wrapper')


        appendTo($container, new Sidebar());
        appendTo($container, new Header())
         $container.innerHTML += `                <div class="page-wrapper">
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

                                 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                     <button type="button" class="btn btn-primary" data-toggle="modal"
                                         data-target="#exampleModal7">
                                         <i class="lni lni-circle-plus mr-2"></i>Thêm Công Việc
                                     </button>

                                     <!-- Modal -->
                                     <div class="modal fade" id="exampleModal7" tabindex="-1" role="dialog"
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
                                                             class="form-control form-control-lg radius-30" />
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
                                     </div>

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
                                     <div class="row mt-15">
                                         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                             <table class="table table-bordered table-hover">
                                                 <thead>
                                                     <tr>
                                                         <th class="text-center">STT</th>
                                                         <th class="text-center">Tên</th>
                                                         <th class="text-center">Trạng Thái</th>
                                                         <th class="text-center">Hành Động</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>

                                                     <tr>
                                                         <td>1</td>
                                                         <td>Học lập trình</td>
                                                         <td>Học lập trình</td>
                                                         <td>Học lập trình</td>
                                                         <td>Học lập trình</td>
                                                         <td class="text-center">
                                                             <span class="label label-success">
                                                                 Kích Hoạt
                                                             </span>
                                                         </td>
                                                         <td class="text-center">
                                                             <button type="button" class="btn btn-warning"
                                                                 data-toggle="modal"
                                                                 data-target="#exampleModal7">
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
                                                         </td>
                                                     </tr>

                                                 </tbody>

                                             </table>

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

             </div>
         </div>
         <!--end page-content-wrapper-->
     </div>`

         appendTo($container,new Footer())
        return $container;
    }





}