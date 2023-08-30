import { useEffect, useState } from 'react';
import { getUser } from './backend_api/user';
import './App.css'

function App() {
  const [data, setData] = useState('Waiting for data...')

  const fetchData = async () => {
   console.log('Fetching data from Node server...')
    const response = await getUser();
    setData(response.message);
  }

  useEffect(() => {
     fetchData();
  }, []);



  return (
    <>
     {data}
    </>
  )
}

export default App
