"use client"
// import * as yup from "yup";
// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// import { Avatar, Card } from 'antd';

// const { Meta } = Card;
// import { useGlobalStore } from "@/store/global.store";

// export default function HotelSearch() {
//     const { hotelDataGlobal } = useGlobalStore()


//     console.log(12, hotelDataGlobal)
//     return (
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 m-20">

//             {
//                 hotelDataGlobal?.data?.hotels ? hotelDataGlobal?.data?.hotels?.map((item: any) => (

//                     <Card
//                         style={{ width: 300 }}
//                         cover={

//                             ""
//                         }
//                         actions={[
//                             // <SettingOutlined key="setting" />,
//                             // <EditOutlined key="edit" />,
//                             // <EllipsisOutlined key="ellipsis" />,
//                         ]}
//                     >

//                         <p> <span className="font-bold"> Name:  </span> {item?.property?.name}</p>
//                         <p><span className="font-bold"> Description: </span> {item?.accessibilityLabel}</p>

//                     </Card>
//                 )) : <div>

//                     <p className="flex justify-center align-center text-red-500 text-xl">No Data</p>
//                 </div>
//             }

//         </div>
//     );
// }
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Pagination } from 'antd'; // Import Pagination from Ant Design

const { Meta } = Card;
import { useGlobalStore } from "@/store/global.store";

export default function HotelSearch() {
    const { hotelDataGlobal } = useGlobalStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [hotelsPerPage] = useState(6); // Change this value to set the number of hotels per page

    console.log(12, hotelDataGlobal);

    // Calculate the index of the last hotel on the current page
    const indexOfLastHotel = currentPage * hotelsPerPage;
    // Calculate the index of the first hotel on the current page
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    // Slice the array of hotels to display only those on the current page
    const currentHotels = hotelDataGlobal?.data?.hotels?.slice(indexOfFirstHotel, indexOfLastHotel);

    // Change page
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
                                    // <SettingOutlined key="setting" />,
                                    // <EditOutlined key="edit" />,
                                    // <EllipsisOutlined key="ellipsis" />,
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
