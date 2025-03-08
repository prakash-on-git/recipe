import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Popular from '../components/Popular'
import Latest from '../components/Latest'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Popular/>
      <Latest/>
      <Footer/>
    </div>
  )
}

export default Home
