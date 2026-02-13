import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

type AuthHeaderProps = {
  title: string;
  description: string;
};

export const AuthHeader = ({ title, description }: AuthHeaderProps) => (
  <CardHeader className="text-center">
    <CardTitle className="text-2xl font-bold">{title}</CardTitle>
    <CardDescription className=" font-montserrat">
      {description}
    </CardDescription>
  </CardHeader>
);
