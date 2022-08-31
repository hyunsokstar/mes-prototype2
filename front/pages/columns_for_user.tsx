import React from 'react'
import AppLayout from '../components/AppLayout'
import MemberContainer from '../components/container/MemberContainer'

type Props = {}

function columns_for_user({ }: Props) {
  return (
    <AppLayout>
      <MemberContainer />
    </AppLayout>
  )
}

export default columns_for_user