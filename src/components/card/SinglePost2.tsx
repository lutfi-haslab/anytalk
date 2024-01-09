import React from "react";
import Image from "next/image";

const SinglePost2 = () => {
  return (
    <div className="flex flex-col bg-white rounded-md p-5">
      <div className="flex">
        <Image
          src="/profile.png"
          alt="Profile"
          width={55}
          height={55}
          priority
        />
        <div className="flex flex-col">
          <p className="font-semibold text-base">Lutfi Ikbal Majid </p>
          <p className="text-sm font-normal">@Lutzfy.21</p>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col space-y-4 col-span-9">
        <p>
          Cinta adalah perasaan yang kuat dan dalam yang dapat kita rasakan
          untuk seseorang atau sesuatu. Cinta dapat muncul dalam berbagai
          bentuk, seperti cinta romantis, cinta keluarga, dan cinta diri. Cinta
          dapat membuat kita merasa bahagia dan aman, tetapi juga dapat
          menyakitkan jika terluka. Ingatlah untuk selalu mencintai diri sendiri
          dan orang lain dengan cara yang baik dan setia. #cinta #perasaan
          #kebahagiaan
        </p>
      </div>
    </div>
  );
};

export default SinglePost2;
