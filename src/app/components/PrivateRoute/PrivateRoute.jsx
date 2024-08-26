'use client'
import { ContextSource } from '@/app/ContextAPI/ContextAPI';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter()
  const { loader, user } = useContext(ContextSource)

  if (loader && !user) {
    return 'loading...'
  }
  if (user) {
    return children;
  }
  return router.push('/auth')
};

export default PrivateRoute;