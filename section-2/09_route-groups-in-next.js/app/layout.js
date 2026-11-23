export const metadata = {
  title: {
    template: "%s | Technical Agency",
    default: "Technical Agency",
  },
  description: "Hello World!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
// Next.js **Layout se nahi, balki browser ke URL se decide karta hai** ki kahan jaana hai. Jab user koi URL daalta hai (jaise `/about`), toh Next.js pehle dhundhta hai ki uska `page.js` kis folder me hai — usse wo `(marketing)/about` me milta hai, isliye wo sirf `(marketing)` ka layout uthakar page ko `{children}` me fit kar deta hai. Waise hi home page (`/`) ke liye wo seedha `(application)/page.js` ko run karta hai kyunki pooray project me wahi ek root page hai. 

// Lekin agar aapne galti se dono folders me same page bana diya — jaise `(application)/page.js` aur `(marketing)/page.js` dono — toh Next.js confuse ho jaayega ki `/` par kiska layout aur page dikhana hai, aur turant **Route Conflict Error** de dega.





//if needed then only read below.
/*
Ran list project directory structure
Analyzed layout.js:L1-17
Analyzed layout.js:L1-9
Analyzed layout.js:L1-9
Analyzed page.js:L1-21

Aapka confusion bilkul valid aur natural hai! Isko samajhne ke liye bas Next.js ka **"Routing Mental Model"** samajhna zaroori hai.

Asal me Next.js ka decision-making flow **Layout se Page ki taraf nahi**, balki **URL se Page aur phir Layouts ki taraf** chalta hai.

---

### 1. Route Groups `(...)` ka Golden Rule
Jab bhi aap folder ke naam ke aage brackets lagate ho jaise `(application)` ya `(marketing)`, Next.js ko ek instruction milti hai:
> *"Is folder ke naam ko URL path me count **MAT** karo — yeh sirf code organization aur layouts ke liye hai."*

Iska matlab aapke project ke URLs Next.js ke liye aise map hote hain:

| File Path | Actual URL | Kiske andar hai? |
| :--- | :--- | :--- |
| `app/(application)/page.js` | **`/`** (Home) | `(application)` group |
| `app/(application)/blogs/page.js` | **`/blogs`** | `(application)` group |
| `app/(marketing)/about/page.js` | **`/about`** | `(marketing)` group |
| `app/(marketing)/services/page.js` | **`/services`** | `(marketing)` group |

---

### 2. Next.js ko kaise pata chalta hai ki kahan jaana hai?

Next.js decision **Browser ke URL** se leta hai:

#### **Case 1: User ne open kiya `http://localhost:3000/` (Root)**
1. **URL Match:** Next.js dekhta hai ki `/` (root route) ke liye kaunsa `page.js` maujood hai.
2. Next.js ko milta hai: `app/(application)/page.js`.
3. **Layout Assembly:** Ab Next.js dekhta hai ki yeh `page.js` kis-kis layout ke andar baitha hai:
   - Pehle Root Layout: `app/layout.js`
   - Uske andar Application Layout: `app/(application)/layout.js` (Orange Header / Green Footer)
   - Uske andar page: `(application)/page.js` as `{children}`!
4. Is case me Next.js `(marketing)` me **kabhi jaayega hi nahi**, kyunki wahan koi root `page.js` hai hi nahi.

---

#### **Case 2: User ne open kiya `http://localhost:3000/about`**
1. **URL Match:** Next.js dekhta hai ki `/about` route kahan hai.
2. Usse milta hai: `app/(marketing)/about/page.js`.
3. **Layout Assembly:** Next.js dekhta hai ki yeh file kis group me hai:
   - Root Layout: `app/layout.js`
   - Marketing Layout: `app/(marketing)/layout.js` (Teal Header / Brown Footer)
   - Page: `(marketing)/about/page.js` as `{children}`!
4. Yahan `(application)` ka layout bilkul touch nahi hoga.

---

### 3. Flow ka Mental Model (Bottom-Up Nesting)

```
User URL hit karta hai
       │
       ▼
Next.js pehle match karta hai: "Is URL ka page.js kahan hai?"
       │
       ▼
Example: /about mil gaya -> app/(marketing)/about/page.js
       │
       ▼
Ab Next.js us page se upar ki taraf (Root tak) Layouts dhundhta hai:
       │
       ├─► 1. app/layout.js (Sabse bahar ka <html><body>)
       │      │
       │      └─► 2. app/(marketing)/layout.js (Header/Footer for marketing)
       │             │
       │             └─► 3. app/(marketing)/about/page.js (Aapka actual content)
```

`layout.js` decide nahi karta ki kaunsa page render hoga, **Browser ka URL decide karta hai ki kaunsa `page.js` trigger hoga**, aur Next.js us `page.js` ke raste me aane wale respective `layout.js` ko uske upar wrap kar deta hai.

---

### 4. Ek Important Sawal:
> *"Agar main `(marketing)` me bhi ek `page.js` bana doon aur `(application)` me bhi `page.js` rahe, tab kya hoga?"*

Next.js dono ko URL **`/`** pe map karne ki koshish karega aur aapko **Conflict Error** de dega:
> `Error: You cannot have two parallel pages that resolve to the same route: "/" and "/"`

Isliye ek hi URL par do alag-alag route groups ke andar same page nahi ho sakte.x
*/