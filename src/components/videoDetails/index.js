/* eslint-disable camelcase */
import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/themeContext'
import Sidebar from '../sidebar'
import Navbar from '../Navbar'
import {
  TotalBack,
  InnerContainer,
  BodyContainer,
  StyledReaction,
} from './styledComponents'
import './index.css'

const statuses = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoDetails extends Component {
  state = {
    video_details: {},
    view: statuses.initial,
    liked: false,
    disliked: false,
    saved: false,
  }

  searchIt = async () => {
    this.setState({view: statuses.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
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
      video_details: data.video_details,
      view: statuses.success,
    })
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  likeClicked = () => {
    this.setState(prevState => ({
      liked: !prevState.liked,
      disliked: false,
    }))
  }

  dislikeClicked = () => {
    this.setState(prevState => ({
      liked: false,
      disliked: !prevState.disliked,
    }))
  }

  saveClicked = () => {
    this.setState(prevState => ({saved: !prevState.saved}))
  }

  successView = () => {
    const {video_details, liked, disliked, saved} = this.state
    const {
      video_url,
      title,
      view_count,
      published_at,
      channel,
      description,
    } = video_details
    return (
      <ThemeContext.Consumer>
        {value => {
          const {savedList, updateList} = value
          let newList = []
          const updatingList = () => {
            if (savedList.includes(video_details)) {
              newList = savedList.filter(each => each !== video_details)
            } else {
              savedList.unshift(video_details)
              newList = savedList
            }
            updateList(newList)
          }
          return (
            <>
              <ReactPlayer url={video_url} width="80%" controls />
              <div>
                <StyledReaction
                  type="button"
                  like={liked}
                  onClick={this.likeClicked}
                >
                  Like
                </StyledReaction>
                <StyledReaction
                  type="button"
                  like={disliked}
                  onClick={this.dislikeClicked}
                >
                  Dislike
                </StyledReaction>
                <StyledReaction
                  type="button"
                  like={saved}
                  onClick={(this.saveClicked, updatingList)}
                >
                  {saved ? 'Saved' : 'Save'}
                </StyledReaction>
              </div>
              <p>{title}</p>
              <div>
                <p>{view_count}</p>
                <p>{published_at}</p>
              </div>
              <hr width="100%" />
              <div className="innerDetailsListElement">
                <img
                  src={channel.profile_image_url}
                  alt="channel logo"
                  width="10%"
                />
                <div className="innerDetailsListElementRight">
                  <p>{channel.name}</p>
                  <p>{channel.subscriber_count}</p>
                  <p>{description}</p>
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure"
        width="300px"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to compute your request.</p>
      <p>Please try again.</p>
      <button type="button" onClick={this.searchIt}>
        Retry
      </button>
    </div>
  )

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

  componentDidMount = async () => {
    this.searchIt()
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <TotalBack>
              <InnerContainer
                className={lightTheme ? 'lightTheme' : 'darkTheme'}
                data-testid="videoItemDetails"
              >
                <Navbar />
                <BodyContainer>
                  <Sidebar />
                  <div className="bodyContainer">
                    <div>{this.getView()}</div>
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
export default VideoDetails
