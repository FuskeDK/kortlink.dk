import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "@/components/NavLink";
import kortlinkLogo from "@/assets/kortlink-logo.png";

const navLinks = [
  { href: "/", label: "Kortlink.dk" },
  { href: "/tilretning", label: "Tilretning" },
  { href: "/statistik", label: "Statistik" },
];

const stats = [
  { value: 1485333, label: "Links forkortet siden 1. oktober 2003" },
  { value: 109, label: "Gennemsnitlig linklængde før forkortelse", suffix: "tegn" },
  { value: 16, label: "Gennemsnitlig linklængde efter forkortelse", suffix: "tegn" },
  { value: 137517498, label: "Overflødige tegn Kortlink.dk har fjernet" },
];

const Statistik = () => {
  const [displayStats, setDisplayStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // længere tid for mere langsom slutning
    const start = performance.now();

    // Ease-out quartic: starter hurtigt og bremser meget til slut
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setDisplayStats(
        stats.map((stat) => Math.floor(stat.value * easedProgress))
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--ambient-pink)/0.4)]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl translate-x-1/4 translate-y-1/4 bg-[hsl(var(--ambient-blue)/0.3)]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
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

        {/* Main */}
        <main className="pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <h1 className="text-3xl font-bold tracking-tight mb-6">
                Statistik
              </h1>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-semibold mb-6">
                  Offentlig statistik for Kortlink.dk
                </h2>

                <div className="space-y-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="
                        rounded-xl
                        border border-border/60
                        bg-secondary/40
                        px-5 py-4
                        transition-colors
                        hover:bg-secondary/60
                      "
                    >
                      <p className="text-2xl font-semibold">
                        {displayStats[i].toLocaleString()}
                        {stat.suffix && (
                          <span className="text-base font-normal text-muted-foreground ml-1">
                            {stat.suffix}
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
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

export default Statistik;
