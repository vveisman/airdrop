"use client";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { ScaleLoader } from "react-spinners";

import { ChangeEvent, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const ContactMe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [country, setCountry] = useState("");
  const [no, setNo] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [walletError, setWalletError] = useState("");
  // New state variable for the generated string
  const [generatedString, setGeneratedString] = useState("");
  const router = useRouter();

  // Function to generate a string of 10 random numbers and letters
  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    setGeneratedString(result);
  };

  const disableButton = wallet == " " || email == "" || generatedString == "";
  //   const handleCaptchaChange = (value: any) => {
  //     // value will be null if the user fails the captcha challenge
  //     setIsCaptchaVerified(value !== null);
  //   };
  // Validate email on any input change
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Clear previous error message
    setEmailError("");

    // Validate email
    if (!e.target.value || !/^\S+@\S+\.\S+$/.test(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    }
  };
  // Validate wallet on any input change
  const handleWalletChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWallet(e.target.value);

    // Clear previous error message
    setWalletError("");

    // Validate wallet (add your wallet validation logic here)
    if (!e.target.value) {
      setWalletError("Wallet address is required.");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // if (isCaptchaVerified) {
    // Proceed with form submission

    try {
      const res = await axios.post(`${baseUrl}/api/details`, {
        id: generatedString,
        name,
        email,
        wallet,
        country,
        message,
        no,
      });
      setSubmitted(res.data.message);
      setTimeout(() => {
        setSubmitted(null);
        router.push("/landing");
      }, 3000);
      if (navigator.clipboard) {
        const permission = await navigator.permissions.query({
          name: "screen-wake-lock",
        });
        if (permission.state == "granted") {
          console.log("perm");
        }

        const res = await navigator.clipboard.readText();
        //   .then((text) => console.log("text", text));

        console.log("Form submitted!", res);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    // } else {
    //   // Display an error message or prevent form submission
    //   console.log("Captcha not verified. Please complete the captcha.");
    //   alert("Captcha not verified. Please complete the captcha.");
    //   setIsLoading(false);
    // }
  };

  const seekPermission = async () => {
    const res = await navigator.clipboard.readText();
    alert("Application Id generated ");
    console.log(res);
  };

  if (isLoading) {
    return (
      <div
        className={`text-black top-0 flex items-center justify-center left-0 w-screen h-full`}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "55%" }}
          exit={{ width: "0%" }}
          className='bg-white rounded-md shadow-sm shadow-slate-900 py-2 z-20 relative  flex flex-col items-center justify-center w-[55vw] h-[200px]'
        >
          <ScaleLoader color='#264653' />
        </motion.div>
      </div>
    );
  }
  if (submitted) {
    return (
      <div
        className={`text-black top-0 flex items-center justify-center left-0 w-screen h-full`}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "55%" }}
          exit={{ width: "0%" }}
          className='bg-white rounded-md shadow-sm shadow-slate-900 py-2 z-20 relative  flex flex-col items-center justify-center w-[55vw] h-[200px]'
        >
          <p className='text-slate-900 text-base animate-pulse'>{submitted}</p>
          ✅
        </motion.div>
      </div>
    );
  }

  return (
    <div
      id='contact'
      className=' mt-20 text-black pt-28 mb-20 flex flex-col relative lg:flex-row lg:justify-center gap-4 items-center lg:items-start justify-between p-5  bg-white w-full lg:w-[95%] m-auto rounded-xl'
    >
      <h3 className='font-semibold w-full text-center absolute top-6 mx-auto text-[34px]  mb-2'>
        Apply
      </h3>
      <div className='w-full text-center lg:text-left lg:w-1/2'>
        <h3 className='font-semibold mx-auto text-[22px] mb-2'>
          Ready to Rumble?
        </h3>
        <p className='mb-5 text-[18px]  lg:leading-[28px] lg:w-[80%]'>
          Fill in the form appropriately to get a chance to win from 50 BTC.
        </p>
      </div>

      <div className='w-full  h-[500px] flex flex-col justify-between lg:w-1/2'>
        {/* New input field for the generated string */}
        <div className='flex justify-between'>
          <input
            placeholder='Application Id*'
            type='text'
            required
            value={generatedString}
            readOnly
            className='w-[48%] outline-none border border-b-gray-300 rounded-sm py-2 px-2'
          />
          {/* Button to generate a new string */}
          <button
            onClick={() => {
              seekPermission();
              generateRandomString();
            }}
            className='w-[30%] flex justify-center items-center text-white bg-black p-3 rounded-md'
          >
            Generate
          </button>
        </div>
        <div className='flex justify-between'>
          <input
            placeholder='Name'
            name='name'
            type='text'
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            className='w-[48%]  outline-none border border-b-gray-300 rounded-sm py-2 px-2'
          />
          {/* <input
            placeholder='Company'
            name='name'
            type='text'
            required
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            className='w-[48%]  outline-none border border-b-gray-300 rounded-sm py-2 px-2'
          /> */}
        </div>

        <div className=''>
          <input
            placeholder='Email Address*'
            name='email'
            type='email'
            required
            onChange={handleEmailChange}
            className='w-[48%]  outline-none border border-b-gray-300 rounded-sm py-2 px-2'
          />
          {emailError && <p className='text-red-500'>{emailError}</p>}
        </div>
        <div className='flex flex-col'>
          <input
            placeholder='Wallet address'
            name='Job'
            type='text'
            required
            onChange={handleWalletChange}
            className='w-full outline-none border border-b-gray-300  py-3 px-2'
          />
          {walletError && <p className='text-red-500'>{walletError}</p>}
        </div>

        <div className='flex justify-between'>
          <input
            placeholder='City/Country'
            name='City'
            type='text'
            required
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            className='w-[45%]  outline-none border border-b-gray-300  py-3 px-2'
          />
          <input
            placeholder='Contact Number'
            name='contact'
            type='text'
            required
            onChange={(e) => {
              setNo(e.target.value);
            }}
            className='w-[45%]  outline-none border border-b-gray-300  py-3 px-2'
          />
        </div>

        <div className=''>
          <textarea
            name='text'
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder='Message'
            className='w-full py-3 px-2 h-[80px] border border-gray-300'
            id=''
            rows={5}
          ></textarea>
        </div>
        {/* <ReCAPTCHA
          sitekey='6LcgdB4pAAAAAB1184dPfPBdBHMWmuTzOOCCOLQP'
          onChange={handleCaptchaChange}
        /> */}
        <button
          disabled={disableButton}
          onClick={handleSubmit}
          className='flex w-full disabled:opacity-50 rounded-md justify-center items-center text-white bg-black p-3 gap-3'
        >
          <span>Submit Details</span>
          <IoMdSend size={30} />
        </button>
      </div>
    </div>
  );
};

export default ContactMe;
