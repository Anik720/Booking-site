"use client";

import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useGlobalStore } from "@/store/global.store";
import { useRouter } from "next/navigation";
import { Button, Spin } from 'antd';

export const hotelSchema = yup.object({
    checkInDate: yup.date().required('Please select the check-in date!'),
    checkOutDate: yup.date().required('Please select the check-out date!').min(
        yup.ref('checkInDate'),
        'Check-out date must be after check-in date'
    ),
    city: yup.string().required('Please input the city!'),
    numberOfRooms: yup.number().required('Please input the number of rooms!').min(1, 'Minimum 1 room required!'),
    numberOfAdults: yup.number().required('Please input the number of adults!').min(1, 'Minimum 1 adult required!'),
    numberOfChildren: yup.number().min(0, 'Number of children cannot be negative!'),
});



export default function HotelSearch() {
    const router = useRouter()
    const { showForm } = useGlobalStore()
    const store = useGlobalStore()
    const [loading, setLoading] = useState(false)

    const inputClass =
        "border border-red-400 rounded-md h-10 p-2 w-full outline-none text-black";

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(hotelSchema),
    });



    const onSubmit = async (payload: any) => {
        console.log("The payload is", payload);
        setLoading(true)
        const options = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
            params: { query: payload?.city },
            headers: {
                'X-RapidAPI-Key': 'be9e4ad484msh1d9d8e803eaf4a3p10d6acjsnf18e8550e5e0',
                'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);

            let filterData = response?.data?.data?.find((item: any) => item?.search_type === 'city')


            const options1 = {
                method: 'GET',
                url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
                params: {
                    dest_id: filterData?.dest_id,
                    search_type: 'CITY',
                    arrival_date: `${payload?.checkInDate.getFullYear()}-${(payload?.checkInDate.getMonth() + 1).toString().padStart(2, '0')}-${payload?.checkInDate.getDate().toString().padStart(2, '0')}`,
                    departure_date: `${payload?.checkOutDate.getFullYear()}-${(payload?.checkOutDate.getMonth() + 1).toString().padStart(2, '0')}-${payload?.checkOutDate.getDate().toString().padStart(2, '0')}`,
                    adults: payload?.numberOfAdults,
                    children_age: '0,17',
                    room_qty: payload?.numberOfRooms,
                    page_number: '1',
                    languagecode: 'en-us',
                    currency_code: 'AED'
                },
                headers: {
                    'X-RapidAPI-Key': 'be9e4ad484msh1d9d8e803eaf4a3p10d6acjsnf18e8550e5e0',
                    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
                }
            };

            const response1: any = await axios.request(options1);
            store.sethotelDataGlobal(response1.data)
            setLoading(false)
            setTimeout(() => {
                router.push('/hotel-list')
            }, 1000)

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <>
            {

                loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Spin size="large" />
                </div> :
                    showForm ?
                        <div className="w-full rounded-lg p-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1 className="text-xl font-bold">HotelSearch</h1>

                                <div className="flex gap-5">

                                    <div className="mt-5">
                                        <label>Check-In Date</label>
                                        <input
                                            type="date"
                                            className={inputClass}
                                            {...register("checkInDate")}
                                        />
                                        <span className="text-red-500 font-bold">
                                            {errors.checkInDate?.message}
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        <label>Check-Out Date</label>
                                        <input
                                            type="date"
                                            className={inputClass}
                                            {...register("checkOutDate")}
                                        />
                                        <span className="text-red-500 font-bold">
                                            {errors.checkOutDate?.message}
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        <label>City</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your city"
                                            className={inputClass}
                                            {...register("city")}
                                        />
                                        <span className="text-red-500 font-bold">
                                            {errors.city?.message}
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        <label>Number of Rooms</label>
                                        <input
                                            type="number"
                                            className={inputClass}
                                            {...register("numberOfRooms")}
                                        />
                                        <span className="text-red-500 font-bold">
                                            {errors.numberOfRooms?.message}
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        <label>Number of Adults</label>
                                        <input
                                            type="number"
                                            className={inputClass}
                                            {...register("numberOfAdults")}
                                        />
                                        <span className="text-red-500 font-bold">
                                            {errors.numberOfAdults?.message}
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        <label>Number of Children</label>
                                        <input
                                            type="number"
                                            className={inputClass}
                                            {...register("numberOfChildren")}
                                        />
                                        <span className="text-red-500 font-bold">
                                            {errors.numberOfChildren?.message}
                                        </span>
                                    </div>
                                </div>




                                <div className="mt-5">
                                    <button className="bg-red-500 w-full p-2 h-10 rounded-lg">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div> : ""
            }
        </>

    );
}