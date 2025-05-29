export const Wavy = () => {
  return (
          <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <defs>
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ec7e68" />
              <stop offset="100%" stop-color="#E25845" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#fadeGradient)" 
            fill-opacity="1" 
            d="M0,128L34.3,144C68.6,160,137,192,206,170.7C274.3,149,343,75,411,48C480,21,549,43,617,80C685.7,117,754,171,823,197.3C891.4,224,960,224,1029,202.7C1097.1,181,1166,139,1234,154.7C1302.9,171,1371,245,1406,282.7L1440,320L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
  )
}
