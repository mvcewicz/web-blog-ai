import { ImageResponse } from "next/og";

export function generateImageMetadata() {
  return [
    {
      contentType: "image/png",
      size: { width: 48, height: 48 },
      id: "small",
    },
    {
      contentType: "image/png",
      size: { width: 72, height: 72 },
      id: "medium",
    },
  ];
}

type IconProps = {
  params: {
    slug: string;
  };
};

export default function Icon({ params }: IconProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fafafa",
        }}
      >
        {params.slug}
      </div>
    ),
  );
}
