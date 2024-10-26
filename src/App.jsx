import { useEffect, useState } from "react";
import { getLocalstorage } from "../utils/handleLocalstorage";
import "./App.css";
import { Auth } from "./components/Auth/Auth";
import { FeedBack } from "./components/Feedback/FeedBack";

function App() {
  let [LoggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    let User = getLocalstorage("LoggedInUser");
    setLoggedInUser(User);
  }, []);

  return (
    <div>
      {!LoggedInUser && <Auth />}
      {(LoggedInUser?.type === "user" || LoggedInUser?.type == "admin") && (
        <FeedBack />
      )}
    </div>
  );
}

export default App;
