const BASE_URL = "http://localhost:5000/"

export const getUrl = endpoint => `${BASE_URL}${endpoint}`

export const getErrorMessage = error => {
  if (error.response) return { error: error.response.data }
  return { error: "Network error" }
}
