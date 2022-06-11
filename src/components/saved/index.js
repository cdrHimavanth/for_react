import {Link} from 'react-router-dom'
import Sidebar from '../sidebar'
import Navbar from '../Navbar'
import ThemeContext from '../../context/themeContext'
import {TotalBack, InnerContainer, BodyContainer} from './styledComponents'
import './index.css'

const Saved = () => (
  <ThemeContext.Consumer>
    {value => {
      const {savedList} = value
      console.log(savedList)
      const total = savedList.length
      return (
        <TotalBack>
          <InnerContainer>
            <Navbar />
            <BodyContainer>
              <Sidebar active="saved" />
              <div className="bodyContainer">
                <h1>Saved Videos</h1>
                <div>
                  {total === 0 && (
                    <div>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png  "
                        alt="no saved videos"
                        width="300px"
                      />
                      <h1>No saved videos found</h1>
                      <p>Save your videos by clicking a button</p>
                    </div>
                  )}
                </div>
                <ul className="unorderedListOfThumbnails">
                  {total !== 0 &&
                    savedList.map(each => (
                      <li key={each.id} className="listItem">
                        <Link to={`/videos/${each.id}`} className="linkElement">
                          <img
                            src={each.thumbnail_url}
                            alt="video thumbnail"
                            width="100%"
                          />
                          <div className="innerDetailsListElement">
                            <img
                              src={each.channel.profile_image_url}
                              alt="profile pic"
                              width="20%"
                            />
                            <div className="innerDetailsListElementRight">
                              <p>{each.title}</p>
                              <p>{each.view_count}</p>
                              <p>{each.published_at}</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </BodyContainer>
          </InnerContainer>
        </TotalBack>
      )
    }}
  </ThemeContext.Consumer>
)
export default Saved
