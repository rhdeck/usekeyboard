import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const emptyCoordinates = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0,
});
const initialValue = {
  start: emptyCoordinates,
  end: emptyCoordinates,
};

export function useKeyboard() {
  const [shown, setShown] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [showing, setShowing] = useState(false);
  const [coordinates, setCoordinates] = useState(initialValue);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleKeyboardWillShow = (e) => {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    setShowing(true);
  };
  const handleKeyboardDidShow = (e) => {
    setShown(true);
    setShowing(false);
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    setKeyboardHeight(e.endCoordinates.height);
  };
  const handleKeyboardWillHide = (e) => {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    setHiding(true);
  };
  const handleKeyboardDidHide = (e) => {
    setShown(false);
    setHiding(false);
    if (e) {
      setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    } else {
      setCoordinates(initialValue);
      setKeyboardHeight(0);
    }
  };

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", handleKeyboardWillShow);
    Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow);
    Keyboard.addListener("keyboardWillHide", handleKeyboardWillHide);
    Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardWillShow", handleKeyboardWillShow);
      Keyboard.removeListener("keyboardDidShow", handleKeyboardDidShow);
      Keyboard.removeListener("keyboardWillHide", handleKeyboardWillHide);
      Keyboard.removeListener("keyboardDidHide", handleKeyboardDidHide);
    };
  }, []);

  return {
    keyboardShown: shown,
    coordinates,
    keyboardHeight,
    keyboardHiding: hiding,
    keyboardShowing: showing,
  };
}
