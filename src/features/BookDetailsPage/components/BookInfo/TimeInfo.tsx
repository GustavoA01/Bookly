import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Calendar, CheckCircle } from "lucide-react";

export const TimeInfo = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-muted-foreground">LINHA DO TEMPO</CardTitle>
    </CardHeader>

    <CardContent>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <Calendar className="text-muted-foreground w-5 h-5" />
          <p className="text-muted-foreground text-sm">Início</p>
        </div>

        <p className="font-bold">09/01/2025</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-muted-foreground w-5 h-5" />
          <p className="text-muted-foreground text-sm">Término</p>
        </div>

        <p className="font-bold">--/--/----</p>
      </div>
    </CardContent>

    <CardFooter className="flex flex-col space-y-2">
      <div className="flex justify-between w-full">
        <span className="text-sm text-muted-foreground">Progresso</span>
        <span className="text-primary font-semibold text-sm">45%</span>
      </div>

      <Progress value={45} />
    </CardFooter>
  </Card>
);
