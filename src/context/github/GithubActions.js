import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL,
  GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

/**
 * * AXIOS instance to handle multiple request
 * ? axios.create() passes an object with the headers
 * ? we are going to use for all requests and can be
 * ? reused on every instance of axios using the const as name (github)
 */
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
})

//Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  /**
   * * Axios basic usage
   * ? Axios does not need to await for the response to return a json like
   * ? const data = await response.json()
   * ? but autmatically returns an object called data
   */
  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

//Get User and Repos

export const getUserAndRepos = async (login) => {
  /**
   * * Axios multiple calls
   * ? Axios can handle multiple resolving promises (await)
   * ? we are desturturing the response via
   * ? const [reponse1, response2] = await Promise.all([resolver1, resolver2])
   * ? then we return the data as destructured
   * ? return [response1, response2]
   */

  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}
