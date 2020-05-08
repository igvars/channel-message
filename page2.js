"use strict";

function App() {
  const [listItems, setListItems] = React.useState([]);
  const port2 = React.useRef(null);

  function onMessage(e) {
    console.log(e.data);
    setListItems([...listItems, e.data]);
  }
  function initPort(e) {
    port2.current = e.ports[0];
    port2.current.onmessage = onMessage;
  }

  React.useEffect(() => {
    window.addEventListener("message", initPort);
    return () => {
      window.removeEventListener("message", initPort);
    };
  }, []);

  function sendData() {
    port2.current.postMessage(listItems);
  }

  function add() {
    setListItems([...listItems, "a"]);
  }
  return (
    <React.Fragment>
      <ul>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button type="button" onClick={add}>
        Add element locally
      </button>
      <button type="button" onClick={sendData}>
        Sent
      </button>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
