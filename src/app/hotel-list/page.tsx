"use client"

import * as yup from "yup";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Avatar, Card, Pagination } from 'antd';

const { Meta } = Card;
import { useGlobalStore } from "@/store/global.store";

export default function HotelSearch() {
    const { hotelDataGlobal } = useGlobalStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [hotelsPerPage] = useState(6);


    const indexOfLastHotel = currentPage * hotelsPerPage;

    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;

    const currentHotels = hotelDataGlobal?.data?.hotels?.slice(indexOfFirstHotel, indexOfLastHotel);


    const handleChangePage = (page: any) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 m-20">
                {
                    currentHotels && currentHotels.length > 0 ? (
                        currentHotels.map((item: any) => (
                            <Card
                                key={item.id} // Add a unique key for each card
                                style={{ width: 300, background: "gray", fontSize: "12px", color: "white" }}
                                cover="" // Add your cover image here

                                actions={[
                          
                                ]}
                            >
                                <p> <span className="font-bold"> Name:  </span> {item?.property?.name}</p>
                                <p><span className="font-bold"> Description: </span> {item?.accessibilityLabel}</p>
                            </Card>
                        ))
                    ) : (
                        <div>
                            <p className="flex justify-center align-center text-red-500 text-xl">No Data</p>
                        </div>
                    )
                }
                {/* Pagination component */}

            </div>
            <div className="flex justify-center mt-20 bg-red">
                <Pagination
                    current={currentPage}
                    total={hotelDataGlobal?.data?.hotels?.length || 0}
                    pageSize={hotelsPerPage}
                    onChange={handleChangePage}

                />
            </div>
        </>

    );
}
