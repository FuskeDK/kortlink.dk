import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Copy, Check, ExternalLink, ArrowRight, Trash2, History, Scissors, X, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LinkItem {
  id: string;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
}

const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);

  // Load links from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kortlink-history");
    if (saved) {
      setLinks(JSON.parse(saved));
    }
  }, []);

  // Save links to localStorage
  useEffect(() => {
    localStorage.setItem("kortlink-history", JSON.stringify(links));
  }, [links]);

const handleShorten = async () => {
  if (!url || !isValidUrl(url)) {
    alert("Indtast venligst en gyldig URL!");
    return;
  }

  setIsLoading(true);
  await new Promise(resolve => setTimeout(resolve, 600));

  const shortCode = Math.random().toString(36).substring(2, 8);
  const newLink: LinkItem = {
    id: Date.now().toString(),
    shortCode,
    originalUrl: url,
    createdAt: new Date().toLocaleDateString("da-DK"),
  };

  setLinks(prev => [newLink, ...prev]);
  setUrl("");
  setIsLoading(false);
};

  const handleCopy = async (shortCode: string) => {
    await navigator.clipboard.writeText(`https://kortlinkdk.vercel.app/${shortCode}`);
    setCopied(shortCode);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const handleDeleteAll = () => {
    setLinks([]);
  };

const handleShowQr = (shortCode: string) => {
  setSelectedQrCode(shortCode); 
  setQrDialogOpen(true); 
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleShorten();
    }
  };

const getQrCodeUrl = (shortCode: string) => {
  const url = `https://kortlinkdk.vercel.app/${shortCode}`; // Brug det specifikke kortlink
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
};

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <h2 className="text-xl font-semibold text-center mb-2">
          Her tryller vi lange links korte.
        </h2>
        <p className="text-muted-foreground text-center text-sm mb-6">
          Indsæt dit lange link herunder og tryk på knappen, så laves det automatisk til et kort:
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
<div className="relative flex-1">
  <button
    type="button"
    onClick={async () => {
      try {
        const text = await navigator.clipboard.readText();
        setUrl(text);
      } catch (err) {
        console.error("Kan ikke læse fra clipboard:", err);
        alert("Kunne ikke indsætte fra clipboard.");
      }
    }}
    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-black transition-colors"
    title="Indsæt fra clipboard"
  >
    <Link2 className="w-4 h-4" />
  </button>

  <Input
    type="url"
    placeholder="Indsæt dit lange link her..."
    value={url}
    onChange={(e) => setUrl(e.target.value)}
    onKeyPress={handleKeyPress}
    className="pl-10 h-11 bg-secondary/50 border-border rounded-lg"
  />
</div>


<Button
  onClick={handleShorten}
  disabled={!url || !isValidUrl(url) || isLoading}
  className="h-11 px-6 rounded-lg font-medium"
>
  {isLoading ? (
    <motion.div
      className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  ) : (
    <>
      Forkort Linket
      <Scissors className="w-4 h-4 ml-2" />
    </>
  )}
</Button>
        </div>
      </motion.div>

      {/* Link history */}
      <AnimatePresence>
        {links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium">Dine links</h3>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {links.length}
                </span>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-3"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Slet alle
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border border-border rounded-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Dette vil slette alle dine gemte links. Denne handling kan ikke fortrydes.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuller</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Slet alle
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
{links.map((link) => (
  <motion.div
    key={link.id}
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95, x: -20 }}
    transition={{ duration: 0.2 }}
    className="bg-secondary/50 rounded-xl p-4 group"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1 space-y-2">
        <div>
          <p className="text-xs text-muted-foreground tracking-wide mb-0.5">Kort Link</p>
          <a
            href={`https://kortlinkdk.vercel.app/${link.shortCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sm truncate text-muted-foreground block cursor-pointer"
            title={`Åbn https://kortlinkdk.vercel.app/${link.shortCode}`}
          >
            https://kortlinkdk.vercel.app/{link.shortCode}
          </a>
        </div>
        <div>
          <p className="text-xs text-muted-foreground tracking-wide mb-0.5">Original</p>
          <a
            href={link.originalUrl.startsWith("http") ? link.originalUrl : `https://${link.originalUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground truncate block cursor-pointer"
            title={`Åbn ${link.originalUrl}`}
          >
            {link.originalUrl}
          </a>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-1">
        <span className="text-xs text-muted-foreground hidden sm:block mr-2">{link.createdAt}</span>
        <Button
          onClick={() => handleCopy(link.shortCode)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg"
          title="Kopier"
        >
          {copied === link.shortCode ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg"
          asChild
          title="Åbn"
        >
          <a href={`https://kortlinkdk.vercel.app/${link.shortCode}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
        <Button
          onClick={() => handleShowQr(link.shortCode)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg"
          title="QR-kode"
        >
          <QrCode className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => handleDelete(link.id)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          title="Slet"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </motion.div>
))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code Dialog */}
<Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
  <DialogContent className="sm:max-w-md bg-card border border-border rounded-xl">
    <DialogHeader>
      <DialogTitle>QR-kode</DialogTitle>
    </DialogHeader>
    <div className="flex flex-col items-center gap-4 py-4">
      {selectedQrCode && (
        <>
          {/* Generer den unikke QR-kode baseret på shortCode */}
          <img 
            src={getQrCodeUrl(selectedQrCode)} 
            alt="QR Code" 
            className="w-48 h-48 rounded-lg"
          />
          <p className="text-sm text-muted-foreground">
            https://kortlinkdk.vercel.app/{selectedQrCode}
          </p>
        </>
      )}
    </div>
  </DialogContent>
</Dialog>
    </div>
  );
};
