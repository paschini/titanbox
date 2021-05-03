import { useState } from 'react';
import QrReader from 'react-qr-reader';

function ScanCode() {
  const [result, setResult] = useState(null);

  const handleError = (error: any) => {
    console.log(error);
  };

  const handleScan = (data: any) => {
    if (data) {
      setResult(data);
    }
  };

  return <div>
    <h2>Grab your box, scan the code...</h2>
    <QrReader facingMode={"user"} delay={100} onError={handleError} onScan={handleScan} />
    <p>{result}</p>
  </div>;
}

export default ScanCode;
