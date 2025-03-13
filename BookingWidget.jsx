import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}){

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
      if(user){
        setName(user.name);
      }
    }, [user]);

    let numberOfNights = 0;
    if(checkIn && checkOut){
      numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace(){
      const response = await axios.post('/bookings', {
        checkIn, checkOut, numberOfGuests, name, mobile, 
        place:place._id,
        price:numberOfNights + place.price,
      });
      
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`)
    }
    
    if(redirect){
      return <Navigate to={redirect}/>
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
           <div className="text-xl text-center">
                Price: $ {place.price} / per night
           </div> 

           <div className="border rounded-2xl mt-4">
              <div className="flex">
                <div className=" py-3 px-4 ">
                  <label>Chech in :</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}/>
                </div>

                <div className=" py-3 px-4 border-l ">
                  <label>Chech out :</label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
                </div>
              </div>

              <div className=" py-3 px-4 border-t ">
                  <label>Number of guests : </label> <br/>
                  <input type="number" value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)}/>
              </div>

              {numberOfNights > 0 && (
                  <div className=" py-3 px-4 border-t ">
                    <label>Your full name : </label> 
                    <input className="w-full border my-2 py-2 px-3 rounded-2xl" 
                           type="text" 
                           placeholder="Enter your name"
                           value={name} 
                           onChange={e => setName(e.target.value)}/>

                    <label>Phone Number : </label> 
                    <input className="w-full border my-2 py-2 px-3 rounded-2xl" 
                           type="tel" 
                           placeholder="Enter your phone number"
                           value={mobile} 
                           onChange={e => setMobile(e.target.value)}/>
                  </div> 
              )}
            </div> 

            <button onClick={bookThisPlace} className="bg-rose-500 p-2 w-full text-white rounded-2xl mt-4">
              Book this place
              {numberOfNights > 0 && (
                <span> $ {numberOfNights + place.price}</span>
              )}
            </button>
        
        </div>  
    );

}