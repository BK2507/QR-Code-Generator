import { useState } from "react"
import "./styles.css"

export const QrCode = () => {
  
  const[img, setImg]=useState("");
  const[loading, setLoading] = useState(false)
  const[qrData, setQrData] = useState("")
  const[qrSize, setQrSize] = useState("150")

  function downloadQR(){
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "QR-Code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link)
    })
    .catch((error)=>{
      console.error("Error downloading QR code",error)
    })
  }

  function generateQR(){
    setLoading(true);
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    }catch(error){
      console.error("Error generating QR Code",error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait......!</p>}
        {img && <img src={img} alt="Enter data for QR" className="qr-code-image"/>} 
       <div>
         <label htmlFor="dataInput" className="input-label">
            Data for QR Code:
         </label>
         <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR Code" onChange={(e)=>setQrData(e.target.value)}></input>
         <label htmlFor="sizeInput" className="input-label">
            Image size (e.g.150):
         </label>
         <input type="text"  value={qrSize} id="sizeInput" placeholder="Enter image size" onChange={(e)=>setQrSize(e.target.value)}></input>
        <button className="generate-btn" disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className="download-btn" onClick={downloadQR}>Download QR Code</button>
       </div> 
    </div>

  )
}
