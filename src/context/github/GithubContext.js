import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL,
  GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(true)

  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  //Get search results
  const searchUsers = async (text) => {
    setLoading()

    /**
     * * URLSearchParams
     * ? Is part of the Web API
     * ? https://developer.mozilla.org/es/docs/Web/API/URLSearchParams
     * ? We set our params to be sent along the query (q) to the Github API end point
     * ? based on params pased to searchUsers from UserSearch component it would be like
     * ? https://api.github.com/search/users/?q=text
     */

    const params = new URLSearchParams({
      q: text,
    })

    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    /**
     * * items
     * ? we are destructuring items from the response Github API returns. Previosly data
     */

    const { items } = await res.json()
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
      payload: [],
    })
  }

  //Set loading
  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users, //This a REDUCER
        loading: state.loading, //This is a REDUCER
        searchUsers: searchUsers, //This is a function
        clearUsers: clearUsers, //This is a function
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
