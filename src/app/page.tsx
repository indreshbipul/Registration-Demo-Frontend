'use client'
import React, { useState } from 'react'
import services from './services/services'
import Otp from './components/otp'

function page() {
  const [adharID, setAdharNum] = useState< any>(null)
  const [fullName, setFullName] = useState< any>(null)
  const [error, setError] = useState< any>(null)
  const [accepted, setAccepted] = useState< boolean>(false)
  const [reRegn, setReRegn] = useState< boolean>(false)
  const [otpField, setOtpField] = useState<boolean>(false)

  //ONLY USE FOR DEVELOPMENT PHASE AS WE DONT HAVE ACCESS TO SEND OTP VIA AADHAAR CARD NUMBER
  const [backotp,setOTP]= useState<String > ('')

  const handelSubmit = ()=>{
    if (!adharID || !fullName) {
      setError('Please fill in all required fields.');
      return;
    }  
    if(!accepted){
      setError("Please Accept Term & Condition")
      return
    }
    setError('')
    const data = {adharID,fullName}

    services.addharVerification(data)
    .then(({res, status})=>{
      if(status === 200){
        setError("")
        setOTP(res.otp)
        localStorage.setItem('adharID', adharID)
        setOtpField(true)
      }
      else if(status === 201){
        localStorage.setItem('adharID', adharID)
        setOTP(res.otp)
        setReRegn(true)
      }
      else{
        setError(res.message)
      }
    })
    .catch(err =>{
      setError('An unexpected error occurred.');
    })
  }
  
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col min-h-screen relative ">
        {otpField &&(
          <div className = {`h-full w-full absolute backdrop-blur-sm `}>
              <div  className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex justify-center items-center'>
                  <Otp backotp= {backotp} adharID = {adharID} />
              </div>
          </div>
        )}
        {reRegn &&(
          <div className = {`h-full w-full absolute backdrop-blur-sm `}>
              <div className="h-60 w-96 absolute bg-gray-100 z-10 top-1/2 left-1/2 rounded-lg px-6 py-12 flex flex-col justify-center items-center text-center shadow-xl border border-gray-200 translate-x-[-50%] translate-y-[-50%]">
              <h2 className="text-2xl font-bold text-slate-800">
                  ⓘ Account Unverified
              </h2>
              <p className="text-slate-600 mt-2 mb-6">
                  You are already registered. Please click below to verify your account with OTP.
              </p>
              <div className="flex gap-x-6">
                  <button onClick ={()=>{
                    setReRegn(false)
                    setOtpField(true)
                    }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                      Verify
                  </button>
                  <button onClick={()=>{setReRegn(false)}} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out">
                      Cancel
                  </button>
              </div>
            </div>

          </div>
        )}
          <div className="flex-grow">
              <div className="min-h-full flex flex-col items-center justify-center p-4 pt-24">
                  <div className="w-full max-w-2xl">
                
                      <div className="text-center mb-8">
                          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Demo Registration Form</h1>
                          <p className="text-gray-600 mt-1">For New Entrepreneurs who are not Registered yet</p>
                      </div>

                      {/*  Static Progress Tracker  */}
                      <div className="w-full max-w-md mx-auto mb-8 px-4">
                          <div className="flex items-center">
                              <div className="flex flex-col items-center text-center">
                                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-blue-600">
                                      1
                                  </div>
                                  <p className="mt-2 text-xs md:text-sm font-semibold text-gray-800">
                                      Aadhaar Verification
                                  </p>
                              </div>
                              <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                              <div className="flex flex-col items-center text-center">
                                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gray-300">
                                      2
                                  </div>
                                  <p className="mt-2 text-xs md:text-sm font-semibold text-gray-500">
                                      PAN Validation
                                  </p>
                              </div>
                          </div>
                      </div>

                      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full">
                          <div className="space-y-6">
                              <h2 className="text-2xl font-bold text-center text-gray-800">Aadhaar Verification With OTP</h2>
                                {error &&(
                                  <div className = 'text-red-500 text-sm text-center'>
                                    {error}
                                  </div>
                                )}
                              <div className="space-y-2">
                                  <label htmlFor="aadhaarNumber" className="block text-gray-700 font-medium">
                                      1. Aadhaar Number / आधार संख्या <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                      type="text"
                                      id="aadhaarNumber"
                                      name="aadhaarNumber"
                                      placeholder="Your Aadhaar No"
                                      pattern = "^\\d{12}$"
                                      onChange={(e)=>{
                                        setAdharNum( e.target.value )
                                      }}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                                  />
                              </div>
                              
                              <div className="space-y-2">
                                  <label htmlFor="nameAsPerAadhaar" className="block text-gray-700 font-medium">
                                      2. Name of Entrepreneur / उद्यमी का नाम <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                      type="text"
                                      id="nameAsPerAadhaar"
                                      name="nameAsPerAadhaar"
                                      placeholder="Name as per Aadhaar"
                                      onChange={(e)=>{
                                        setFullName(e.target.value)
                                      }}
                                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition "
                                  />
                              </div>
                              
                              <div className="flex items-start space-x-3 pt-2">
                                  <input id="consent" type="checkbox" name="consent" onChange={()=>{
                                    setAccepted(prev => (!prev))}} className="h-5 w-5 mt-1 border-gray-300 rounded text-blue-600 focus:ring-blue-500"  />
                                  <label htmlFor="consent" className="text-sm text-gray-600">
                                      I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number for Demo Registration.
                                  </label>
                              </div>

                              <div className="pt-4 border-t">
                                  <button
                                      type="submit"
                                      onClick={handelSubmit}
                                      className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                                  >
                                      Validate & Generate OTP
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>         
      </div>
  </div>
  )
}

export default page