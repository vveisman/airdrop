import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className='w-full h-[7vh] bg-[#33323eff] px-[4vw] flex items-center border-b-[0.5px] border-slate-500 z-10'>
      <Link href={"/home"} className='w-[100px] absolute h-[50px]'>
        <Image fill src={"/coin.svg"} alt='coin' />
      </Link>
    </div>
  );
};

export default Navbar;
