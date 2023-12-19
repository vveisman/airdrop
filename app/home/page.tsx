"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { easeInOut, motion } from "framer-motion";

const numbersArray = Array.from({ length: 500 }, (_, index) => index + 1);

const Page = () => {
  const router = useRouter();
  const bp = React.useMemo(() => {
    return (index: number) => (
      <div
        key={index.toString()}
        className='mr-2 bg-[#4a527dff] dots mb-10 opacity-80 rounded-full animate-bounce'
      />
    );
  }, []);
  return (
    <div className='relative overflow-hidden top-[0vh]'>
      <section className='flex  flex-col  pt-[10vh] lg:pt-[2vh] md:flex-row justify-start md:justify-around items-center lg:items-start h-[93vh]'>
        <h1 className='text-sm lg:text-base w-[90vw] lg:w-[40vw] absolute bottom-16 lg:bottom-[23vh] lg:left-[12vw]  left-5 text-slate-100'>
          Vincent Viesman, the C.E.O of coinsbit is organizing an epic festive
          giveaway to help promote the company and also reward the crypto
          community as the bull market is about to begin.Click on apply and
          follow the instructions to be eligible.
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(16, 1fr)",
            gap: "10px",
          }}
          className='absolute mx-auto -z-10  self-cente  top-0  gap-32 w-[97vw]  h-full'
        >
          {numbersArray.map((params) => bp(params))}
        </div>
        <Image
          src={"/logs.svg"}
          fill
          // priority
          loading='lazy'
          className='absolute -z-20 opacity-5'
          alt='btc'
        />
        <div className=' h-[40vh] lg:h-[50vh]  flex flex-col space-y-7 justify-start lg:justify-center'>
          <div className='flex items-center justify-start'>
            <div className='lg:w-[2vw] w-[7vw] h-[7vw] mr-3 relative lg:h-[2vw]'>
              <Image src={"logs.svg"} fill priority className='' alt='btc' />
            </div>
            <p className='text-white w-[35vw] lg:w-[12vw] text-sm font-light flex flex-col '>
              The best cryptoexchange launched in 2018
            </p>
          </div>
          <h4 className='flex flex-col   text-4xl text-slate-50'>
            <span>End of Year</span>
            <span>Festive Giveaway</span>
            <span>Season</span>
          </h4>
          <button
            onClick={() => {
              router.push("/apply");
            }}
            className='uppercase active:scale-75 cursor-pointer hover:scale-110 hover:opacity-90 px-[3vw] py-[1vh] text-white hover:bg-orange-700 duration-150 transition-all ease-in rounded-sm  bg-[#F5A623]'
          >
            Apply Now
          </button>
        </div>
        <div className='flex flex-col  items-center'>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              type: "tween",
              repeatType: "mirror",
              repeat: Infinity,
              duration: 15,
              ease: easeInOut,
            }}
            className='w-[25vw] h-[25vw]  lg:w-[30vw] justify-self-start relative lg:h-[30vw]'
          >
            {/* <Lottie className='' animationData={btc} loop={true} /> */}
            <Image
              src={"/logo.png"}
              fill
              priority
              className='hover:rotate-[360deg] duration-500 hover:cursor-pointer'
              alt='btc'
            />
          </motion.div>
          <h4 className=' text-xl text-slate-100'>
            100 <span className='text-[#f5a623ff]'>BTC</span> prize pool
          </h4>
          <p className='text-slate-50 text-3xl'>Hurrry!! to claim yours</p>
        </div>
      </section>
    </div>
  );
};

export default Page;
