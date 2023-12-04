export const copyToClipboard = (
  text: string,
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>
) => {
  navigator.clipboard.writeText(text);
  setIsCopied(true);

  setTimeout(() => {
    setIsCopied(false);
  }, 2000);
};
