/**
 * * GET_USER_AND_REPOS
 * ? This reducer returns 2 different objects
 * ? to our Context then to provider then to componets (This case pages/User.jsx)
 * ? so that is why we need to send back the expected data named as expected
 * ? in the component as payloads so the Component can handle both
 * ? const { user, loading, repos, dispatch } = useContext(GithubContext) at User.jsx
 */

const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: action.payload,
      }
    default:
      return state
  }
}

export default githubReducer
