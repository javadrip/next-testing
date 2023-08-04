import clsx from "clsx";

interface Props {
  text: string;
  style?: "large" | "normal" | "small";
}

export default function SectionHeader({ text, style }: Props) {
  return (
    <>
      <h1
        className={clsx(
          style === "large"
            ? "text-2xl sm:text-3xl font-semibold"
            : style === "small"
            ? "mt-8 text-lg sm:text-xl font-medium"
            : "mt-8 text-xl sm:text-2xl font-semibold"
        )}
      >
        {text}
      </h1>
      <hr
        className={clsx(
          "my-2 bg-gray-700",
          style === "small" ? "h-0.5" : "h-1"
        )}
      />
    </>
  );
}
