import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full bg-primary500 h-24 flex flex-col justify-between">
        <div className="flex justify-between items-center w-full my-2">
            <h4 className="mx-5 text-primary100 font-medium text-[20px]">Estimate Generator</h4>
            <div className="flex gap-2 mx-5">
                <FaYoutube className="text-[#FF0000]"/>
                <FaFacebookF className="text-[#0000FF]"/>
                <FaTwitter className="text-[#0000FF]"/>
                <FaInstagram className="text-[#FFC0CB]"/>
                <FaLinkedinIn className="text-[#0000FF]"/>
            </div>
        </div>
        <div className="flex justify-center items-center w-full">
            <p className="mx-5 my-2 text-primary100 font-normal text-[11px]">Lorem ipsum dolor sit amet</p>
        </div>
    </div>
  );
}
