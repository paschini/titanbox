import React, {useEffect, useState} from 'react';

type BoxData = {
  uuid: string | null;
  label: string | null;
  contents: string | null;
  QRImage: string | null;
}

function ShowCode() {
  const [data, setData] = useState<BoxData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('http://localhost:1337/qrcode/firstEmpty');
      let response = await res.json();
      setData(response.data);
    };

    fetchData().then((data) => data);
  }, []);

  return (
    <div>
      <h2>Here's an empty box:</h2>
      {data?.map((box, index) => (
        <p key={index}>{box.uuid}</p>
      ))}
    </div>
  );
}

export default ShowCode;