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
        "container mx-auto px-4",
        props.large ? " max-w-screen-xl" : " max-w-screen-lg",
        !props.alt && "py-8 mt-10",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
