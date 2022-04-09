import {sendRequest} from './lib/http_request';

/**
 * Presents 2 fields and a save button. the button is disabled till both fields
 * have valid values in them
 * 
 * @param {*} props 
 * @returns 
 */
function InputForm() {

  // State Hooks - set state of component.
  // The 1st param is variable name (it's immutable)
  // The 2nd param is the method to update its value - called from event handlers
  const [email    , setEmail]   = React.useState(''); 
  const [password, setPassword] = React.useState('');  
  const [showPass, setShowPass] = React.useState('password');
  const [disabled, setDisabled] = React.useState(true);

  // event handlers - called when user makes changes, and updates our component's state
  function canBeSubmitted() {
    let notEmpty = email.length && password.length;
    return setDisabled(notEmpty);
  }
  
  function updateEmail(event) {
    const newValue = event.target.value;
    setEmail(newValue.replace(/\s/g, ''));
  }

  function updatePassword(event) {
    setPassword(event.target.value);
  }

  // refs - DOM nodes that we will do something with. Think of this like document.getElementyById
  const textInput = React.createRef();

  // ref handlers - called when you want to modify an element without updating state
  function focusTextInput() {
    // in this example - we want the "ref" (reference to input email) to be 
    // auto-focused when the page loads.
    textInput.current.focus();
  }

  /**
   * @description sends an HTTP POST request. Demo of how to use an external library & Fetch API
   * @returns {void}
   */
  function sendHttpRequest() {
    sendRequest({email: email, password: password, });
  }

  // Effect Hooks - side affects to the user making changes or other changes

  // This effect is run, it sets the focus on the input "email". Since, we don't
  //  want it to run again (unless the page is reloaded), we pass in an empty 
  // array. that array says "don't run unless the value passed in changes".
  // Since there's no value passed in, the result is always false and this hook
  // is never run again
  React.useEffect(focusTextInput, []);

  // The effect runs whenver
  React.useEffect(canBeSubmitted);

  return (
    <div className="container-lg">

      {/* email field */}
      <div class="mb-3">
        <label for="emailFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="emailFormControlInput1" 
               placeholder="name@example.com" value={email} onChange={updateEmail}
               ref={textInput} />
      </div>

      {/* password field */}
      <label for="passwordFormControlInput1" class="form-label">Password</label>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" 
                type="button" data-bs-toggle="dropdown" 
                aria-expanded="false"
        >{showPass === 'password'? 'show' : 'hide'}  password</button>
        <ul class="dropdown-menu">
          <li class="dropdown-item" onClick={() => setShowPass('text')}>Show</li>
          <li class="dropdown-item" onClick={() => setShowPass('password')}>Hide</li>
        </ul>
        <input type={showPass} class="form-control" aria-label="Text input with dropdown button" 
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
