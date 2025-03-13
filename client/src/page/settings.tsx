import { useSelector } from 'react-redux'
const { currentUser, loading, error } = useSelector((state: any) => state.user)

const settings = () => {
  return (
    <>
      <p>Hello, {currentUser}</p>
    </>
  )
}

export default settings
