import {FaMoon, FaSun} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {withRouter, Link} from 'react-router-dom'
import ThemeContext from '../../context/themeContext'
import './index.css'

const Navbar = props => {
  const {history} = props
  const clicked = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {lightTheme, changeTheme} = value
        const themeButtonClicked = () => {
          changeTheme()
        }
        return (
          <nav className="topNav-1">
            <Link to="/">
              <img
                src={
                  lightTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                }
                width="120px"
                alt="website logo"
              />
            </Link>
            <ul className="topNav-2">
              <li key="theme">
                <button
                  data-testid="theme"
                  type="button"
                  onClick={themeButtonClicked}
                  className="themeButton"
                >
                  {lightTheme ? (
                    <FaMoon color="black" className="themeIcon" />
                  ) : (
                    <FaSun color="white" className="themeIcon" />
                  )}
                </button>
              </li>
              <li key="profile">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  width="25px"
                />
              </li>
              <li key="logoutButton">
                <Popup
                  trigger={
                    <button
                      className={
                        lightTheme ? 'logoutButtonLight' : 'logoutButtonDark'
                      }
                      type="button"
                    >
                      Logout
                    </button>
                  }
                  modal
                  nested
                >
                  {close => (
                    <div
                      className={
                        lightTheme
                          ? 'popupContainerLight'
                          : 'popupContainerDark'
                      }
                    >
                      <p>Are you sure, you want to logout</p>
                      <button type="button" onClick={clicked}>
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="button"
                        onClick={() => {
                          close()
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </Popup>
              </li>
            </ul>
          </nav>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default withRouter(Navbar)
