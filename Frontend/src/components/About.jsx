
import { aboutfeature } from '../assets/dummydata'
import { Link } from 'react-router-dom'

import { FaInfoCircle } from 'react-icons/fa'
import AboutImage from '../assets/AboutImage.png'
// import FloatingParticle from '../../components/FloatingParticle'
const About = () => {
  return (
    <>
    <div className='  min-h-screen bg-linear-to-bl from-black/40 via-gray-700 to-olive-700 text-white py-5 sm:py-10 relative overflow-hidden '>
      <div className='absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none '>
        <div className='absolute top-1/4 left-20 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl mix-blend-soft-light  '/>
        <div className='absolute top-1/4 left-20 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl mix-blend-soft-light '/>
      </div>
      <div className='container mx-auto  px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row itmes-center  xl:gap-16 relative'>
        <div  className='w-full order-1 lg:order-2 space-y-8  relative'>
          <div className='sm:space-y-4  sm:px-0'>
            <h2 className='text-xl  sm:text-2xl md:text-3xl xl:text-4xl font-bold leading-tight'>
              <span className='bg-linear-to-bl from-amber-400 via-amber-950/90  to-orange-400 bg-clip-text text-transparent font-serif'>
                Epicurean Elegance
              </span>
              <span className=' inline-block text-sm sm:text-lg md:text-xl opacity-90 font-light italic '>
                Where Flavors Dance &amp; Memories Bloom
              </span>
            </h2>
            <p className='text-base  leading-relaxed  font-serif italic border-l-4 bg-amber-500/60 pl-2 '>
              "In our kitchen, passion meets precision. We craft not just meals, but culidnary journeys that linger on the palate and in the heart."
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 px-4 sm:px-0'>
            {aboutfeature.map((item,i)=>(
              <div key={i} className='flex flex-col items-center justify-center   transition-transform duration-300 p-3 sm:p-5 hover:translate-x-7 '>
                <div className={` p-3 sm:p-4 rounded-full bg-linear-to-br ${item.color} transition-transform  duration-200 group-hover:scale-110 `}>
                  <item.icon className='text-2xl  sm:text-3xl '/>
                </div>
                <div className='text-center '>
                   <h3 className='font-bold sm:text-2xl bg-linear-to-bl from-amber-400 via-amber-600/90  to-orange-400 bg-clip-text text-transparent'>{item.title}</h3>
                   <p className='opacity-80 text-sm sm:text-base bg-linear-to-bl from-amber-400 to-orange-400 bg-clip-text text-transparent'>{item.text}</p>
                </div>
                <div>
                </div>
              </div>
            ))}
          </div>
          <div className=' bg-linear-to-bl from-amber-400 via-amber-600/90  to-orange-400 p-4  rounded-2xl max-w-50 hover:scale-90
           '>
          <Link to='/about'>   
            <div className='flex items-center gap-3 ml-4 '>
                <FaInfoCircle className='text-lg sm:text-xl'/>
              <h3 className='font-bold font-serif'>Unveil Legacy</h3>
            </div>
          </Link>
          </div>
        </div>
     <div className='w-full flex items-center justify-center'>
      <div className=' flex items-center justify-center  rounded-2xl'> 
        <img src={AboutImage} alt="Restaurant" className=' object-cover overflow-hidden bg-amber-500/10 shadow-2xl shadow-amber-100  transition-all duration-500 rounded-2xl  aspect-3/4   hover:aspect-square hover:bg-amber-100/1' />
      {/* <FloatingParticle/> */}
      </div>
      </div>
      </div>
    </div>
  </>
  )
}

export default About