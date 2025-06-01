import { useSelector } from 'react-redux'
const { currentUser } = useSelector((state: any) => state.user)

const settings = () => {
  return (
    <>
      <p>Hello, {currentUser}</p>
    </>
  )
}

export default settings
