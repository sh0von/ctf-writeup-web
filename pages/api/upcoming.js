export default async (req, res) => {
  try {
    // Get the current timestamp in seconds since Unix epoch
    const currentTime = Math.floor(new Date().getTime() / 1000)

    // Calculate the timestamp for 30 days in the future
    const futureTime = currentTime + 30 * 24 * 60 * 60 // 30 days * 24 hours * 60 minutes * 60 seconds

    const response = await fetch(`https://ctftime.org/api/v1/events/?limit=10&start=${currentTime}&finish=${futureTime}`)

    if (response.ok) {
      const data = await response.json()
      res.status(200).json(data)
    } else {
      // Handle non-successful response (e.g., non-200 status code)
      console.error('Non-successful response:', response.status)
      res.status(response.status).json({ error: 'Non-successful response' })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'An error occurred while fetching data.' })
  }
}
