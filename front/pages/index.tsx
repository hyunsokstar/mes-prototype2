import type { NextPage } from 'next'
import AppLayout from "../components/AppLayout";
import React, { useState, useEffect } from 'react';
import UserTable from "../components/UserTable"
import UserTableForFileUpload from '../components/UserTableForFileUpload';



const Home: NextPage = () => {
  const loginCheck = async () => {

  }

  useEffect(() => {
    loginCheck();
  }, []);


  return (
    <AppLayout>
      <UserTableForFileUpload />
    </AppLayout>
  )
}

export default Home
