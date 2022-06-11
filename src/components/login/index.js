import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  TotalBack,
  InnerContainer,
  StyledForm,
  LogInButton,
  DetailsContainer,
  InputDetails,
} from './styledComponents'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    showError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  formSubmitted = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const obj = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch(url, obj)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  usernameChanged = event => {
    this.setState({username: event.target.value, showError: false})
  }

  passwordChanged = event => {
    this.setState({password: event.target.value, showError: false})
  }

  showHide = () => {
    this.setState(prev => ({showPassword: !prev.showPassword}))
  }

  render() {
    const {username, password, showPassword, errorMsg, showError} = this.state
    const {history} = this.props
    const jwt = Cookies.get('jwtToken')
    if (jwt !== undefined) {
      history.replace('/')
    }

    return (
      <TotalBack>
        <InnerContainer>
          <StyledForm onSubmit={this.formSubmitted}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              width="50%"
            />
            <DetailsContainer>
              <label htmlFor="username">USERNAME</label>
              <InputDetails
                onChange={this.usernameChanged}
                id="username"
                type="text"
                placeholder="Username"
                value={username}
              />
              <label htmlFor="password">PASSWORD</label>
              <InputDetails
                onChange={this.passwordChanged}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
              />
              <div>
                <input
                  id="displayPassword"
                  type="checkbox"
                  onClick={this.showHide}
                  value={showPassword}
                />
                <label htmlFor="displayPassword" color="black">
                  Show Password
                </label>
              </div>
            </DetailsContainer>
            <LogInButton type="submit">Login</LogInButton>
            {showError && <p>*{errorMsg}</p>}
          </StyledForm>
        </InnerContainer>
      </TotalBack>
    )
  }
}
export default Login
