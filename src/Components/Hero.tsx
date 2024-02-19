"use client"
import React from 'react';
import { Button, Carousel } from 'antd';
import Image from 'next/image';
import { useGlobalStore } from '@/store/global.store';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '90vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Hero: React.FC = () => {
  const store = useGlobalStore()
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1' }}>
        {/* <Button size="large" className='text-white' onClick={() => store.setShowForm(true)}>
          Search
        </Button> */}
      </div>
      <Carousel autoplay>
        <div >
          <Image
            src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Description of the image"
            width={1500}
            height={100}
            style={contentStyle}
          />
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Description of the image"
            width={1500}
            height={100}
            style={contentStyle}
          />
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1483450388369-9ed95738483c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Description of the image"
            width={1500}
            height={100}
            style={contentStyle}
          />
        </div>
        <div>


          <Image
            src="https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Description of the image"
            width={1500}
            height={100}
            style={contentStyle}
          />
        </div>
      </Carousel>


    </div>

  );
};

export default Hero;