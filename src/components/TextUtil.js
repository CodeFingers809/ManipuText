import { useState } from "react";
import {
  convertInput,
  convertInputReverse,
} from "leet-speak-converter/src/leet-converter";
import Button from "./Button";

export default function TextUtil() {
  const [text, setText] = useState("");

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
    setText(text.toLowerCase());
  };
  const convertUpText = () => {
    setText(text.toUpperCase());
  };
  const convertCapText = () => {
    setText(
      text.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      })
    );
  };
  const copyText = () => {
    document.querySelector(".inpTextBox").select();
    document.execCommand("copy");
  };
  const convertLeetText = () => {
    setText(convertInput(text));
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
  const convertAltCapText=()=>{
    let result=""
    for(let i in text){
      let letter = text[i]
      if(i%2===0){
        result+=letter.toUpperCase()
      }else{
        result+=letter.toLowerCase()
      }
    }
    setText(result)
  }
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
      <div className="mb-3">
        <textarea
          className="form-control inpTextBox"
          id="exampleFormControlTextarea1"
          rows="8"
          placeholder="Enter text here"
          value={text}
          onChange={handleChange}
        />
      </div>
      <div className="utilitiesBox mb-3">
        <Button function={copyText} text="Copy Text" />
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
      <div className="textInfo">
        Your text has {length()} words and {text.length} letters.
      </div>
    </div>
  );
}
