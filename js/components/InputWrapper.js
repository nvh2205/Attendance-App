import BaseComponent from "../BaseComponent.js";

export default class InputWrapper extends BaseComponent {

    render() {
        let $container = document.createElement('div');
        if(this.props.label){
           
            $container.classList.add('form-group');
        }
      
       // console.log(this.props.label)
        
        if(this.props.addClass){    
            $container.className=`${this.props.addClass}`;
        }

        let $input = document.createElement('input');
        let $lable = document.createElement('lable');
        $lable.classList.add('mb-1')
       if(this.props.label){
            $lable.innerHTML += this.props.label;

       }

         
       if(this.props.addClassInput){    
            $input.className=`${this.props.addClassInput}`;
        }

        $input.classList.add('form-control');
        $input.placeholder = this.props.placeholder;
        $input.type = this.props.type;
        $input.value = this.props.value;
        //$input.oninput=this.props.oninput;
        $input.onchange = this.props.onchange;

        

        let $error = document.createElement('div');
        $error.classList.add('text-danger');
        if(this.props.error){
            $error.innerText = this.props.error;
        }
       
        if(this.props.label){
            $container.appendChild($lable);
            $container.appendChild($input);
            $container.appendChild($error);
            return $container;
        }
       else{
           return $input;
       }
       
    }
}