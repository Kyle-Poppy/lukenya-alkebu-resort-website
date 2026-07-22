import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const phone = "254731796683";

  const message = encodeURIComponent(`Hello Lukenya Alkebu Resort!

I visited your website and I would like more information about:

• Accommodation
• Conferences
• Team Building
• Retreats
• Family Outings

Kindly assist me.

Thank you.`);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0"
      }`}
    >
      <svg
        width="140"
        height="140"
        className="absolute -top-14 -left-10 pointer-events-none overflow-visible"
      >
        <defs>
          <path
            id="talkPath"
            d="M20,95 A50,50 0 0,1 120,95"
            fill="none"
          />
        </defs>

        <text
          fill="#D97706"
          fontSize="13"
          fontWeight="800"
          letterSpacing="2"
        >
          <textPath
            href="#talkPath"
            startOffset="50%"
            textAnchor="middle"
          >
            CHAT WITH US
          </textPath>
        </text>
      </svg>

      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex h-16 w-16 animate-[float_3s_ease-in-out_infinite] items-center justify-center rounded-full bg-[#25D366] shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-110 hover:rotate-6 hover:bg-[#1EBE5D]"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-9 w-9 fill-white transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.734 5.476 2.02 7.785L0 32l8.43-2.007A15.934 15.934 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.266 13.266 0 01-6.76-1.843l-.484-.287-5.003 1.192 1.215-4.874-.316-.5A13.258 13.258 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.273-9.937c-.398-.199-2.355-1.162-2.72-1.294-.364-.133-.63-.199-.895.199-.265.398-1.027 1.294-1.26 1.56-.232.265-.464.298-.862.1-.398-.2-1.68-.619-3.2-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.175-.811.179-.178.398-.464.597-.696.2-.232.265-.398.398-.664.133-.265.066-.497-.033-.696-.1-.199-.895-2.157-1.227-2.953-.322-.775-.65-.669-.895-.682-.232-.013-.497-.016-.762-.016s-.696.1-1.062.497c-.365.398-1.393 1.36-1.393 3.316s1.426 3.846 1.625 4.111c.199.265 2.806 4.283 6.796 6.007.95.41 1.692.655 2.27.838.953.304 1.82.261 2.506.158.764-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.265-.762-.464z" />
        </svg>
      </a>
    </div>
  );
}