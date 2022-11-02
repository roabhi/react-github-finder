import PropTypes from 'prop-types'
import RepoItem from './RepoItem'

/**
 * ? Here we ar enot destructuring from repos, just getting
 * ? what we need via dot notation repo.xxx looping
 * ? through repos array of object for each item
 * * DIFFERENCE WITH WHAT WE HAVE IN User.jsx reading from Reducer:
 * ? In User.jsx we are actually destructuring via user object since we are
 * ? using directly object values in the HTML (JSX) Markup
 * ? User is a single user
 * ? Into this component we are passing ALL the array of objects
 */

const RepoList = ({ repos }) => {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card body">
        <h2 className="text-3xl my-4 font-bold card-title">
          Latest Repositories
        </h2>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default RepoList
