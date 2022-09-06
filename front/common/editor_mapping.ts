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
          return searchModalForUser;

      }
      


    return editor;
} 

export const selectFormatter = (formatter: string) => {


  console.log("formatterText 에디터 실행", formatter);

  switch(formatter) {
      case "TextEditor":
        return TextEditor;
      case "searchModalForUsers":
        return searchModalForUser;
      default:
        return searchModalForUser;
    }
    


  // return editor;
}