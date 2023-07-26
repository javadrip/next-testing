import Container from "@/app/components/container";

interface Props {
  copyright: string;
}

export default function Footer(props: Props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-center text-sm">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All rights
        reserved.
      </div>
    </Container>
  );
}
