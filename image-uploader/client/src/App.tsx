import { useState } from 'react'
import './styles/app.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
    <div className="image-container">
    <div className="image-header">
    <h4>Upload your image</h4>
    <p>File should be Jpeg, Png...</p>
    </div>
    <div className="image-body"></div>
    <p className="image-divider">Or</p>
    <div className="image-action">
    <button className="btn bg-primary">Choose a File</button>
    </div>
    </div>
    </div>
  )
}

export default App
