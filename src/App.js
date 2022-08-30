import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Provider/firebase";
import "./App.css";
import "./Style/resetButton.css";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

function App() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="app">{user ? <HomePage user={user} /> : <LoginPage />}</div>
  );
}

export default App;
