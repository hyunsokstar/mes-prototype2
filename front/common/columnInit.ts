import TextEditor from '../components/util/TextEditor'
import TextEditorForPassWordCheck from '../components/util/TextEditorForPassWordCheck'
import { InputWithSelect } from '../components/dropdown/InputWithSelect'
import searchModalForUser from '../components/modal/searchModalForUser'
import FileUploadButton from '../components/FileUploadButton'


export const columnlist: any = {
    member: [
        { key: 'email', name: "email", editor: TextEditor },
        { key: 'name', name: "name", editor: TextEditor },
        { key: 'password', name: "password", editor: TextEditor },
        { key: 'passwordCheck', name: "passwordCheck", editor: TextEditorForPassWordCheck },
        { key: 'height', name: "height", formatter: InputWithSelect},
        { key: 'company', name: "company", formatter: searchModalForUser},
    ],

    member2: [
        { key: 'email', name: "email", editor: TextEditor },
        { key: 'name', name: "name", editor: TextEditor },
        { key: 'password', name: "password", editor: TextEditor },
        { key: 'passwordCheck', name: "passwordCheck", editor: TextEditorForPassWordCheck },
        { key: 'height', name: "height", formatter: InputWithSelect},
        { key: 'picture', name:'picture', formatter:FileUploadButton},
        { key: 'company', name: "company", formatter: searchModalForUser},
    ],

}

