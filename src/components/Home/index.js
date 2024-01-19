import Loader from 'react-loader-spinner'
import {useState, useEffect} from 'react'

import './index.css'

const apiConstantStatus = {
  INITIAL: 'initial',
  LOADER: 'loader',
  SUCCESS: 'success',
}

const Home = () => {
  const [fetchData, setFetchData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiConstantStatus.INITIAL)
  console.log(fetchData)

  useEffect(() => {
    setApiStatus(apiConstantStatus.LOADER)
    const getData = async () => {
      const url = 'https://apis.ccbp.in/tg/packages'
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      if (response.ok === true) {
        const updateData = data.packages.map(eachData => ({
          description: eachData.description,
          imageUrl: eachData.image_url,
          id: eachData.id,
          name: eachData.name,
        }))
        // console.log(updateData)
        setFetchData(updateData)
        setApiStatus(apiConstantStatus.SUCCESS)
      }
    }
    getData()
  }, [])

  const renderLoaderView = () => (
    <>
      <div data-testid="loader" className="loader-view-container">
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
      </div>
    </>
  )

  const renderSuccessView = () => (
    <>
      <div className="data-container">
        <ul className="ul-style">
          {fetchData &&
            fetchData.map(eachItem => (
              <li key={eachItem.id}>
                <img src={eachItem.imageUrl} alt={eachItem.name} />
                <div className="travel-card">
                  <h1>{eachItem.name}</h1>
                  <p>{eachItem.description}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  )

  const renderCondition = () => {
    switch (apiStatus) {
      case apiConstantStatus.LOADER:
        return renderLoaderView()
      case apiConstantStatus.SUCCESS:
        return renderSuccessView()
      default:
        return null
    }
  }

  return (
    <>
      <div className="app-page">
        <h1 className="main-heading">Travel Guide</h1>
        {renderCondition()}
      </div>
    </>
  )
}

export default Home
