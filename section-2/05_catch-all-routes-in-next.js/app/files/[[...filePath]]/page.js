export default async function File({ params }) {
  const { filePath } = await params;
  return (
    <h1>
      File <i>/{filePath?.join("/")}</i>
    </h1>
  );
}
//files/1/2/3 --- agar aisa chahiye to files folder ka ek page banado --- par agar tum yahi reh gaye files/ to yeh dikkat karega --- kyon ki uske andar hazaro page hai
//[[...filePath]] --- agar aisa rahega to ek root home ban jayega files/ ke liye yeh dikkat nahi karega

// Option 1: app/files/[...filePath]/page.tsx
// app/
//  └── files/
//       └── [...filePath]/
//            └── page.tsx

// [...filePath] ka matlab hai:

// /files/1
// /files/1/2
// /files/1/2/3
// /files/a/b/c/d/e

// sab is ek hi page par jayenge.

// Lekin /files match nahi karega.

// Agar koi sirf:

// /files

// open karega to 404 milega.

// Isliye kisi ne bola:

// "agar aisa chahiye to files folder ka ek page bana do"

// Matlab:

// app/
//  └── files/
//       ├── page.tsx          // /files
//       └── [...filePath]/
//            └── page.tsx     // /files/*

// Yahaan:

// /files → page.tsx
// /files/1/2/3 → [...filePath]


// Option 2: app/files/[[...filePath]]/page.tsx
// app/
//  └── files/
//       └── [[...filePath]]/
//            └── page.tsx

// Double brackets [[...]] ka matlab optional catch-all route.

// Is case mein:

// /files
// /files/1
// /files/1/2
// /files/1/2/3

// sab isi page mein aayenge.

// Yaani alag files/page.tsx banane ki zarurat nahi.

// Difference

// | URL            | `[...filePath]` | `[[...filePath]]` |
// | -------------- | --------------- | ----------------- |
// | `/files`       | ❌ 404           | ✅ Works           |
// | `/files/1`     | ✅               | ✅                 |
// | `/files/1/2`   | ✅               | ✅                 |
// | `/files/1/2/3` | ✅               | ✅                 |
