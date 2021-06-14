import { useState } from 'react';

export default function useMessage() {
  const [isClick, setIsClick] = useState(false);

  const handleClickText = () => {
    setIsClick(!isClick);
  };

  const handleKeyPressText = () => {
    setIsClick(!isClick);
  };

  return { isClick, handleClickText, handleKeyPressText };
}
