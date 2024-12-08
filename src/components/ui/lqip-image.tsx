type LqipType = {
  lqip: string;
  width: number;
  height: number;
  src: string;
};

type Props = {
  image: LqipType;
  className?: string;
};

export default function LqipImage({ image, className }: Props) {
  return (
    <img
      src={image.src}
      width={image.width}
      height={image.height}
      style={{
        backgroundImage: `url("${image.lqip}")`,
        backgroundSize: "cover",
      }}
      className={className}
    />
  );
}
