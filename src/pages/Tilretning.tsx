import { motion } from "framer-motion";
import { NavLink } from "@/components/NavLink";
import kortlinkLogo from "@/assets/kortlink-logo.png";

const navLinks = [
  { href: "/", label: "Kortlink.dk" },
  { href: "/tilretning", label: "Tilretning" },
  { href: "/statistik", label: "Statistik" },
];

const Tilretning = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--ambient-pink)/0.4)]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl translate-x-1/4 translate-y-1/4 bg-[hsl(var(--ambient-blue)/0.3)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with navigation */}
        <header className="pt-6 pb-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-end">
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-1"
              >
{navLinks.map((link) => (
<NavLink
  key={link.href}
  to={link.href}
  className="px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground"
  activeClassName="text-foreground"
>
  {link.label}
</NavLink>
))}
              </motion.nav>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <h1 className="text-3xl font-bold tracking-tight mb-6">Tilretning</h1>
              
              <div className="bg-card rounded-2xl border border-border p-6 space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-3">Funktionelt bogmærke</h2>
                  <p className="text-muted-foreground mb-4">
                    Første skridt er at få hurtig adgang til kortlink.dk. Det gør du ved at trække kortlink.dk-linket op i Link-værktøjslinjen.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Her vil du altid med to klik kunne lave et kort link til en Internet-adresse.
                  </p>
                  <p className="text-muted-foreground">
                    Fra nu af kan du, når du står på en side med et langt link, bare klikke på kortlink.dk-knappen i din Link-menu - så får du et kortlink på 1-2 sekunder.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">Integration med eget CMS</h2>
                  <p className="text-muted-foreground mb-4">
                    Kortlink.dk er den smukkeste, hurtigste og skønneste omvej til links, der er korte nok til print og e-mail.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Men det er en omvej.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Det publiceringssystem (CMS), der driver din hjemmeside, kan sandsynligvis optimeres så det giver dig:
                  </p>
                  <ul className="text-muted-foreground list-disc list-inside space-y-1 mb-4">
                    <li>Kortere links</li>
                    <li>Bedre statistik</li>
                    <li>Flere besøgende fra søgemaskinerne</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Det koster en del penge at få tæmmet CMS'et. Til sammenligning koster kortlink.dk håndører og virker i løbet af få sekunder.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">Credits</h2>
                  <p className="text-muted-foreground mb-4">
                    Make a Shorter Link havde premiere sommeren 2001, og var vistnok den første offentligt tilgængelige link-forkorter.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Morten Juul registrerede kortlink.dk august 2002 og havde version 1.0 oppe at køre i slutningen af året. I oktober 2003 kom Steven Snedker med på projektet. Version 3.0 havde premiere julen 2003.
                  </p>
                  <p className="text-muted-foreground">
                    Verdensnyhederne var brugerkonti med muligheden for at bruge sit eget domænenavn og detaljeret, personlig statistik på de korte links. Siden fik vi travlt med andre ting, så i dag kører kortlink.dk videre alene med de grundlæggende funktioner.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
                  <p className="text-muted-foreground mb-4">
                    Kortlink.dk er lavet af Morten Juul og Steven Snedker.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Du kan skrive til os. Men bemærk, at kortlink.dk er et fritidsprojekt, og vi har ikke mulighed for at tilbyde almindelig support.
                  </p>
                  <div className="text-muted-foreground">
                    <p className="font-medium text-foreground">Inka Media</p>
                    <p>Blålersvej 45</p>
                    <p>2990 Nivå</p>
                    <p>CVR: 2150 0046</p>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3">
              <img src={kortlinkLogo} alt="Kortlink" className="w-6 h-6" />
              <p className="text-sm text-muted-foreground">
                Kortlink.dk · Fritidsprojekt af Morten Juul og Steven Snedker
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Tilretning;
