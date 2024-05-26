import logo from "../logo.jpeg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Registration() {

    const [loginInfo, setloginInfo] = useState({username:"",email:"",fullName:"", password:"",avtar:null ,coverImage:null})
    const[userCreated, setuserCreated] = useState(false);
    const [AvtarError,setAvtarError] = useState("");
    const [CoverImageError,setCoverImageError] = useState("")
   const navigate = useNavigate();
  const [loading, setloading] = useState(false);
    const allowedImageFormat = [
        'image/webp',
        'image/tiff',
        'image/svg+xml',
        'image/png',
        'image/jpeg',
        'image/vnd.microsoft.icon',
        'image/gif',
        'image/bmp',
      ];

      let data;

    const handleChange=(event)=>{
  
      const {name,value} =event.target;
  

      if(name==="avtar"|| name==="coverImage"){
        console.log(event.target.files[0]);
        
          if(!allowedImageFormat.includes(event.target.files[0].type)){
            if(name==="avtar"){
                setAvtarError("Only image is allowed")
            }else{
                setCoverImageError("Only image is allowed");
            }

            return ;
          }
          else{

            if(name==="avtar") setAvtarError("")
            if(name==="coverImage") setCoverImageError("");
          }

          setloginInfo({
            ...loginInfo,
            [name]: event.target.files[0]
          });

      }else{
        setloginInfo((prevFormData)=>({...prevFormData,[name]:value}))

      }

     

    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        setloading(true)
        event.target.disabled=true;
        console.log(event.target)

        const formData = new FormData();
       

        for(const key in loginInfo){
            if (loginInfo.hasOwnProperty(key)) {
                formData.append(key, loginInfo[key]);
              }
        }
  
        try {
          const response = await fetch('http://localhost:8000/api/v1/users/register', {
            method: 'POST',
            body: formData
          });
  
           data = await response.json();
           setloading(false)
          
         
           
         

        } catch (error) {
          setloading(false);
          console.error('Error registering user:', error.message);
        }
  
        if(data){
             navigate("/login")
        }
          setloginInfo({username:"",email:"",fullName:"", password:"",avtar:null ,coverImage:null})

    }


  return (

    
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Flowbite    
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" >
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input type="text" name="username"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john" required="" value={loginInfo.username} onChange={handleChange} autoComplete="username"/>
                    </div>
                   
                    
                  
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="text" name="email"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={loginInfo.email} onChange={handleChange} autoComplete="email"/>
                    </div>
                    <div>
                        <label htmlFor="fullNmae" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Full Name</label>
                        <input type="text" name="fullName"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" value={loginInfo.fullName} onChange={handleChange} autoComplete="fullName"/>
                    </div>
                    <div>
                        <label htmlFor="avtar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose avtar</label>
                        <input type="file" name="avtar"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""  onChange={handleChange}/>
                        <span className="text-error">{AvtarError}</span>
                    </div>
                    <div>
                        <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose cover Image</label>
                        <input type="file" name="coverImage"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  onChange={handleChange}/>
                        <span className="text-error">{CoverImageError}</span>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={loginInfo.password} onChange={handleChange} autoComplete="password"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""  />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <Link to="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                    </div>
                    <button  onClick={handleSubmit} type="submit" className={`${loading?"cursor-not-allowed ":"" }bg-blue-700 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800` } >{loading?"loading...":"Sign up"}</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                       Already have account ? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500" >Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
   
  )
}

export default Registration
