import { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/assets/Spinner'
import GithubContext from '../../context/github/GithubContext'

const UserResults = () => {
  const { users, loading } = useContext(GithubContext)

  // useEffect(() => {
  //   fetchUsers()
  // }, []) //Compiler complais if using empty dependency Array here ],[]) BUT NEEDED WHEN USE REDUCER...

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
