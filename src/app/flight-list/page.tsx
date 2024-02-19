"use client"
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
const { Meta } = Card;
import { useGlobalStore } from "@/store/global.store";
const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
};
export default function HotelSearch() {
    const { flightDataGlobal } = useGlobalStore()
    const [loading, setLoading] = useState(true);

    const onChange = (checked: boolean) => {
        setLoading(!checked);
    };

    console.log(15, flightDataGlobal)
    return (

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 m-20">



            <Card title="AirPorts">
                {
                    flightDataGlobal?.data?.filterStats?.airports?.map((item: any) => (
                        <Card.Grid hoverable={false} style={gridStyle}>
                            {item?.city}
                        </Card.Grid>
                    ))

                }
            </Card>
            <Card title="carriers">
                {
                    flightDataGlobal?.data?.filterStats?.carriers?.map((item: any) => (
                        <Card.Grid hoverable={false} style={gridStyle}>
                            {item?.name}
                        </Card.Grid>
                    ))

                }
            </Card>
            <Card title="Prices">
                <Card.Grid hoverable={false} style={gridStyle}>
                    Direct:  {flightDataGlobal?.data?.filterStats?.stopPrices?.direct?.formattedPrice}
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}>
                    One:  {flightDataGlobal?.data?.filterStats?.stopPrices?.one?.formattedPrice}
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}>
                    Two Or More:  {flightDataGlobal?.data?.filterStats?.stopPrices?.twoOrMore?.formattedPrice}
                </Card.Grid>
            </Card>
            <Card title="Duration">
                <Card.Grid hoverable={false} style={gridStyle}>
                    Max:  {flightDataGlobal?.data?.filterStats?.duration?.max}
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}>
                    Min:  {flightDataGlobal?.data?.filterStats?.duration?.min}
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}>

                    Multi City Max:  {flightDataGlobal?.data?.filterStats?.duration?.multiCityMax
                    }
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}>

                    Multi City Min:  {flightDataGlobal?.data?.filterStats?.duration?.multiCityMin
                    }
                </Card.Grid>
            </Card>






        </div>


    );
}