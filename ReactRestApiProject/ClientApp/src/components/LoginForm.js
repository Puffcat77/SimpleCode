import React, { useEffect, useState } from 'react';
import classes from './UI/centralForm/CentralForm.module.css';
import { MyInput } from './UI/input/MyInput.jsx';
import { MyButton } from './UI/button/MyButton.jsx';
import { FetchComponent } from '../Utils/DataFetcher';
import { Loader } from './UI/loader/Loader';

export const LoginForm = (props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => setIsFilled(login !== '' && password !== ''));

  function handleSubmit(e) {
    e.preventDefault();
    FetchComponent.login({ "login" : login, "password" : password}
    , setIsLoading
    , () => {window.location.href='/'});
  }

  return (
    <div className = { classes.form } >
      <MyInput 
        type="text"
        validationRegex='\w+'
        setValue={ setLogin }
        placeholder='Login/email'
      />
      <MyInput 
        type="password"
        validationRegex='\w+'
        setValue={ setPassword }
        placeholder='Password'
      />
      {isLoading?
      <div style={{display: 'flex', justifyContent: 'center'}}><Loader /></div>
      :
      <MyButton
      customClasses={ classes.animated }
      disabled={ !isFilled }
      value='Login'
      onClick = {e => handleSubmit(e)}
      />
      }
    </div>
  );
}
