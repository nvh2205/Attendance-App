import BaseComponent from "../BaseComponent.js";

export default class Header extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={}
    }

    render(){
        let $header = document.createElement("div");
        $header.innerHTML=`	
        <header class="top-header d-flex justify-content-center align-items-center">
            <nav class="navbar navbar-expand">
                <div class="left-topbar d-flex align-items-center">
                    <a href="javascript:;" class="toggle-btn">	<i class="bx bx-menu"></i>
                    </a>
                </div>
            </nav>
            
            <img src="assets/images/logo-icon.png" class="logo-icon-2" alt="" />
            <h3 class="ml-5">Attendance App</h3>
        </header>
        
        `


        return $header;
    }
}