import React, {useState} from "react";
import styles from './clipboardCopy.module.css'

export function ClipboardCopy({copyText, className}) {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={[styles.container, className].join(' ')}>
      <div
        className={"flex flex-row align-middle rounded p-2 overflow-hidden"}
        style={{backgroundColor: 'var(--ifm-background-color)'}}
      >
        <span className={"text-2xl mr-2"} style={{
          color: 'var(--ifm-font-color-base)',
          paddingTop: '0.3rem',
        }}>$</span>
        <input type="text"
               style={{
                 font: 'var(--ifm-font-family-monospace)',
                 fontSize: '1.5rem',
                 color: 'var(--ifm-font-color-base)',
                 backgroundColor: 'transparent'
               }}
               className={"border-0 text-2xl"} value={copyText} readOnly/>
        <button onClick={handleCopyClick}
                style={{
                  backgroundColor: 'var(--ifm-background-color)',
                  font: 'var(--ifm-font-family-base)',
                  border: 'var(--ifm-border-width-base) solid var(--ifm-border-color-base)',
                  margin: '-1.5rem -.5rem -1.5rem 0',
                  padding: '1.5rem'
                }}>
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>


    </div>
  );
}
