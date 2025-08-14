'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import services from '../services/services'

function Otp({backotp, adharID} : {backotp : String, adharID : String}) {
  const nevigate = useRouter()
  const [otp, setOtp] = useState<{ [key: number]: string }>({})
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [error, setError] = useState< any>(null)

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return // only allow single digit

    setOtp((prev) => ({ ...prev, [index]: value }))

    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = () => {
    const otpArray = [0, 1, 2, 3, 4, 5].map((i) => otp[i] || '')
    const finalOtp = otpArray.join('')

    services.otpValidation({ otp: finalOtp, userId : adharID })
    .then(({res,status})=>{
        if(status === 200){
            setError('')
            nevigate.push('/2')
        }
        else{
            setError(res.message)
        }
    })
    .catch((err)=>{
        setError('An unexpected error occurred.');
    })
  }

  return (
    <div className="backdrop-blur-sm ">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800">Verify Your Account</h1>
            <p className="mt-2 text-slate-500">A 6-digit code was sent.</p>
            <p className="mt-2 text-slate-500 text-sm">ONLY USE FOR DEVELOPMENT PHASE AS I DONT HAVE ACCESS TO SEND OTP VIA AADHAAR CARD NUMBER. So GENERATED OTP : {backotp}</p>
            {error && (
                <div className = 'text-red-500 text-sm text-center'>
                    {error}
                </div>
            )}
          </div>

          <div id="otp-container" className="flex justify-center gap-3 mt-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                maxLength={1}
                value={otp[i] || ''}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-14 h-16 text-center text-3xl font-semibold border-2 text-black border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            ))}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              VERIFY
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-slate-500">
              Didn't receive the code?{' '}
              <a href="#" className="font-medium text-blue-600 hover:underline">Resend</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Otp
