import { UserProfile } from '@clerk/remix'

const UserProfileRoutes = () => {
  return (
    <div className='flex justify-center h-screen p-20'>
      <UserProfile />
    </div>
  )
}

export default UserProfileRoutes