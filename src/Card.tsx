import { CardContainer } from "./styles";

type CardProps = {
  id: string;
  text: string;
};

export default function Card({ id, text }: CardProps) {
  return <CardContainer>{text}</CardContainer>;
}
