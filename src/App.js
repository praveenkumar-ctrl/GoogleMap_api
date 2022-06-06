import {
  Box,
  SkeletonText,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import logo from './Logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 48.8584, lng: 2.2945 }

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

 
  const originRef = useRef()
  
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    
    <>
   
    
   
     <div class="nav1">
            <nav class="navbar navbar-light bg-light ">
                <a class="navbar-brand" href="/">
                    
                <img src={logo} style={{width:"100px",height:"100px" }}  alt=""/>
                    
                   
                  </a>
               
                 
                 
            </nav>
    </div> 

    <div class="form-container1 ">
        <div class="heading">
            <h2>Let's calculate distance from Google maps </h2>
            </div>
           
			
	 <div class="inputbox">
            <form  >
                   <label>Orign</label><br/>
                <input type="text" placeholder="Enter your location" ref={originRef}  /><br/>
                     <button class="btn1" id="signIn" type='submit' onClick={calculateRoute}>calculate</button>
                <label>Destination</label><br/>
                <input type="text" placeholder="Enter your location"  ref={destiantionRef} />
                
		   </form>
          
           <div class="dist1">
                  <div class="dist2">
                            <div class="dist3">
                                <h4> Distance</h4>
                            </div>
                                <div class="dist4">
                                        <h1>{distance}</h1>
                                </div>
                   
                  
                  </div> 
                  <div class="dist5">
                    The distance  is {distance}.

                   </div> 
        </div>


    </div>
   
    
    <Box position='absolute' left={750} top={150} h='60%' w='40%'>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
     
        </Box>
    
    
    
   
	</div>
    </>
  )
}

export default App
