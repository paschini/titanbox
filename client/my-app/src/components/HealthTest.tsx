import React, { useState, useEffect } from 'react';

function HealthTest() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('http://localhost:1337/health/ping');
      let response = await res.json();
      setData(response.message);
    };

    fetchData().then((data) => data);
  }, [data]);

  return (
    <div>
      <p>Pinging server...</p>
      {data && <p>{data}</p>}
    </div>
  );
}

export default HealthTest;
