import Button from "./Button";
import { FeatureCardProps } from "@/types/types";
import { FaArrowDown, FaFileInvoiceDollar, FaClock } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";

const FeatureCard = ({ icon, heading, paragraph }: FeatureCardProps) => {
  const stringToIcon = (icon: string) => {
    if (icon == "FaFileInvoiceDollar") {
      return <FaFileInvoiceDollar className="text-[36px] text-primaryText" />;
    } else if (icon == "FaClock") {
      return <FaClock className="text-[36px] text-primaryText" />;
    } else if (icon == "IoMdAnalytics") {
      return <IoMdAnalytics className="text-[36px] text-primaryText" />;
    }
  };

  return (
    <div className="flex flex-col gap-2 basis-full h-full bg-primary100 p-2 rounded hover:shadow-md hover:shadow-secondary500 hover:scale-105">
      <div className="text-primary500">{stringToIcon(icon)}</div>
      <h3 className="text-xl font-bold text-primary500 tablet:h-[56px]">
        {heading}
      </h3>
      <p className="text-base font-normal text-primary500 tablet:h-[96px]">
        {paragraph}
      </p>
      <Button className="">
        <div className="flex gap-2">
          <h6 className="text-primary500 text-base font-semibold">
            Learn More
          </h6>
          <FaArrowDown className="text-primary500" />
        </div>
      </Button>
    </div>
  );
};

export default FeatureCard;
