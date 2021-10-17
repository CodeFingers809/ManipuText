// import useUndo from'@nkavtaradze/use-undo-hook';
import { useState } from "react";
import {
  convertInput,
  convertInputReverse,
} from "leet-speak-converter/src/leet-converter";
import Button from "./Button";

export default function TextUtil() {
  const [text, setText] = useState("");
  const inpBox = document.querySelector(".inpTextBox");

  const getSelection = () => {
    let indexStart = inpBox.selectionStart || 0;
    let indexEnd = inpBox.selectionEnd || 0;
    console.log({ start: indexStart, end: indexEnd });
    return { start: indexStart, end: indexEnd };
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const length = () => {
    let splitText = text.trim();
    splitText = text.split(" ").filter(function (n) {
      return n !== "";
    });
    return splitText.length >= 1 ? splitText.length : "0";
  };

  const convertLoText = () => {
    let selection = getSelection();
    if (selection.start === selection.end) {
      setText(text.toLowerCase());
    } else {
      let lowercaseText = text
        .slice(selection.start, selection.end)
        .toLowerCase();
      setText(
        text.substr(0, selection.start) +
          lowercaseText +
          text.substr(selection.end)
      );
    }
  };
  const convertUpText = () => {
    let selection = getSelection();
    if (selection.start === selection.end) {
      setText(text.toUpperCase());
    } else {
      let uppercaseText = text
        .slice(selection.start, selection.end)
        .toUpperCase();
      setText(
        text.substr(0, selection.start) +
          uppercaseText +
          text.substr(selection.end)
      );
    }
  };
  const convertCapText = () => {
    let selection = getSelection();
    if (selection.start === selection.end) {
      setText(
        text.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
      );
    } else {
      let cappedText = text
        .slice(selection.start, selection.end)
        .replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      setText(
        text.substr(0, selection.start) +
          cappedText +
          text.substr(selection.end)
      );
    }
  };
  const copyText = async () => {
    let selection = getSelection();
    if (selection.start === selection.end) {
      await navigator.clipboard.writeText(
        inpBox.value
      );
    } else {
      let slicedText = text
      .slice(selection.start, selection.end)
      await navigator.clipboard.writeText(
        slicedText
      );
    }
  };
  const clearText = () => {
    let selection = getSelection();
    if (selection.start === selection.end) {
      setText("");
    } else {
      setText(text.substr(0, selection.start) + text.substr(selection.end));
    }
  };
  const convertLeetText = () => {
    let selection = getSelection();
    if (selection.start === selection.end) {
      setText(convertInput(text));
    } else {
      let leetedText = convertInput(text
      .slice(selection.start, selection.end))
      setText(
        text.substr(0, selection.start) +
        leetedText +
          text.substr(selection.end)
      );
    }
    
  };
  const convertTextLeet = () => {
    setText(convertInputReverse(text));
  };
  const convertInvCapText = () => {
    let result = "";
    for (let i in text) {
      let letter = text[i];
      if (letter === letter.toLowerCase()) {
        result += letter.toUpperCase();
      } else {
        result += letter.toLowerCase();
      }
    }
    setText(result);
  };
  const convertToggText = () => {
    let result = "";
    for (let i in text) {
      let letter = text[i];
      if (Math.random() < 0.7) {
        result += letter.toLowerCase();
      } else {
        result += letter.toUpperCase();
      }
    }
    setText(result);
  };
  const convertAltCapText = () => {
    let result = "";
    for (let i in text) {
      let letter = text[i];
      if (i % 2 === 0) {
        result += letter.toUpperCase();
      } else {
        result += letter.toLowerCase();
      }
    }
    setText(result);
  };
  const remExtSpaces = () => {
    let splitText = text;
    splitText = splitText.replaceAll(/^\s*$(?:\r\n?|\n)/gm, " ");
    splitText = splitText.replaceAll("\n", " ");
    splitText = splitText.replaceAll("\t", " ");
    splitText = splitText
      .trim()
      .split(" ")
      .filter(function (n) {
        return n !== "";
      })
      .join(" ");
    setText(splitText);
  };
  const shuffleText = () => {
    setText(
      text
        .split("")
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join("")
    );
  };
  const reverseText = () => {
    setText(text.split("").reverse().join(""));
  };
  const convertBinaryText = () => {
    setText(
      text
        .split("")
        .map(function (char) {
          return char.charCodeAt(0).toString(2);
        })
        .join(" ")
    );
  };
  const convertOctText = () => {
    setText(
      text
        .split("")
        .map(function (char) {
          return char.charCodeAt(0).toString(8);
        })
        .join(" ")
    );
  };
  const convertHexText = () => {
    setText(
      text
        .split("")
        .map(function (char) {
          return char.charCodeAt(0).toString(16);
        })
        .join(" ")
    );
  };

  return (
    <div className="container p-4">
      <div className="selectInfo text-center mb-3 alert alert-primary">
        To use a tool only on a particular part of the text, first select the
        part of the text and then click on any tool!
      </div>
      <div className="mb-2">
        <textarea
          className="form-control inpTextBox"
          id="exampleFormControlTextarea1"
          rows="8"
          placeholder="Enter text here"
          value={text}
          onChange={handleChange}
          // ref={element}
        />
      </div>
      <div className="textInfo h5 mb-3">
        Your text has {length()} words and {text.length} letters.
      </div>
      <div className="utilitiesBox d-flex flex-wrap">
        <Button function={copyText} text="Copy Text" />
        <Button function={clearText} text="Clear Text" />
        <Button function={convertUpText} text="Uppercase" />
        <Button function={convertLoText} text="Lowercase" />
        <Button function={convertCapText} text="Capitalize" />
        <Button function={convertInvCapText} text="Invert Case" />
        <Button function={convertToggText} text="Toggle Case" />
        <Button function={convertAltCapText} text="Alternative Caps" />
        <Button function={convertLeetText} text="Leet Text" />
        <Button function={convertTextLeet} text="Un-Leet Text" />
        <Button function={remExtSpaces} text="Remove Extra Spaces" />
        <Button function={shuffleText} text="Shuffle Text" />
        <Button function={reverseText} text="Reverse Text" />
        <Button function={convertBinaryText} text="To Binary" />
        <Button function={convertOctText} text="To Octal" />
        <Button function={convertHexText} text="To Hexadecimal" />
      </div>
    </div>
  );
}
