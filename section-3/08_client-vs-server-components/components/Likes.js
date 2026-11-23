// "use client";
//by default its a server component
//window & localstorage server pe kam nahi karta
//usko karwane ke liye use client mark karo
//async component sirf server pe chalega 

//clinet - server // no error with use client

//server ka code clinet par kabhi send nahi kiya jata
//server ka client code client par send kiya jata hai pura(use clinet vala)

//agar kisi bhi vajah se tune page ko client component kar diya to pura code client pe chala jayega(ex.jab page component me use client kiya to sabhi child component ke code client pe chale gaye.
//but mujhe jaroorat thi page me client ko use karne ki.to ????----to tujhe jaha pe jaroorat hai usse alag component banakar use client mark karke fir import karta.)

import { useState } from "react";

export default function Likes() {
  const [likesCount, setLikesCount] = useState(0);
  // console.log(window);
  // if (typeof window !== "undefined") {
  //   console.log(window);
  // }

  console.log("Like component");
  return (
    <div
      onClick={() => {
        setLikesCount((prev) => prev + 1);
      }}
    >
      {likesCount} Likes
    </div>
  );
}

// Servers components execute only on the server
// Client components execute on the server as well as on the client
//Is line ka simple matlab hai: "Server component ke andar jab hum client component (Likes.js) use karte hain jisme useState / onClick hai, toh agar hum usme "use client" mark kar dein toh koi error nahi aati."