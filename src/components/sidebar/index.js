import {Link} from 'react-router-dom'
import './index.css'

const Sidebar = props => {
  const {active} = props
  return (
    <div className="sidebar-1">
      <ul className="sidebarOptions">
        <li className={active === 'home' ? 'active' : null} key="home">
          <Link to="/" className="linkStyle">
            Home
          </Link>
        </li>
        <li className={active === 'trending' ? 'active' : null} key="trending">
          <Link to="/trending" className="linkStyle">
            Trending
          </Link>
        </li>
        <li className={active === 'gaming' ? 'active' : null} key="gaming">
          <Link to="/gaming" className="linkStyle">
            Gaming
          </Link>
        </li>
        <li className={active === 'saved' ? 'active' : null} key="saved">
          <Link to="/saved-videos" className="linkStyle">
            Saved videos
          </Link>
        </li>
      </ul>
      <div>
        <p>CONTACT US</p>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
            alt="facebook logo"
            width="100px"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
            alt="twitter logo"
            width="100px"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
            alt="linked in logo"
            width="100px"
          />
        </div>
        <p>Enjoy! Now to see your channels and recommendations!</p>
      </div>
    </div>
  )
}

export default Sidebar
