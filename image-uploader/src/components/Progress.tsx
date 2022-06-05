import "../styles/progress.css";
export const ProgressBar = () => {
  return (
    <div className="progress-container">
      <p>Uploading...</p>
      <div className="progress-bar">
        <div className="inner-bar"></div>
      </div>
    </div>
  );
};
