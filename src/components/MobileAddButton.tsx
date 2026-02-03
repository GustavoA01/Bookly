import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export const MobileAddButton = ({ onClick }: { onClick?: () => void }) => (
  <Button
    onClick={onClick}
    className="sm:hidden fixed z-10 right-5 bottom-20 rounded-full w-12 h-12"
  >
    <Plus data-testid="plus-icon" />
  </Button>
);
