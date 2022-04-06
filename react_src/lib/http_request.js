/**
 * @description example of how to use Fetch API to send HTTP POST
 * @param {Object} formValues 
 * @returns {Promise}
 */
function sendRequest(formValues) {
  let init = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(formValues),
  };

  const URI = `http://localhost:8080`;

  const request = new Request(URI, init);

  return fetch(request)
    .then(res => res.json())
    .then(res  => res.items);
}

export { sendRequest };