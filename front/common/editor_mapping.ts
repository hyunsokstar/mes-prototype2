import searchModalForUser from '../components/modal/searchModalForUser';
import TextEditor from '../components/util/TextEditor'


export const selectEditor = (editor: string) => {

    let editorText = editor;
    console.log("셀렉트 에디터 실행", editorText);

    switch(editor) {
        case "TextEditor":
          return TextEditor;
        case "searchModalForUsers":
          return searchModalForUser;
        default:
          // code block
      }
      


    return editor;
} 