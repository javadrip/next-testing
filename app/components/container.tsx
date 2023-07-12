import { clsx } from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
  alt?: boolean;
}

export default function Container(props: Props) {
  return (
    <div
      className={clsx(
        "container mx-auto px-8 xl:px-5",
        props.large ? " max-w-screen-xl" : " max-w-screen-lg",
        !props.alt && "py-5 lg:py-8",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
