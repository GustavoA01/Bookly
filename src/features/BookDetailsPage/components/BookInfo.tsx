import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Calendar, CheckCircle, Info, Plus } from "lucide-react";

export const BookInfo = () => (
  <div className="col-span-1">
    <section className="space-y-4 max-sm:mt-4">
      <div className="flex items-center gap-2">
        <Info className="text-primary" />
        <h1 className="font-montserrat text-xl font-bold">Informaçõs</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground">
            LINHA DO TEMPO
          </CardTitle>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground">
            PRESENTE EM
            {/* Este livro não está presente em nenhuma lista */}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-x-2 space-y-2">
          <Button variant="secondary">Favoritos</Button>

          <Button>
            <Plus /> Add
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>DETALHES</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div>
            <p className="text-muted-foreground">GENÊRO</p>
            <p className="font-bold">Fantasia</p>
          </div>
          <div>
            <p className="text-muted-foreground">PÁGINAS</p>
            <p className="font-bold">1000</p>
          </div>
        </CardContent>
      </Card>
    </section>
  </div>
);
