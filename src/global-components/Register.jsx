import { useReducer } from "react";
import "../css/auth.css";
import registerApi from "../api/registerApi";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatar: "",
  errorMessage: "",
  successMessage: "",
  apiStatus: "idle",
};

function reducer(state, action) {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };

    case "setError":
      return { ...state, errorMessage: action.value, successMessage: "" };

    case "setSuccess":
      return { ...state, successMessage: action.value, errorMessage: "" };

    case "setApiStatus":
      return { ...state, apiStatus: action.value };

    default:
      throw new Error("Unknown action type");
  }
}

export default function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, email, password, confirmPassword, errorMessage, successMessage, apiStatus } = state;
  const passwordMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "setError", value: "" });
    dispatch({ type: "setSuccess", value: "" });
    const avatar = `https://i.pravatar.cc/150?u=${name.split(' ').join("")}`

    if (!name || !email || !password || !confirmPassword) {
      dispatch({ type: "setError", value: "You must complete all fields before submit" });
      return;
    }

    if (!passwordMatch) {
      dispatch({ type: "setError", value: "Passwords do not match!" });
      return;
    }

    dispatch({ type: "setApiStatus", value: "loading" });

    try {
      await registerApi(name, email, password, avatar);
      dispatch({ type: "setApiStatus", value: "succeeded" });
      dispatch({ type: "setSuccess", value: "Successfully Registered!" });

    } catch (err) {
      dispatch({ type: "setApiStatus", value: "failed" });
      dispatch({ type: "setError", value: err.message });
    }
  };

  return (
    <main className="page auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">
            Join Clothify and save your favourites, track orders and more.
          </p>

          <form className="auth-form" autoComplete="on" noValidate onSubmit={handleSubmit}>
            <label className="auth-field">
              <span className="auth-label">Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                className="auth-input"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => dispatch({ type: "setField", field: "name", value: e.target.value })}
              />
            </label>

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
                autoComplete="new-password"
                className="auth-input"
                placeholder="Create a password"
                value={password}
                onChange={(e) => dispatch({ type: "setField", field: "password", value: e.target.value })}
              />
            </label>

            <label className="auth-field">
              <span className="auth-label">Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                className="auth-input"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) =>
                  dispatch({ type: "setField", field: "confirmPassword", value: e.target.value })
                }
              />
            </label>

            <button type="submit" className="auth-submit" disabled={apiStatus === "loading"}>
              Create account
            </button>
          </form>

          {errorMessage && <p className="passMatchMessage">{errorMessage}</p>}
          {successMessage && <p className="successMessage">{successMessage}</p>}

          <div className="loading-gif">
            {apiStatus === "loading" ? <img src="assets/loading-gif.gif" alt="loading" /> : null}
          </div>

          <p className="auth-footer-text">
            Already have an account?
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}