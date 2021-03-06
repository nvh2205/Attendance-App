import BaseComponent from "../BaseComponent.js";
import Sidebar from "../components/Sidebar.js";
import { appendTo } from "../utils.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { logIn, getAllClass, getAllStudent, uploadStorageImage, selectStudent, getImgUser } from "../models/user.js"
import { renderHtml } from "../utils.js"

export default class InforStudent extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            urlImg: '',
            files: [],
            nameImg: '',
            upload: false,
            inforStudent: {},
            imgStudent: {},
            idUser:''
        };
    }

    /**
     * Xử lý sự kiện onchange của ô input
     */
    async componentDidMount() {
        let tmpState = this.state;
        let idUser = null;
        //this.setState(tmpState);
        await auth.onAuthStateChanged(user => {
            if (user != null) {
                idUser = user.uid;
            }
        });
        let [inforStudent, imgStudent] = await Promise.all([selectStudent(idUser), getImgUser(idUser)])
        if (idUser != 'FPO9ngD4KTf2VW3euMiXVOa651X2') {
            tmpState.inforStudent = inforStudent;
            tmpState.urlImg = imgStudent['link'] ? imgStudent['link'] : './assets/images/avatar-admin.jpg';
            tmpState.nameImg = idUser;
            tmpState.imgStudent = imgStudent['link'] ? imgStudent : {}
        } else {
            inforStudent['name'] = 'ADMIN'
            inforStudent['className'] = 'ADMIN'
            inforStudent['yearOfBirth'] = 'ADMIN'
            inforStudent['email'] = 'ADMIN'
            tmpState.inforStudent= inforStudent
            tmpState.urlImg = imgStudent['link'] ? imgStudent['link'] : './assets/images/avatar-admin.jpg';
        }
        tmpState.idUser=idUser;
        this.setState(tmpState)
    }




    render() {

        let inforStudent = this.state.inforStudent;
        let imgStudent = this.state.imgStudent;
        
        let $container = document.createElement('div')
        $container.classList.add('wrapper')


        appendTo($container, new Sidebar());
        appendTo($container, new Header())

        let $page_wrapper = document.createElement('div')
        $page_wrapper.classList.add('page-wrapper');


        $container.appendChild($page_wrapper);

        let $page_content_wrapper = document.createElement('div');
        $page_content_wrapper.classList.add('page-content-wrapper');

        $page_wrapper.appendChild($page_content_wrapper);

        let $page_content = document.createElement('div');
        $page_content.classList.add('page-content');

        $page_content_wrapper.appendChild($page_content);


        let $h2_info = document.createElement('h2');
        $h2_info.className = 'radius-10 title-page-content';
        $h2_info.innerHTML += 'Thông Tin Học Sinh'
        $page_content.appendChild($h2_info);

        let $div_row = document.createElement('div');
        $div_row.className = 'row';
        $page_content.appendChild($div_row);

        let $div_img_user = document.createElement('div');
        $div_img_user.className = 'col-12 col-lg-4';

        $div_row.appendChild($div_img_user);

        let $div_card_img_user = document.createElement('div')
        $div_card_img_user.className = 'card radius-15';

        $div_img_user.appendChild($div_card_img_user);

        let $div_card_body_user = document.createElement('div');
        $div_card_body_user.className = 'card-body';

        $div_card_img_user.appendChild($div_card_body_user);

        let $img_user = document.createElement('img');
        $img_user.src = this.state.urlImg
        $img_user.className = 'img-user';

        $div_card_body_user.appendChild($img_user);

        let $div_button = document.createElement('div')
        $div_button.className = 'd-flex justify-content-around';
        $div_img_user.appendChild($div_button);

        let $button_choose_file = document.createElement('button');
        $button_choose_file.type = 'button';
        $button_choose_file.className = 'btn btn-outline-primary ';
        let $i_chosse = document.createElement('i');
        $i_chosse.className = 'fadeIn animated bx bx-file mr-2';
        $button_choose_file.appendChild($i_chosse);
        $button_choose_file.innerHTML += 'Choose Photo'


        $div_button.appendChild($button_choose_file);


        //chosse file


        let $button_up_file = document.createElement('button');
        $button_up_file.type = 'button';
        $button_up_file.className = 'btn btn-outline-success ';
        let $i_up = document.createElement('i');
        $i_up.className = 'fadeIn animated bx bx-upload mr-2';
        $button_up_file.appendChild($i_up);
        $button_up_file.innerHTML += 'Summit Photo'
        $div_button.appendChild($button_up_file);


        if (imgStudent['link']) {
            $button_choose_file.disabled = true;
            $button_up_file.disabled = true;

        } else {
            $button_choose_file.onclick = (e) => {
                this.handleClickChosseFile(e);
            }
        }

        if(this.state.idUser == 'FPO9ngD4KTf2VW3euMiXVOa651X2'){
            $button_choose_file.disabled = true;
            $button_up_file.disabled = true;
        }


        if (this.state.upload == false) {
            $button_up_file.onclick = () => {
                //console.log(123)
                this.handleClickUpFile();
            };
        }else{
            $button_up_file.disabled = true;

        }



        let $div_info = document.createElement('div');
        $div_info.className = 'col-12 col-lg-8';

        $div_row.appendChild($div_info);

        $div_info.innerHTML += `
    <div class="card radius-15">
        <div class="card-body">

            <div class="row">

                <div class="col-12 col-lg-4">
                    <p class="font-weight-bold mb-0" style="font-size:1.3rem">Họ Tên:
                    </p>

                </div>
                <p class="col-12 col-lg-8" style="text-align:center; font-size:1.3rem">
                    ${inforStudent['name']}</p>
            </div>
            <hr>
            <div class="row">

                <div class="col-12 col-lg-4">
                    <p class="font-weight-bold mb-0" style="font-size:1.3rem">Lớp:</p>

                </div>
                <p class="col-12 col-lg-8" style="text-align:center; font-size:1.3rem">
                ${inforStudent.className}</p>
            </div>

        </div>
    </div>
    <div class="card radius-15">
        <div class="card-body">

            <div class="row">

                <div class="col-12 col-lg-4">
                    <p class="font-weight-bold mb-0" style="font-size:1.3rem">Năm Sinh:
                    </p>

                </div>
                <p class="col-12 col-lg-8" style="text-align:center; font-size:1.3rem">
                ${inforStudent.yearOfBirth}</p>
            </div>
            <hr>
            <div class="row">

                <div class="col-12 col-lg-4">
                    <p class="font-weight-bold mb-0" style="font-size:1.3rem">Email:</p>

                </div>
                <p class="col-12 col-lg-8" style="text-align:center; font-size:1.3rem">
                ${inforStudent.email}</p>
            </div>

        </div>
    
</div>`

        appendTo($container, new Footer())
        var imported = document.createElement('script');
        imported.src = './assets/js/app.js'
        document.body.appendChild(imported)
        return $container;
    }


    handleClickChosseFile = (e) => {
        let tmpState = this.state;
        
        let reader;
        let input = document.createElement('input');
        input.type = "file";

        input.onchange = e => {
            tmpState.files = e.target.files;
            reader = new FileReader();
            reader.onload = () => {
                tmpState.urlImg = reader.result;
            }
            reader.readAsDataURL(tmpState.files[0]);
        }
        input.click();
        this.setState(tmpState)
    }

    handleClickUpFile = () => {
        let tmpState = this.state;

        let files = tmpState.files;
        let nameImg = tmpState.nameImg;
        let urlImg = tmpState.urlImg;
        let id = tmpState.inforStudent.id;
        tmpState.upload = true

        uploadStorageImage(nameImg, urlImg, files, id);

        this.setState(tmpState);

    }




}