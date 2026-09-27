import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QrScanner({ onResult, onClose }: { onResult: (text: string) => void; onClose: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const done = useRef(false);

  useEffect(() => {
    let scanner: { stop: () => Promise<void>; clear: () => void; isScanning?: boolean } | null = null;
    let cancelled = false;
    (async () => {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (cancelled) return;
        const s = new Html5Qrcode("qr-reader");
        scanner = s;
        await s.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 230, height: 230 } },
          (text) => {
            if (done.current) return;
            done.current = true;
            onResult(text);
          },
          () => {},
        );
      } catch {
        setError("We couldn't open your camera. Allow camera access, or type the code instead.");
      }
    })();
    return () => {
      cancelled = true;
      if (scanner?.isScanning) scanner.stop().then(() => scanner?.clear()).catch(() => {});
    };
  }, [onResult]);

  return (
    <div className="mx-auto mt-6 max-w-md rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-honey)]">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold">Point your camera at the jar's QR tag</p>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close scanner">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div id="qr-reader" className="overflow-hidden rounded-2xl bg-muted" />
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </div>
  );
}
