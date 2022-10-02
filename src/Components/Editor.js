import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/display/fullscreen";
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/display/panel";
import Actions from "../Actions";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("textarea"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          // scrollbarStyle: "simple",

          // fullScreen: true,
        }
      );

      //CODE SYNC
      editorRef.current.on("change", (instances, changes) => {
        console.log("changes", changes);
        const { origin } = changes;
        const code = instances.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(Actions.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
      // console.log(code);
    };

    init();
  }, []);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(Actions.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(Actions.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return <textarea id="textarea"></textarea>;
};

export default Editor;
