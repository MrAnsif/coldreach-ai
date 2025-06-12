import MessageForm from '@/components/MessageForm'
import MessageHistory from '@/components/MessageHistory'
import SubscriptionTier from '@/components/SubscriptionTier'
import React from 'react'

const page = () => {
  return (
    <div>
      <MessageForm/>
      {/* <MessageHistory/> */}
      <SubscriptionTier/>
    </div>
  )
}

export default page