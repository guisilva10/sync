import Link from "next/link";
import { CompassIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2 font-bold">
              <div className="from-primary to-primary/70 flex size-8 items-center justify-center rounded-lg bg-gradient-to-r text-white">
                <CompassIcon className="size-4 text-white" />
              </div>
              <span>Sync</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Crie seu link in bio personalizado e destaque-se nas redes
              sociais.
            </p>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} SYNC. Todos os direitos reservados.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
