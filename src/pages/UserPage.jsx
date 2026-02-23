import { useContext } from "react";
import "../css/userpage.css";
import { AuthContext } from "../context/AuthProvider";
import { setField, setErrorMessage } from '../redux/updateUserSlice'
import { useDispatch, useSelector } from "react-redux";
import updateUserApi from "../api/updateUserApi";
const UserPage = () => {
  const { loggedUser, usersList, setUpdated } = useContext(AuthContext);
  const { email, name, avatar, errorMessage } = useSelector((state) => state.updateUser)
  const dispatch = useDispatch();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserApi(loggedUser?.id, email, name, avatar)
      setUpdated(prev => !prev);
      return res
    } catch (err) {
      console.log(err.message)
      dispatch(setErrorMessage("There was an ERR"))
    }
  }

  return (
    <main className="page page-profile">
      <section className="section profile-hero">
        <div className="container">
          <div className="profile-hero-layout">
            <div className="profile-hero-text">
              <p className="section-kicker">Account</p>
              <h1 className="section-title">{loggedUser?.name}'s' profile</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section profile-main">
        <div className="container profile-main-layout">
          <aside className="profile-summary">
            <div className="profile-card profile-card--summary">
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar-ring">
                  <img
                    src={loggedUser?.avatar}
                    alt="User avatar placeholder"
                    className="profile-avatar"
                  />
                </div>
              </div>

              <div className="profile-summary-body">
                <p className="profile-summary-label">Signed in as</p>
                <p className="profile-summary-name">{loggedUser?.name}</p>
                <p className="profile-summary-email">{loggedUser?.email}</p>

              </div>
            </div>
          </aside>

          <section className="profile-form-section">
            <div className="profile-card profile-card--form">
              <h2 className="profile-form-title">Account details</h2>

              <form className="profile-form" noValidate onSubmit={(e) => handleUpdateUser(e)}>
                <div className="profile-form-grid">
                  <label className="profile-field">
                    <span className="profile-label">Name</span>
                    <input
                      type="text"
                      className="profile-input"
                      placeholder={loggedUser?.name}
                      value={name}
                      onChange={(e) => dispatch(setField({ field: 'name', value: e.target.value }))}
                    />
                  </label>

                  <label className="profile-field">
                    <span className="profile-label">Email</span>
                    <input
                      type="email"
                      className="profile-input"
                      placeholder={loggedUser?.email}
                      value={email}
                      onChange={(e) => dispatch(setField({ field: 'email', value: e.target.value }))}
                    />
                  </label>

                  <label className="profile-field">
                    <span className="profile-label">Avatar URL</span>
                    <input
                      type="text"
                      className="profile-input"
                      placeholder={loggedUser?.avatar}
                      value={avatar}
                      onChange={(e) => dispatch(setField({ field: 'avatar', value: e.target.value }))}
                    />
                    <span className="profile-field-hint">
                      Paste a link to any image to update your profile picture.
                    </span>
                  </label>
                </div>

                <div className="profile-form-footer">
                  <button type="submit" className="btn-primary profile-save-btn">
                    Save changes
                  </button>
                </div>
              </form>
              {errorMessage && <p>There was an Error</p>}
            </div>
          </section>
        </div>
      </section>


      <section className="section profile-customers">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Community</p>
            <h2 className="section-title">Our oldest customers</h2>
          </div>

          <div className="customers-grid">
            {usersList && usersList.slice(0, 8).map((user) => <article className="customer-card">
              <div className="customer-avatar-wrapper">
                <img
                  src={user.avatar}
                  alt="Customer 1"
                  className="customer-avatar"
                />
              </div>
              <div className="customer-body">
                <p className="customer-name">{user.name}</p>
                <p className="customer-email">{user.email}</p>
              </div>
            </article>)}
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserPage;
