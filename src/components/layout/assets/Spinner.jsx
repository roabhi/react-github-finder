import { FaSpinner } from 'react-icons/fa'

const Spinner = () => {
  return (
    <div className="spinner-container w-100 h-100 mt-200">
      <FaSpinner
        style={{
          margin: 'auto',
          display: 'inline-block',
        }}
      />
    </div>
  )
}

export default Spinner
