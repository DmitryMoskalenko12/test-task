
  export const getRecieps = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    try {
      const result = await fetch(url, {method, body, headers})

     if (!result.ok) {
      throw new Error(`Error in path ${url} status: ${result.status}`)
     }

     return await result.json()
    } catch (e) {
      throw e
    }
  }

