const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apipincode = process.env.NEXT_PUBLIC_PINCODEAPI_URL

const addharVerification = async(data : object)=>{
    const response  = await fetch(`${apiUrl}api/addhar`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })

    const status = response.status
    const res = await response.json()
    return {res, status}
}

const otpValidation = async(data : object)=>{
    const response  = await fetch(`${apiUrl}api/otp`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    const status = response.status
    const res = await response.json()
    return {res, status}
}

const panVerification = async(data : object)=>{
    const response  = await fetch(`${apiUrl}api/pan`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })

    const status = response.status
    const res = await response.json()
    return {res, status}
}

const getPincode = async(pincode : string)=>{
    const response = await fetch(`${apipincode}${pincode}`)
    const res = await response.json()
    return res
}

export default {addharVerification , panVerification, otpValidation, getPincode}