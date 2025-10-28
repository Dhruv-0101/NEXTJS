export default async function File({ params }) {
  const { filePath } = await params;
  return (
    <h1>
      File <i>/{filePath?.join("/")}</i>
    </h1>
  );
}
//files/1/2/2/3 --- agar aisa chahiye to files folder ka ek page banado --- par agar tum yahi reh gaye files/ to yeh dikkat karega --- kyon ki uske andar hazaro page hai
//[[...filePath]] --- agar aisa rahega to ek root home ban jayega files/ ke liye yeh dikkat nahi karega