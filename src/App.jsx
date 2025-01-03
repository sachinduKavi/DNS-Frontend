import { useState } from "react";

import { generateRandom } from "./middleware/textFormat";
import { veramDecodeQuery, vernamEncodeQuery } from "./service/APIconnection";


function App() {
  const [encryption, setEncryption] = useState(true)
  const [showNotification, setShowNotification] = useState(false);
  const [notificationContent, setNotification] = useState("")
  const [result, setResult] = useState("")


  const [context, changeContext] = useState({
    content: "",
    key: generateRandom()
  })


  // Calling the backend to do the process
  const callBackend = async (newContext) => {
    let response
    if(encryption) {
      response = await vernamEncodeQuery(newContext);
    } else {
      response = await veramDecodeQuery(newContext)
    }
    
    console.log(newContext, response)
    if(response.status === 200 && response.data.proceed) {
        setResult(response.data.content)
    } else {
      setResult("")
      changeContext({...context, content: ""})
      triggerNotification(response.data.message)
    }
  }


  // Handel the inputs
  const handelChange = async (e) => {
    const {name, value } = e.target
    const updateContext = {...context, [name]: value}
    changeContext(updateContext)
    await callBackend(updateContext)

  }


  const interchange = () => {
    const temp = result
    setResult(context.content)
    changeContext({...context, content: temp})
    setEncryption(pre => !pre)
  }
  
  const triggerNotification = (message) => {
    setNotification(message)
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false); 
    }, 3000);
  };
  return (
    
    <div className="App">
      
      {/* Conditionally render the hidden notification */}
      {showNotification && (
        <div className="hidden">
          <p>{notificationContent}</p>
        </div>
      )}
      <div className="header">
          <pre>
            Text Encryptor - <br />
              Secure Your Data
          </pre>
          <br/>
          <h2>"Hello, we use the Vernam cipher—a secure method
            that combines your text with a secret key to encrypt it.
            Each character of your text is mixed with a corresponding
            key character, ensuring strong encryption. Enter your plain
            text to begin encryption!"</h2>
        </div>
 
        <div className="container">
        <div className="form-group">

          <label>{encryption ? "Plain Text" : "Cipher Text"} : </label>
          <textarea placeholder="Type your text here..."
          value={context.content}
          name="content"
          onChange={handelChange}
          ></textarea>
        </div>
        <div className="form-group">




          <label>Enter Your Key:</label>
          <input type="text" placeholder="Type your key here..." 
          value={context.key}
          name="key"
          onChange={handelChange}/>
        </div>
        <div className="form-group">
          <label>Operation:</label>
          <div className="operation-toggle">
            <button disabled={encryption} onClick={interchange}>Encrypt</button>
            <button disabled={!encryption} onClick={interchange}>Decrypt</button>
           
          </div>
        </div>
        {/* <button className="submit">SUBMIT</button> */}
        <div className="form-group">
          <label>Your Result:</label>
          <textarea readOnly placeholder="Your result..." value={result}></textarea>
        </div>
      </div>
    
      <div className="header2">
          <pre>
            Text Decryptor - <br />
             Break the cipher
          </pre>
          <br/>
          <h2>
          "For decryption, we use the Vernam cipher to reverse the process. 
          Your encrypted text is combined with the same secret key to restore the original message.
           Enter your cipher text to unlock the plain text!"
          </h2>
      </div>
      
    </div>
  );
}

export default App;
