import axios from 'axios'

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.stauts >= 400 &&
    error.response.status <= 500
  if (!expectedError) console.log('An unexpected error occurred.')

  return Promise.reject(error)
})


const httpServices = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
}

export default httpServices