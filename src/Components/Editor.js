import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import Actions from "../Actions";

const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    const code = async () => {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("textarea"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      //CODE SYNC
      editorRef.current.on("change", (instances, changes) => {
        console.log("changes", changes);
        const { origin } = changes;
        const codes = instances.getValue();
        if (origin !== "setValue") {
          socketRef.current.emit(Actions.CODE_CHANGE, {
            roomId,
            codes,
          });
        }
      });
      // console.log(code);
    };

    code();
  }, []);

  return <textarea id="textarea"></textarea>;
};

export default Editor;
