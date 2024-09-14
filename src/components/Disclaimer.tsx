import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Content } from "next/font/google";

export default function Disclaimer({ contentType }: { contentType?: string }) {
  return (
    <div className="">
      {contentType === "article" && (
        <div className="font-bold">*Not Financial Advice⁣⁣⁣</div>
      )}
      <div className="italic text-sm">
        <span className="font-bold">Disclaimer: </span>
        All content on this channel is for education purposes only and does not
        constitute an investment recommendation or individual financial advice.
        For that, you should speak to a regulated, independent professional. The
        value of investments and the income from them can go down as well as up,
        so you may get back less than you invest. The views expressed on this
        channel may no longer be current. The information provided is not a
        personal recommendation for any particular investment. Tax treatment
        depends on individual circumstances and all tax rules may change in the
        future. If you are unsure about the suitability of an investment, you
        should speak to a regulated, independent professional.
      </div>
    </div>
  );
}
