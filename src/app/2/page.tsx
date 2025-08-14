'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import services from '../services/services';
import Confirm from '../components/Confirm';

function VerificationPage() {
  const navigate = useRouter();
  const [panNumber, setPanNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refNum, setRefNum] = useState<string>('');
  const [adharNum, setAdharNum] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');

  // Only run on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAdhar = localStorage.getItem('adharID');
      if (!storedAdhar) {
        navigate.push('/');
        return;
      }
      setAdharNum(storedAdhar);
    }
  }, [navigate]);

  useEffect(() => {
    if (pincode.length !== 6) {
      setCity('');
      setState('');
      return;
    }

    const fetchPincodeDetails = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await services.getPincode(pincode);
        if (data && data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          setCity(postOffice.District);
          setState(postOffice.State);
        } else {
          setError('Invalid Pincode. Please check and try again.');
          setCity('');
          setState('');
        }
      } catch (err: any) {
        setError('Error fetching pincode details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPincodeDetails();
  }, [pincode]);

  const handleSubmit = async () => {
    if (!panNumber || pincode.length !== 6 || !city || !state) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');
    try {
      const { res, status } = await services.panVerification({
        pan: panNumber,
        adharID: adharNum,
      });
      if (status === 200) {
        setFullName(res.fullName);
        setRefNum(res.id);
        setAdharNum(res.adharID);
        setRegistered(true);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('adharID');
        }
      } else {
        setError(res.message || 'Verification failed.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
   <>
        <div className="bg-gray-100 font-sans overflow-y-auto  w-full relative">
            {/* Confirmation Overlay */}
            {registered && (
            <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
                <div className="w-full max-w-xl">
                <Confirm  refNum = {refNum} pincode = {pincode} pan = {panNumber} fullName = {fullName} adharID={adharNum} />
                </div>
            </div>
            )}

            {/* Header */}
            <div className="text-center mb-8 pt-20">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Demo Registration Form</h1>
            <p className="text-gray-600 mt-1">For New Entrepreneurs who are not Registered yet</p>
            </div>

            {/* Progress Tracker */}
            <div className="w-full max-w-lg mx-auto mb-10 px-4">
            <div className="flex items-center">
                <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <p className="mt-2 text-xs md:text-sm font-semibold text-gray-700">Aadhaar Step</p>
                </div>
                <div className="flex-1 h-1 bg-blue-600 mx-2"></div>
                <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-blue-600 ring-4 ring-blue-200">
                    2
                </div>
                <p className="mt-2 text-xs md:text-sm font-semibold text-gray-800">PAN & Address</p>
                </div>
            </div>
            </div>

            <div className="flex items-center justify-center p-4">
            <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
                <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">PAN Card Verification</h2>
                <p className="mt-2 text-gray-500">Enter your details to verify.</p>
                </div>

                <div className="space-y-6">
                {/* PAN Details */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">PAN Details</h3>
                    <label htmlFor="pan-input" className="block text-sm font-medium text-gray-600 mb-1">
                    PAN Number / पैन नंबर <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="text"
                    id="pan-input"
                    name="pan"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    className="w-full px-4 py-2 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 uppercase outline-none transition-all"
                    required
                    />
                </div>

                {/* Address Details */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Address Details / पता</h3>

                    {/* Pincode */}
                    <div className="mb-4">
                    <label htmlFor="pincode-input" className="block text-sm font-medium text-gray-600 mb-1">
                        Pincode / पिन कोड <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="pincode-input"
                        name="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="Enter 6-digit Pincode"
                        className="w-full px-4 py-2 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        required
                    />
                    </div>

                    {/* City and State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city-input" className="block text-sm font-medium text-gray-600 mb-1">
                        City / शहर
                        </label>
                        <input
                        type="text"
                        id="city-input"
                        name="city"
                        value={isLoading ? 'Loading...' : city}
                        placeholder="City"
                        readOnly
                        className="w-full px-4 py-2 text-gray-500 bg-gray-200 border-2 border-gray-200 rounded-lg cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="state-input" className="block text-sm font-medium text-gray-600 mb-1">
                        State / राज्य
                        </label>
                        <input
                        type="text"
                        id="state-input"
                        name="state"
                        value={isLoading ? 'Loading...' : state}
                        placeholder="State"
                        readOnly
                        className="w-full px-4 py-2 text-gray-500 bg-gray-200 border-2 border-gray-200 rounded-lg cursor-not-allowed"
                        />
                    </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-sm text-center -mt-2">
                    {error}
                    </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm disabled:bg-gray-400"
                    >
                    {isLoading ? 'Verifying Pincode...' : 'VERIFY DETAILS'}
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>
    </>

  );
}

export default VerificationPage;
