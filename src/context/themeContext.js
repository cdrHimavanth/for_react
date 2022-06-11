import React from 'react'

const ThemeContext = React.createContext({
  lightTheme: true,
  savedList: [],
  updateList: () => {},
  changeTheme: () => {},
})
export default ThemeContext
