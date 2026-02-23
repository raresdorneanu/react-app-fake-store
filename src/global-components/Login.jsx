import { useContext, useReducer } from "react";
import "../css/auth.css";
import loginApi from "../api/loginApi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const initialState = {
  email: "",
  password: "",
  errorMessage: "",
  successMessage: "",
  apiStatus: "idle",
};

function reducer(state, action) {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };

    case "setError":
      return { ...state, errorMessage: action.payload };

    case "setApiStatus":
      return { ...state, apiStatus: action.value };

    default:
      throw new Error("Unknown action type");
  }
}

const Login = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, errorMessage, apiStatus } = state;
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      dispatch({ type: "setError", payload: "All fields must be completed" })
      return
    }
    dispatch({ type: "setApiStatus", value: "loading" });
    try {
      const data = await loginApi(email, password);
      if (data) {
        dispatch({ type: "setApiStatus", value: "succeeded" });
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("loggedUserEmail", email);
        navigate("/");
        setIsLoggedIn(true);
      }
    } catch (err) {
      dispatch({ type: "setError", payload: err.message });
      dispatch({ type: "setApiStatus", value: "error" });
    }
  }

  return (
    <main className="page auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Sign in</h1>
          <p className="auth-subtitle">
            Access your account to view orders, saved items and more.
          </p>

          <form
            className="auth-form"
            autoComplete="on"
            noValidate
            onSubmit={handleSubmit}
          >
            <label className="auth-field">
              <span className="auth-label">Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="auth-input"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => dispatch({ type: "setField", field: "email", value: e.target.value })}
              />
            </label>

            <label className="auth-field">
              <span className="auth-label">Password</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                className="auth-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => dispatch({ type: "setField", field: "password", value: e.target.value })}
              />
            </label>

            <button type="submit" className="auth-submit">
              Sign in
            </button>
          </form>

          {errorMessage && <p className="passMatchMessage">{errorMessage}</p>}

          <div className="loading-gif">
            {apiStatus === "loading" ? <img src="assets/loading-gif.gif" alt="loading" /> : null}
          </div>

          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
