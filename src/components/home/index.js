import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {GoSearch} from 'react-icons/go'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/themeContext'
import Sidebar from '../sidebar'
import Navbar from '../Navbar'
import {TotalBack, InnerContainer, BodyContainer} from './styledComponents'
import './index.css'

const statuses = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    videos: [{channel: {name: '', profile_image_url: ''}}],
    view: statuses.initial,
    searchInput: '',
    total: 0,
  }

  searchInputChanged = event => {
    this.setState({searchInput: event.target.value})
  }

  searchIt = async () => {
    this.setState({view: statuses.loading})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwt = Cookies.get('jwt_token')
    const urlDetails = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, urlDetails)
    const data = await response.json()
    this.setState({
      videos: data.videos,
      view: statuses.success,
      total: data.total,
    })
  }

  searchButtonClicked = async () => {
    this.searchIt()
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#272727" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {videos, total} = this.state
    return (
      <>
        <div>
          {total === 0 && (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
                alt="no videos"
                width="300px"
              />
              <h1>No Search results found</h1>
              <p>Try different keyword or remove search filter</p>
              <button type="button" onClick={this.searchIt}>
                Retry
              </button>
            </div>
          )}
        </div>
        <ul className="unorderedListOfThumbnails">
          {videos.map(each => (
            <li key={each.id} className="listItem">
              <Link to={`/videos/${each.id}`} className="linkElement">
                <img src={each.thumbnail_url} alt="thumbnail" width="100%" />
                <div className="innerDetailsListElement">
                  <img
                    src={each.channel.profile_image_url}
                    alt="profile pic"
                    width="20%"
                  />
                  <div className="innerDetailsListElementRight">
                    <p>{each.title}</p>
                    <p>{each.channel.name}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        width="300px"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <p>Please try again.</p>
      <button type="button" onClick={this.searchIt}>
        Retry
      </button>
    </div>
  )

  componentDidMount = async () => {
    this.searchIt()
  }

  getView = () => {
    const {view} = this.state
    switch (view) {
      case statuses.loading:
        return this.loadingView()
      case statuses.success:
        return this.successView()
      case statuses.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <TotalBack>
              <InnerContainer
                className={lightTheme ? 'lightTheme' : 'darkTheme'}
              >
                <Navbar />
                <BodyContainer>
                  <Sidebar active="home" />
                  <div className="bodyContainer">
                    <div>
                      <input
                        type="search"
                        value={searchInput}
                        onChange={this.searchInputChanged}
                      />
                      <button
                        type="button"
                        onClick={this.searchButtonClicked}
                        data-testid="searchButton"
                      >
                        <GoSearch color="black" width="40px" />
                      </button>
                    </div>
                    {this.getView()}
                  </div>
                </BodyContainer>
              </InnerContainer>
            </TotalBack>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
