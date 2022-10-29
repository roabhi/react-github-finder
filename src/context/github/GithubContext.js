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
    user: {},
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

  //Get simgle USER

  const getUser = async (login) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    /**
     * * GET SINGLE USER
     * ? We make sure the user exists so no 404
     * ? IF NOT redirect to route /notfound
     * ? Otherwise get the data which comes without any array (no need for destructuring)
     * ? dispatch via Reducer with custom type and payload as the returned json from github API
     */

    if (response.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json()
      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
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
        user: state.user, //This is a REDUCER
        loading: state.loading, //This is a REDUCER
        searchUsers: searchUsers, //This is a function
        clearUsers: clearUsers, //This is a function
        getUser: getUser, //This is a function
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
