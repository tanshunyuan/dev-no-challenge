import "../styles/progress.css";
export const ProgressBar = ({ width }: { width: string }) => {
  return (
    <div className="progress-container">
      <p>Uploading...</p>
      <div className="progress-bar">
        <div className="inner-bar"></div>
      </div>
    </div>
  );
};
