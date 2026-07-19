import { useEffect } from "react";

interface Props {
  url: string;
  width:string
}

export default function InstagramEmbed({ url,width }: Props) {
  useEffect(() => {
    const loadInstagram = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        (window as any).instgrm?.Embeds.process();
      };

      document.body.appendChild(script);
    };

    loadInstagram();
  }, [url]);

  return (
    <blockquote
      className="instagram-media w-2xl "
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        height:500,
        width,
        maxWidth: "540px",
        margin: "0 auto",
      }}
    />
  );
}