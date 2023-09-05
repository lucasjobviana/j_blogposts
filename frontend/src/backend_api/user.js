const getUser = async () => {
  const token = 'tokenaleatorio';
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('http://localhost:3001/', requestOptions);
    const data = await response.json();
    console.log('Dados recebidos:', data);
    return data;
  } catch (error) {
    console.error('Erro durante a requisição:', error);
    console.log(error);
    return null;
  }
};

export {
  getUser
};