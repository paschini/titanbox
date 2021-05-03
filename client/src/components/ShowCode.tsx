import React, { useEffect, useState } from 'react';

type BoxData = {
  uuid: string | null;
  label: string | null;
  contents: string | null;
  currentLocation: string | null;
  QRImage: string | null;
};

function ShowCode() {
  const [data, setData] = useState<BoxData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "uuid": "1537901c-cb5a-4fdf-bb25-0c9f5539eaca"
        })
      };

      let res = await fetch('http://localhost:1337/qrcode/boxByUuid', requestOptions);
      let response = await res.json();
      setData(response.data);
    };

    fetchData().then((data) => data);
  }, []);

  return (
    <div>
      {data?.map((box, index) => (
        <div key={index}>
          <img width={177} height={177} src={box.QRImage || '#'} alt={'QR code'} />
          <h2>{box.label}</h2>
          <p>{box.contents}</p>
          <p>{box.currentLocation}</p>
        </div>
      ))}
    </div>
  );
}

export default ShowCode;
