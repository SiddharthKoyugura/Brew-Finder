import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';

const Dynamic = () => {
  const router = useRouter();
  return (
    <>
        <Head>
            <title>{router.query.dynamic}</title>
        </Head>
        <div>page {router.query.dynamic}</div>
    </>
  )
}

export default Dynamic