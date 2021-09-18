import BaseComponent from "../BaseComponent.js";

export default class Footer extends BaseComponent {
    constructor(props) {
        super(props);
        this.state={}
    }

    render(){
        let $footer = document.createElement("div");
        $footer.innerHTML=`	
        <div class="footer">
        <p class="mb-0" >App| Developed By Group 5: <a href="#" target="_blank">vv....</a>
        </p>
    </div>
        
        `
        return $footer;
    }
}