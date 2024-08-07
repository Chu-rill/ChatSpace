import React from "react";
import SideBar from "../../components/sidebar/SideBar";
import MessageContainer from "../../components/messages/MessageContainer";

export default function Home() {
  return (
    <div className=" p-2 flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
      <SideBar />

      <MessageContainer />
    </div>
  );
}
