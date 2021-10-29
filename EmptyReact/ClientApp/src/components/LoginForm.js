import React, { useEffect, useState } from 'react';
import classes from './UI/centralForm/CentralForm.module.css';
import { MyInput } from './UI/input/MyInput.jsx';
import { MyButton } from './UI/button/MyButton.jsx';
import { FetchComponent } from '../Utils/DataFetcher';

export const LoginForm = (props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => setIsFilled(login !== '' && password !== '' && confPassword === password));

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
      <MyInput 
        type="password"
        validationRegex='\w+'
        setValue={ setConfPassword }
        placeholder='Confirm password'
      />
      {isLoading?
      <h4>Loading...</h4>
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
