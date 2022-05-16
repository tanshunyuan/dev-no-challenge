import { useState } from "react";
import "../styles/final.css";
interface Resource {
  alt: string;
  url: string;
}

// TODO
// Error handling if image not uploaded successfully
// Error handling for wrong image type
export const Final = ({ alt, url }: Resource) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyOnClick = (url: string) => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  return (
    <div className="final-container">
      <div className="final-header">
        <h3>Uploaded Successfully!</h3>
      </div>
      <div className="final-body">
        <img src={url} alt={alt} />
      </div>
      <div className="final-footer">
        <p>{url}</p>
        <button
          disabled={isCopied}
          className="btn bg-primary"
          onClick={() => copyOnClick(url)}
        >
          {!isCopied ? "Copy" : "Copied!"}
        </button>
      </div>
    </div>
  );
};
