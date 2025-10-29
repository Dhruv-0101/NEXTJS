"use client";

export default function Comments() {
  // if (typeof window === "undefined") {
  //   return <div>500 Comments Client.</div>;
  // }
  // return <div>500 Comments {Math.random()}</div>;
  return <div>500 Comments {Date.now()}</div>;
}

/*
🧩 Step 1: Next.js kya karta hai?

Next.js by default server par render karta hai page ka HTML (SSR).
Phir client (browser) me React firse us HTML ko “hydrate” karta hai — matlab React ke JavaScript components us existing HTML ko attach karte hain bina page reload kiye.

Goal:
Server ne jo HTML bheja tha 👇
Client ke render ke time par wahi HTML aur data match hona chahiye ✅



⚠️ Step 2: Tumhare code me kya ho raha hai?
"use client";

export default function Comments() {
  return <div>500 Comments {Date.now()}</div>;
}
Yahan par tum Date.now() use kar rahe ho —
Matlab har render par naya time (milliseconds) aata hai ⏱️




🔍 Step 3: SSR vs Client render

Server-side render (pehli baar Next.js ke server par):

<div>500 Comments 1730192345223</div>

Client-side render (jab React hydrate karega browser me):

<div>500 Comments 1730192345298</div>

Dekha? Dono numbers alag hain ❌
Server ne ek timestamp diya, browser ne dusra (kyunki tab alag time tha).
React ko laga — “Arre! HTML to match nahi kar raha!”
Aur wahi se aata hai:

⚠️ Hydration error: Text content does not match between server and client.




🧠 Step 4: Kya karna chahiye?

Jo bhi cheez server aur client dono par same nahi ho sakti (like Math.random(), Date.now(), window etc.)
wo sirf client-side render ke baad hi dikhani chahiye.




✅ Correct ways
Option 1: Conditional render after mount
"use client";
import { useEffect, useState } from "react";

export default function Comments() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(Date.now()); // runs only in browser after mount
  }, []);

  if (time === null) return <div>Loading comments...</div>;

  return <div>500 Comments {time}</div>;
}
👉 Ab hydration error nahi aayega, kyunki server pe render hone ke time me
time === null hota hai (same HTML client ko milta hai),
aur client mount hone ke baad hi updated time lagta hai.



💡 Summary (Hinglish me)

Hydration error tab aata hai jab server aur client ke HTML output match nahi karte.

Date.now(), Math.random(), window, localStorage jaise cheezein server par nahi chalti ya different value deti hain.

Isliye unhe ya to:

useEffect() ke andar render karo,

ya SSR disable kar do (ssr: false).
*/
