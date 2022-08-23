import type { NextPage } from 'next'
import AppLayout from "../components/AppLayout";
import React, { useState, useEffect } from 'react';
import UserContainer from '../components/UserContainer';



const Home: NextPage = () => {
  const loginCheck = async () => {

  }

  useEffect(() => {
    loginCheck();
  }, []);


  return (
    <AppLayout>
      <UserContainer />
    </AppLayout>
  )
}

export default Home
