import React from "react";

type IPropFooter = {
   children?: React.ReactNode;
   className?: string;
};

export default function Footer({ children, className }: IPropFooter) {
   return (
      <footer className="px-space-page flex gap-x-8 py-4">
         <div className="flex-[2]">
            <div className="flex gap-x-2">
               <img
                  className="rounded-full w-7 h-7"
                  src="https://t3.ftcdn.net/jpg/05/27/49/44/360_F_527494416_7PWpMBqkWQarxhOgD1vIDzhDxizP1cQd.jpg"
                  alt=""
               />
               <span className="font-bold">Maia Blog</span>
            </div>

            <p>
               Neste exemplo, o contêiner flexível .container se ajustará
               automaticamente à largura do texto dentro do elemento .text, sem
               a necessidade de inline-block. O uso de flex-wrap: wrap; permite
               que o texto quebre para a próxima linha, se necessário.
            </p>
         </div>
         <div className="flex-1">
            <div>
               <h3 className="font-bold mb-2">Links</h3>
               <li>
                  {" "}
                  <a href="#">Link aqui</a>{" "}
               </li>
               <li>
                  {" "}
                  <a href="#">Link aqui</a>{" "}
               </li>
               <li>
                  {" "}
                  <a href="#">Link aqui</a>{" "}
               </li>
               <li>
                  {" "}
                  <a href="#">Link aqui</a>{" "}
               </li>
               <li>
                  {" "}
                  <a href="#">Link aqui</a>{" "}
               </li>
            </div>
         </div>
      </footer>
   );
}
