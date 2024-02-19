// components/Navbar.js
"use client"
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import FlightSearch from '@/app/flight/page';
import HotelSearch from '@/app/hotel/page';
import { useGlobalStore } from '@/store/global.store';
const { Header } = Layout;
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link href="">
        Hotel
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link href="">
        Flight
      </Link>
    ),
  },
];
const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const store = useGlobalStore()

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const menu = (
    <Menu>
      {items.map((item: any) => (
        <Menu.Item key={item.key} onClick={() => handleItemClick(item)}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );


  return (
    <>

      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="home">
            <Link href="/">
              Home
            </Link>
          </Menu.Item>

          <Menu.Item key="Search">
            <Dropdown overlay={menu} placement="top" arrow={{ pointAtCenter: true }} className='text-white' >
              <Button onClick={() => store.setShowForm(true)}>Search</Button>
            </Dropdown>
          </Menu.Item>
        </Menu>



      </Header>
      {
        <div style={{ display: `${selectedItem ? "block" : "none"}` }}>
          {
            selectedItem?.key == '2' ? <FlightSearch /> : <HotelSearch />
          }

        </div>

      }
    </>
  );
};

export default Navbar;
