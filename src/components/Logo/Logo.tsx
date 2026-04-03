import React from "react";
import s from "./Logo.module.scss";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"./"} className="w-full">
      <div className={s.logoBlock}>
        <div className={s.flow}>FLOW</div>
        <div className={s.crm}>
          <span style={{ color: "#a9dfd8" }}>C</span>
          <span style={{ color: "#f2c8ed" }}>R</span>
          <span style={{ color: "#f2994a" }}>M</span>
        </div>
      </div>
    </Link>
  );
};
