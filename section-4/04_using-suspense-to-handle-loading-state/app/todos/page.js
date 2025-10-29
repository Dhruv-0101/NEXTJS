import SlowComponent2s from "@/components/SlowComponent2s";
import SlowComponent3s from "@/components/SlowComponent3s";
import TodoItems from "@/components/TodoItems";
import { Suspense } from "react";
//suspense ke andar jo component async await use karta hai yani ki server component hai use dalo.
//yaha pe to breakdown kar sakte hai lekin na kana ho to breakdown ? == to fir hame parallelly api call karna hoga == niche wala bhi waise parallely api call hi hai.
const Todos = async () => {
  return (
    <>
      <h1>Todos</h1>
      <Suspense
        fallback={
          <div className="todos-container">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="shimmer">
                <div className="shimmer-checkbox"></div>
                <div className="shimmer-text"></div>
              </li>
            ))}
          </div>
        }
      >
        <TodoItems />
      </Suspense>
      <Suspense fallback={<div>Loading data 1</div>}>
        <SlowComponent2s />
      </Suspense>
      <Suspense fallback={<div>Loading data 2</div>}>
        <SlowComponent3s />
      </Suspense>
    </>
  );
};

export default Todos;

/*
Time 0s → sab start ho gaye
--------------------------------
TodoItems: waiting (5s)
Slow2s: waiting (2s)
Slow3s: waiting (3s)

Time 2s →
--------------------------------
Slow2s: ✅ done → show data
Slow3s: waiting
TodoItems: waiting

Time 3s →
--------------------------------
Slow3s: ✅ done → show data
TodoItems: waiting

Time 5s →
--------------------------------
TodoItems: ✅ done → show todos

Sabka fetch ek hi time (0s) pe start hota hai ✅
Har component apna fallback dikhata hai jab tak uska fetch complete nahi hota
Jab kisi ka data ready ho jaata hai → wo apna real content render karta hai
Dusre components apne fallbacks me bane rehte hain jab tak unka data ready nahi hota

*/