import { motion } from "framer-motion";
import { Zap, Shield, Infinity as InfiniteIcon } from "lucide-react";
import { UrlShortener } from "@/components/UrlShortener";
import { FeatureCard } from "@/components/FeatureCard";
import { NavLink } from "@/components/NavLink";
import kortlinkLogo from "@/assets/kortlink-logo-gray.png";

const features = [
  {
    icon: Zap,
    title: "Gratis",
    description: "Det er ganske gratis at bruge Kortlink.dk",
  },
  {
    icon: Shield,
    title: "Vedvarende",
    description: "De korte links vil bestå så længe tjenesten kører",
  },
  {
    icon: InfiniteIcon,
    title: "Grænseløst",
    description: "Der er ingen grænse for antal links",
  },
];

const navLinks = [
  { href: "/", label: "Kortlink.dk" },
  { href: "/tilretning", label: "Tilretning" },
  { href: "/statistik", label: "Statistik" },
];

const Index = () => {
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
        <header className="pt-6 pb-8 relative z-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center sm:justify-end">
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

        {/* Hero */}
        <main className="pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center max-w-xl mx-auto pt-4 pb-8 relative z-10"
            >
              <img
                src={kortlinkLogo}
                alt="Kortlink"
                className="w-40 h-40 mx-auto mb-0 -mt-8 sm:-mt-20"
                style={{ background: "transparent" }}
              />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                Kortlink.dk
              </h1>
              <p className="text-muted-foreground text-lg mb-1">
                Lange links er grimmere end korte links.
              </p>
              <p className="text-muted-foreground mb-1">
                Lange links kan ikke bruges i aviser og magasiner.
              </p>
              <p className="text-muted-foreground">
                Lange links "knækker" over, når du bruger dem i mails.
              </p>
            </motion.div>

            {/* URL Shortener */}
            <UrlShortener />

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <div className="grid sm:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <FeatureCard key={feature.title} {...feature} />
                ))}
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

export default Index;
