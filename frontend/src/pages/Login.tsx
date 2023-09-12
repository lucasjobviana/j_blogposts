import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Divider, TextField, useTheme } from '@mui/material';
import { Login, PersonAdd, Save } from '@mui/icons-material';
import { useLoginUserContext } from '../shared/contexts';

export const J_Login = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [userName, setUserName] = React.useState<string>('');
  const [image, setImage] = React.useState<string>('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9aSiqjy7SUZWzKFusTfV_7tDbFfqPt_pWLA&usqp=CAU');
  const [createUser, setCreateUser] = React.useState<boolean>(false);
  const { create, login } = useLoginUserContext();
  const theme = useTheme();
  const navigate = useNavigate();

  const  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.name === 'password' && setPassword(event.target.value);
    event.target.name === 'email' && setEmail(event.target.value);
    event.target.name === 'username' && setUserName(event.target.value);
    event.target.name === 'image' && setImage(event.target.value);
  };

  const handleClick = async () => {
    const success = await login(email, password);
    success ? navigate('/Blog')
      : alert('Usuário ou senha inválidos');
  };

  const handleCreateUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCreateUser(true);
    console.log(event.target);
  };

  const handleSaveNewUser = () => {
    const hasCreated = create(userName, email, password, image||undefined);
    setCreateUser(!hasCreated);
  };

  return (
    <Box color={theme.palette.text.primary}  width={'100vw'} height={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
      <Box flex={1}  width={200} height={'auto'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        {
          createUser && <Box height={theme.spacing(16)} display='flex' alignItems='center' justifyContent='center' >
            <Avatar sx={{ bgcolor: theme.palette.primary.light, width: theme.spacing(8), height:theme.spacing(8) }} src={image} />
          </Box>
        }
        <Divider />
        <TextField  label='Email' variant='filled' size='small' name='email' value={email} onChange={handleChange} />
        <TextField   label='Senha' type='password' variant='filled' size='small' name='password' value={password} onChange={handleChange} />
        {
          createUser && <>
            <TextField   label='Usuário' variant='filled' size='small' name='username' value={userName} onChange={handleChange} />
            <TextField   label='Link para imagem:' variant='filled' size='small' name='image' value={image} onChange={handleChange} />
          </>
        }
        <Box height={10} width={'auto'}>
          {
            createUser ?
              <Button size='small' variant='contained' color='primary' startIcon={<Save />} onClick={handleSaveNewUser} />:
              <>
                <Button  size='small' variant='contained' color='primary' startIcon={<Login />} onClick={handleClick} />
                <Button size='small' variant='contained' color='primary' startIcon={<PersonAdd />} onClick={handleCreateUser} />
              </>
          }

        </Box>
      </Box>
    </Box>
  );
};
