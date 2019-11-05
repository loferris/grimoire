import React from "react";
import { convertToRaw, EditorState, RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";

function UserEditor() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      handleKeyCommand={handleKeyCommand}
    />
  );
}
export default UserEditor;
