import axios from 'axios'

const http = axios.create({
  baseURL: `http://127.0.0.1:5000/` // `http://31.31.219.179:81/`
  // headers: {
  //   Authorization: 'Bearer {token}'
  // }
})

export default http
