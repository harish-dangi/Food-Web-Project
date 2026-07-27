import  {useState} from 'react'
import { MdMarkEmailRead } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { contactFormFields } from '../assets/dummydata';
// import { FiUser, FiSmartphone, FiMail,FiHome } from "react-icons/fi";
import toast, {Toaster} from 'react-hot-toast'
const Contact = () => {
  const submithandler =(e)=>{
    e.preventDefault();
    // console.log(formdata);
    toast.success('Form submitted successfully!',{
      style: {
        border: '2px solid #fbbf24',
        padding: '16px',
        background: '#fff7ed',
        color: '#b45309',
        fontWeight: 'bold',
        backdropFilter: 'blur(10px)',
        fontSize: '14px',
      }
    });
    setFormdata({
      name: '',
      email: '',
      phone: '',
      address: '',
      dish: '',
    });
  }
  const [formdata,setFormdata] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dish: '',
  });
  return (
    <div className=' h-full bg-linear-to-r from-orange-500 to-amber-200 text-white text-2xl ' >
      <Toaster position="top-right" reverseOrder={false}  toastOptions={{ duration: 3000 }} className="text-xs font-normal "/>
      <h1 className='text-3xl  text-center italic p-3 font-Dancing'>Contact Us</h1>
      <div className='flex flex-col md:flex-row gap-10 justify-center items-center'>

      <div className=' '>
        <div className='md:w-110 mb-3 bg-linear-to-r from-orange-900 to-amber-700 p-4 rounded-lg shadow-md border-l-2 border-amber-300  hover:shadow-lg  transition-all duration-300 hover:scale-105  hover:shadow-amber-100'> 
        <div className='flex items-center gap-2 mb-2'>
        <FaLocationDot className='text-amber-300 text-4xl border p-2 rounded-lg bg-amber-500/40 '/>
        <p className='text-amber-300/80 text-lg font-bold'>Our Headquarters</p>
        </div>
        <p className='text-amber-300 text-xs '>123 Culinary Avenue, Flavor Town, INDIA</p>
        </div>
        <div className=' bg-linear-to-r from-orange-900 to-amber-700 p-4 rounded-lg shadow-md border-l-2 border-green-600  hover:shadow-lg  transition-all duration-300 hover:scale-105  hover:shadow-amber-100 mb-3'> 
        <div className='flex items-center gap-2 mb-2'>
        <MdMarkEmailRead className='text-green-600 text-4xl border p-2 rounded-lg bg-amber-500/40 '/>
        <p className='text-green-600/80  text-lg '>Email Address</p>
        </div>
        <p className='text-green-300  text-xs '>dangiharish516@gmail.com</p>
        </div>
        <div className='  bg-linear-to-r from-orange-900 to-amber-700 p-4 rounded-lg shadow-md border-l-2 border-amber-300  hover:shadow-lg  transition-all duration-300 hover:scale-105  hover:shadow-amber-100'> 
        <div className='flex items-center gap-2 mb-2'>
        <FaPhoneSquareAlt className='text-amber-300 text-4xl border p-2 rounded-lg bg-amber-500/40 '/>
        <p className='text-amber-300/80 text-lg font-bold'>Phone Number</p>
        </div>
        <p className=' text-xs '>+91 8302167001</p>
        </div>
      </div>
      <form onSubmit={submithandler} className='border w-full md:w-110 p-4 rounded-lg shadow-md bg-linear-to-r from-orange-900 to-amber-700  hover:shadow-lg  transition-all duration-300   hover:shadow-amber-100 mb-2'>
         {/* { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name', Icon: FiUser }, */}
      {contactFormFields.map((field) => (
        <div key={field.name} className='w-full   p-2'>
          <p className='text-amber-300/80 text-lg font-bold'>{field.label}</p>
          <div className='flex items-center gap-3 mt-1'>
          <field.Icon className='text-amber-300 text-4xl border p-2 rounded-lg bg-amber-500/40 '/>
          <input type={field.type}  placeholder={field.placeholder} value={formdata[field.name]} onChange={(e) => setFormdata({...formdata, [field.name]: e.target.value})} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none hover:shadow-md' required />
          </div>
        </div>
      ))}
      <button type='submit' className='bg-linear-to-r from-amber-600 to-amber-800 text-white px-4 py-2 rounded-lg font-bold border-2 border-amber-400/30 hover:shadow-lg hover:shadow-amber-500/30 relative overflow-hidden hover:cursor-pointer hover:gap-3 transition-all duration-300 text-lg mt-4 hover:scale-95 hover:text-amber-300 '>Submit</button>
        </form>
    
      </div>
      </div>
  )
}

export default Contact