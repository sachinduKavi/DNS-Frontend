import axios from "axios";


const domain = axios.create({
    baseURL: 'http://localhost:3000'
})


const header = {
    headers: {'Content-Type': 'application/json'}
}


const vernamEncodeQuery = async (values) => {
    return domain.post('vernam/encode', values, header)
}


const veramDecodeQuery = async (values) => {
    return domain.post('vernam/decode', values, header)
}


export  {
    vernamEncodeQuery,
    veramDecodeQuery
}