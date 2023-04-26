import axios from "axios"
import { getUrl, getErrorMessage } from "../networkconfig"

const saveSchedule = async (id,schedule) => {
  const endpoint = `api/updateSchedule`
  const url = getUrl(endpoint)

  try {
    const { data } = await axios.post(url, {id,schedule}, {
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiQnp5cG01TjlXOWczdEh3V0N0M1UzeEF5VCIsImlhdCI6MTU2MzkwNzM2NX0.CMFNGN_VamRPCdRi3_Pvzq9IvHZMvqHK-j3iY_Zbn-A",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      }
    })

    if (!data.status) return { error: "Request error" }

    return parseResponse(data)
  } catch (error) {
    return getErrorMessage(error)
  }
}

const parseResponse = response => {
  //console.log(response)
  return response
}

export default saveSchedule