import React, { useState } from 'react';
import Hero from '../components/Hero';
import Branch from '../components/Branch';
import BottomContent from '../components/BottomContent';
import { assets } from '../assets/assets';
import List from '../components/List';

const Home = () => {

  return (
    <div>
      <Hero />
      {/* <Branch /> */}
      <List/>
      <BottomContent/>

    </div>
  );
};

export default Home;
