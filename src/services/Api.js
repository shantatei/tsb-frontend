import axios from 'axios';
import AuthUser from './AuthUser';

export default function ApiService(){

    const {getToken} = AuthUser();


    const httprequest = axios.create({
        baseURL:"http://localhost:8000/api/",
        headers:{
            "content-type":"application/json"
        }
    });

    const httprequestwtoken = axios.create({
        baseURL:"http://localhost:8000/api/",
        headers:{
            "content-type":"multipart/form-data",
            "Accept":"application/json",
            authorization: "Bearer " + getToken(),
        }
    });

    const httprequestwtoken2 = axios.create({
        baseURL:"http://localhost:8000/api/",
        headers:{
            "content-type":"application/json",
            "Accept":"application/json",
            authorization: "Bearer " + getToken(),
        }
    });


    return {
        httprequest,
        httprequestwtoken,
        httprequestwtoken2
    }
}