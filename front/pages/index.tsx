import type { NextPage } from 'next'
import AppLayout from "../components/AppLayout";
import React, { useState, useEffect } from 'react';
import UserTable from "../components/UserTable"



const Home: NextPage = () => {
  const loginCheck = async () => {

  }

  useEffect(() => {
    loginCheck();
  }, []);


  return (
    <AppLayout>
      <UserTable />
    </AppLayout>
  )
}

export default Home
