import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import ThemeContext from './context/themeContext'
import Login from './components/login'
import Home from './components/home/index'
import Trending from './components/trending/index'
import Gaming from './components/gaming/index'
import Saved from './components/saved/index'
import VideoDetails from './components/videoDetails/index'
import NotFound from './components/notfound'
import ProtectedRoute from './components/protected/index'
import './App.css'

// Replace your code here
class App extends Component {
  state = {lightTheme: true, savedList: []}

  changeTheme = () => {
    this.setState(prevState => ({lightTheme: !prevState.lightTheme}))
  }

  updateList = list => {
    this.setState({savedList: list})
  }

  render() {
    const {lightTheme, savedList} = this.state
    console.log(savedList)
    return (
      <ThemeContext.Provider
        value={{
          lightTheme,
          savedList,
          changeTheme: this.changeTheme,
          updateList: this.updateList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={Saved} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <ProtectedRoute component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
