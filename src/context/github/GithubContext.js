import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  return (
    <GithubContext.Provider
      value={{
        // users: state.users, //This a REDUCER
        // user: state.user, //This is a REDUCER
        // loading: state.loading, //This is a REDUCER
        // repos: state.repos, //This is  a reducer
        ...state, //Same as avobe but with destructuring
        dispatch,
        // searchUsers: searchUsers, //This is a function BUT NOW passed via GithubActions
        // clearUsers: clearUsers, //This is a function
        // getUser: getUser, //This is a function
        // getUserRepos: getUserRepos, //This is a function
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
