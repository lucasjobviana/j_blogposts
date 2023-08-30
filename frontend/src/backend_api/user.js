const getUser = async () => { // (userId)
    const token = 'tokenaleatorio';
    try {
      // const user = { id: 1 };
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      };
      
      const response = await fetch('http://localhost:3001/', requestOptions);
      // if (!response.ok) {
      //   throw new Error('Erro ao obter os dados da API.');
      // }
  
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
  }