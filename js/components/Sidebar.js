import BaseComponent from "../BaseComponent.js";
import {logOut} from '../models/user.js'
export default class Sidebar extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        let $sidebar = document.createElement('div');

        let $sidebar_wrapper=document.createElement('div');
        $sidebar_wrapper.className='sidebar-wrapper';
        $sidebar_wrapper.setAttribute('data-simplebar','true');

        $sidebar.appendChild($sidebar_wrapper);

        $sidebar_wrapper.innerHTML+=`<div class="sidebar-header">
        <div class="">
            <img src="assets/images/logo-icon.png" class="logo-icon-2" alt="" />
        </div>
        <div>
            <h6 class="logo-text">Attendance App</h6>
        </div>

        <a href="javascript:;" class="toggle-btn ml-auto"> <i class="bx bx-menu"></i>
        </a>

    </div>`

        let $ul=document.createElement('ul');
        $ul.className='metismenu';
        $ul.setAttribute('id','menu');
        $sidebar_wrapper.appendChild($ul);

        $ul.innerHTML+=`<li class="menu-label"></li>
            
            
        <li class="active">
            <a href="/index.html#/index">
                <div class="parent-icon icon-color-5 icon-base"><i class="fadeIn animated bx bx-user"></i>
                </div>
                <div class="menu-title">OverView</div>
            </a>
        </li>
        

        <li class="menu-label"></li>
        <li>
            <a href="/index.html#/list-class">
                <div class="parent-icon icon-color-9 icon-base"><i class="fadeIn animated bx bx-list-ul"></i>
                </div>
                <div class="menu-title">List Class</div>
            </a>
        </li>
        
        
    
        <li class="menu-label"></li>
        
        
        <li>
            <a href="/index.html#/list-student">
                <div class="parent-icon icon-color-5 icon-base"> <i class="fadeIn animated bx bx-poll"></i>
                </div>
                <div class="menu-title">List Student</div>
            </a>
        </li>
        
        
        <li class="menu-label"></li>
        
        <li>
            <a href="/index.html#/attendance">
            <div class="parent-icon icon-color-12"><i class="bx bx-calendar-check"></i>
            </div>
            <div class="menu-title">Attendance</div>
            </a>
        </li>



        
     
        <div class="line"></div>
        <li class="menu-label"></li>`

    //     $sidebar.innerHTML = `				
    //     <div class="sidebar-wrapper" data-simplebar="true">
    //     <div class="sidebar-header">
    //         <div class="mr-2">
    //             <img src="assets/images/logo-icon.png" class="logo-icon-2" alt="" />
    //         </div>
    //         <div>
    //             <h5 class="logo-text">Attendance App</h5>
    //         </div>

    //         <a href="javascript:;" class="toggle-btn ml-auto"> <i class="bx bx-menu"></i>
    //         </a>

    //     </div>
        
    //     <!--navigation-->
    //     <ul class="metismenu" id="menu">
            
    //         <li class="menu-label"></li>
            
            
    //         <li class="active">
    //             <a href="/index.html#/index">
    //                 <div class="parent-icon icon-color-5 icon-base"><i class="fadeIn animated bx bx-user"></i>
    //                 </div>
    //                 <div class="menu-title">OverView</div>
    //             </a>
    //         </li>
            

    //         <li class="menu-label"></li>
    //         <li>
    //             <a href="/index.html#/list-class">
    //                 <div class="parent-icon icon-color-9 icon-base"><i class="fadeIn animated bx bx-list-ul"></i>
    //                 </div>
    //                 <div class="menu-title">List Class</div>
    //             </a>
    //         </li>
            
            
        
    //         <li class="menu-label"></li>
            
            
    //         <li>
    //             <a href="/index.html#/list-student">
    //                 <div class="parent-icon icon-color-5 icon-base"> <i class="fadeIn animated bx bx-poll"></i>
    //                 </div>
    //                 <div class="menu-title">List Student</div>
    //             </a>
    //         </li>
            
            
    //         <li class="menu-label"></li>
            
    //         <li>
    //             <a href="/index.html#/attendance">
    //             <div class="parent-icon icon-color-12"><i class="bx bx-calendar-check"></i>
    //             </div>
    //             <div class="menu-title">Attendance</div>
    //             </a>
    //         </li>



            
         
    //         <div class="line"></div>
    //         <li class="menu-label"></li>
    //         <li>
    //             <a href="" target="_blank">
    //                 <div class="parent-icon"><i class="fadeIn animated bx bx-log-out"></i>
    //                 </div>
    //                 <div class="menu-title">Log out</div>
    //             </a>
    //         </li>
    //     </ul>
    //     <!--end navigation-->
    // </div>`

        let $p_log = document.createElement('li');
        $p_log.innerHTML += ` <a href="#">
                <div class="parent-icon"><i class="fadeIn animated bx bx-log-out"></i>
                </div>
                <div class="menu-title">Log out</div>
            </a>`

        $ul.appendChild($p_log);

        $p_log.onclick= () => {this.handleLogOut();};

        return $sidebar;
    }
    handleLogOut=() => {
        logOut();
    }
}