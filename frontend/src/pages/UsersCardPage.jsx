import React from 'react'
import UserCards from '../components/UserCards'


const UsersCardPage = ({users}) => {
  return (
    <main className="flex-1 p-4 space-y-4">
        <UserCards users={users}/>
    </main>
  )
}

export default UsersCardPage
