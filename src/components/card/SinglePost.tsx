import React from "react";
import Image from "next/image";

const SinglePost = () => {
  return (
    <div className="grid grid-cols-10 gap-5 bg-white rounded-md p-5">
      <div className="col-span-1">
        <Image
          src="/profile.png"
          alt="Profile"
          width={55}
          height={55}
          priority
        />
      </div>
      {/* Content */}
      <div className="flex flex-col space-y-4 col-span-9">
        <p className="font-semibold text-base">
          Lutfi Ikbal Majid <span className="text-sm font-normal">@Lutzfy.21</span>
        </p>
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

export default SinglePost;
