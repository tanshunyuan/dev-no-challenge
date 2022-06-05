import { useState} from "react";
import { Final } from "./components/Final";
import { ImageUpload } from "./components/ImageUpload";
import { ProgressBar } from "./components/Progress";

function App() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  if (image !== null) return <Final alt="something" url={image} />;
  return (
    <div className="container">
      {!loading ? (
        <ImageUpload setLoading={setLoading} setImage={setImage} />
      ) : (
        <ProgressBar />
      )}
    </div>
  );
}

export default App;
