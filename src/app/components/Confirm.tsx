"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

function Confirm({fullName, pan , adharID, pincode, refNum} : {
  fullName: String;
  pan: String;
  adharID: String;
  pincode: String;
  refNum: String;
}) {
    const navigate = useRouter()
  return (
    <div className=" flex items-center justify-center ">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">

                <div className="flex items-center space-x-4 mb-8">
                    <div className="flex-shrink-0 bg-green-500 text-white rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Registration Successful</h1>
                        <p className="text-sm text-slate-500">Your details have been saved securely.</p>
                    </div>
                </div>

                {/*  Details List  */}
                <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-slate-500 font-medium">Full Name</p>
                        <p className="text-slate-800 font-semibold text-right">{fullName}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-slate-500 font-medium">Aadhaar Number</p>
                        <p className="text-slate-800 font-semibold text-right">{adharID}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-slate-500 font-medium">PAN Number</p>
                        <p className="text-slate-800 font-semibold text-right">{pan}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-slate-500 font-medium">Pin Code</p>
                        <p className="text-slate-800 font-semibold text-right">{pincode}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-slate-500 font-medium">Reference Number</p>
                        <div className="flex items-center gap-x-3">
                            <p id="refNumber" className="text-slate-800 font-semibold text-right">REG-2025-{refNum}</p>
                            <button  title="Copy to clipboard" className="text-slate-400 hover:text-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Button  */}
                <div className="mt-10">
                    <button onClick={()=>{navigate.push('/')}} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                        Done
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Confirm