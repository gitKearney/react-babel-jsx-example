import {sendRequest} from './lib/http_request';

/**
 * Presents 2 fields and a save button. the button is disabled till both fields
 * have valid values in them
 * 
 * @param {*} props 
 * @returns 
 */
function InputForm() {

  // keeps track of the value of the email input field. We intialize the value
  // to ''. setEmail is a function to set the value of email
  const [email, setEmail] = React.useState(''); 
  
  // keeps track of the value of the password input field. We intialize the
  // value to ''. setPassword is a function to set the value of the password
  const [password, setPassword] = React.useState('');  


  // sets the type of the input field "password" either to password or text
  // setDisplayPass is a function that sets the value of displayPass
  const [displayPass, setDisplayPass] = React.useState('password');

  // sets whether or not the submit button is clickable or not
  // setDisabled is a method that sets disabled to either true or false
  const [disabled, setDisabled] = React.useState(true);

  /**
   * @description if the email input field and the password input field contain 
   * values, allow the form to be submitted
   * @returns {void}
   */
  function canBeSubmitted() {
    if (email.length && password.length) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }

  /**
   * @description read the value of the input field "email" and strip out any
   *  spaces then update the component's state of email
   * @param {Event} event 
   */
  function updateEmail(event) {
    const newValue = event.target.value;
    setEmail(newValue.replace(/\s/g, ''));
  }

  /**
   * @description read the value of the input field "password" then update the
   * component's state password
   * @param {Event} event 
   */
  function updatePassword(event) {
    setPassword(event.target.value);
  }

  /**
   * @description sends and HTTP POST request to localhost. Simply to demonstrate
   * how to use an external library and how to use Fetch API
   * @returns {void}
   */
  function sendHttpRequest() {
    sendRequest({email: email, password: password, });
  }

  React.useEffect(canBeSubmitted);

  return (
    <div className="container-lg">

      {/* email field */}
      <div class="mb-3">
        <label for="emailFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="emailFormControlInput1" 
               placeholder="name@example.com" value={email} onChange={updateEmail} />
      </div>

      {/* password field */}
      <label for="passwordFormControlInput1" class="form-label">Password</label>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" 
                type="button" data-bs-toggle="dropdown" 
                aria-expanded="false"
        >{displayPass === 'password'? 'show' : 'hide'}  password</button>
        <ul class="dropdown-menu">
          <li class="dropdown-item" onClick={() => setDisplayPass('text')}>Show</li>
          <li class="dropdown-item" onClick={() => setDisplayPass('password')}>Obfuscated</li>
        </ul>
        <input type={displayPass} class="form-control" aria-label="Text input with dropdown button" 
               id="passwordFormControlInput1" value={password} onChange={updatePassword} />
      </div>

      {/* save button */}
      <div className="mb-3">
        <button type="button" class="btn btn-lg btn-primary" disabled={disabled} onClick={sendHttpRequest}>Submit</button>
      </div>
    </div>
  );
}

export default InputForm;
