import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useGlobalStore } from "@/store/global.store";
import { useRouter } from "next/navigation";
import { Button, Spin } from 'antd';

export const userSchema = yup.object({
  departureCity: yup.string().required('Please input the departure city!'),
  arrivalCity: yup.string().required('Please input the arrival city!'),
  departureDate: yup.date().required('Please select the departure date!'),
  returnDate: yup.date()
    .required('Please select the return date!')
    .min(yup.ref('departureDate'), 'Return date must be after departure date'),
  numberOfAdults: yup.number().required('Please input the number of adults!').min(1, 'Minimum 1 adult required!'),
  numberOfChildren: yup.number().min(0, 'Number of children cannot be negative!'),
});

export default function FlightSearch() {
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
    resolver: yupResolver(userSchema),
  });


  const onSubmit = async (payload: any) => {



    const options = {
      method: 'GET',
      url: 'https://sky-scrapper1.p.rapidapi.com/api/v1/flights/searchAirport',
      params: {
        query: payload.arrivalCity,
        currency: 'USD',
        market: 'US',
        locale: 'en-US'
      },
      headers: {
        'X-RapidAPI-Key': '01dc28638fmsh10164def782334dp162edcjsnac15fe4aee6a',
        'X-RapidAPI-Host': 'sky-scrapper1.p.rapidapi.com'
      }
    };

    const options1 = {
      method: 'GET',
      url: 'https://sky-scrapper1.p.rapidapi.com/api/v1/flights/searchAirport',
      params: {
        query: payload.departureCity,
        currency: 'USD',
        market: 'US',
        locale: 'en-US'
      },
      headers: {
        'X-RapidAPI-Key': '01dc28638fmsh10164def782334dp162edcjsnac15fe4aee6a',
        'X-RapidAPI-Host': 'sky-scrapper1.p.rapidapi.com'
      }
    };



    try {
      setLoading(true)
      const response1 = await axios.request(options);
      const response2 = await axios.request(options1);
      let departureCityID
      let arrivalCityID

      if (response1?.data?.data?.length > 0) {
        arrivalCityID = response1?.data?.data[0]?.id
      }
      if (response2?.data?.data?.length > 0) {
        departureCityID = response2?.data?.data[0]?.id
      }


      const options3 = {
        method: 'GET',
        url: 'https://sky-scrapper1.p.rapidapi.com/api/v1/flights/searchFlights',
        params: {
          fromId: departureCityID,
          toId: arrivalCityID,
          date: `${payload?.departureDate.getFullYear()}-${(payload?.departureDate.getMonth() + 1).toString().padStart(2, '0')}-${payload?.departureDate.getDate().toString().padStart(2, '0')}`,
          returnDate: `${payload?.returnDate.getFullYear()}-${(payload?.returnDate.getMonth() + 1).toString().padStart(2, '0')}-${payload?.returnDate.getDate().toString().padStart(2, '0')}`,
          adults: payload?.numberOfAdults,
          children: payload?.numberOfChildren,

          currency: 'USD',
          market: 'US',
          locale: 'en-US'
        },
        headers: {
          'X-RapidAPI-Key': '01dc28638fmsh10164def782334dp162edcjsnac15fe4aee6a',
          'X-RapidAPI-Host': 'sky-scrapper1.p.rapidapi.com'
        }
      };

      const response3 = await axios.request(options3);

      store.setflightDataGlobal(response3.data)
      setLoading(false)
      setTimeout(() => {
        router.push('/flight-list')
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


          showForm ? <div className="w-full rounded-lg p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xl font-bold">FlightSearch</h1>
                </div>

                <div >
                  <Button className="text-white" onClick={() => store.setShowForm(false)}>Close</Button>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="mt-5">
                  <label>Departure Date</label>
                  <input
                    type="date"
                    className={inputClass}
                    {...register("departureDate")}
                  />
                  <span className="text-red-500 font-bold">
                    {errors.departureDate?.message}
                  </span>
                </div>
                <div className="mt-5">
                  <label>Return Date</label>
                  <input
                    type="date"
                    className={inputClass}
                    {...register("returnDate")}
                  />
                  <span className="text-red-500 font-bold">
                    {errors.returnDate?.message}
                  </span>
                </div>
                <div className="mt-5">
                  <label>Departure City</label>
                  <input
                    type="text"
                    placeholder="Enter departure city"
                    className={inputClass}
                    {...register("departureCity")}
                  />
                  <span className="text-red-500 font-bold">
                    {errors.departureCity?.message}
                  </span>
                </div>
                <div className="mt-5">
                  <label>Arrival City</label>
                  <input
                    type="text"
                    placeholder="Enter arrival city"
                    className={inputClass}
                    {...register("arrivalCity")}
                  />
                  <span className="text-red-500 font-bold">
                    {errors.arrivalCity?.message}
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
