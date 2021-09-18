import BaseComponent from "../BaseComponent.js";

export default class Sidebar extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={}
    }

    render(){

        let $sidebar = document.createElement('div');
        $sidebar.innerHTML =`				<div class="sidebar-wrapper" data-simplebar="true">
        <div class="sidebar-header">
            <div class="">
                <img src="assets/images/logo-icon.png" class="logo-icon-2" alt="" />
            </div>
            <div>
                <h4 class="logo-text">Attendance App</h4>
            </div>

            <a href="javascript:;" class="toggle-btn ml-auto"> <i class="bx bx-menu"></i>
            </a>

        </div>
        
        <!--navigation-->
        <ul class="metismenu" id="menu">
            
            <li class="menu-label"></li>
            
            
            <li class="active">
                <a href="#">
                    <div class="parent-icon icon-color-5 icon-base"><i class="fadeIn animated bx bx-user"></i>
                    </div>
                    <div class="menu-title">OverView</div>
                </a>
            </li>
            

            <li class="menu-label"></li>
            <li>
                <a href="">
                    <div class="parent-icon icon-color-9 icon-base"><i class="fadeIn animated bx bx-list-ul"></i>
                    </div>
                    <div class="menu-title">List Class</div>
                </a>
            </li>
            
            
        
            <li class="menu-label"></li>
            
            
            <li>
                <a href="">
                    <div class="parent-icon icon-color-5 icon-base"> <i class="fadeIn animated bx bx-poll"></i>
                    </div>
                    <div class="menu-title">List Student</div>
                </a>
            </li>
            
            
            <li class="menu-label"></li>
            
            <li>
                <a href="" target="_blank">
                    <div class="parent-icon icon-color-12"><i class="bx bx-calendar-check"></i>
                    </div>
                    <div class="menu-title">Attendance</div>
                </a>
            </li>

         
            <div class="line"></div>
            <li class="menu-label"></li>
            <li>
                <a href="" target="_blank">
                    <div class="parent-icon"><i class="fadeIn animated bx bx-log-out"></i>
                    </div>
                    <div class="menu-title">Log out</div>
                </a>
            </li>
        </ul>
        <!--end navigation-->
    </div>`



    return $sidebar;
    }
}