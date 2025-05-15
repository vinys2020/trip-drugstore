import React, { useEffect, useState } from "react";
import logo from "../assets/logotrippc.png";

const InstallModal = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const BANNER_DISMISS_KEY = "pwa-banner-dismissed";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  useEffect(() => {
    const dismissedAt = localStorage.getItem(BANNER_DISMISS_KEY);
    const now = Date.now();

    if (dismissedAt && now - parseInt(dismissedAt, 10) < ONE_DAY_MS) return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;

    if (isIosDevice && !isInStandaloneMode) {
      setIsIOS(true);
      setShowBanner(true);
    }

    const handler = (e) => {
      e.preventDefault();
      console.log("beforeinstallprompt event fired");
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log("Resultado:", result.outcome);
    setDeferredPrompt(null);
    setShowBanner(false);
    localStorage.setItem(BANNER_DISMISS_KEY, Date.now().toString());
  };

  const handleClose = () => {
    setShowBanner(false);
    localStorage.setItem(BANNER_DISMISS_KEY, Date.now().toString());
  };

  if (!showBanner) return null;

  return (
    <div style={styles.bannerWrapper}>
      <div style={styles.contentWrapper}>
        <img
          src={logo}
          alt="Logo"
          style={styles.logo}
          width={130}
          height={75}
          decoding="async"
        />

        <div style={styles.textColumn}>
          <span style={styles.title}>
            {isIOS ? (
              <>
                ¡Sumá Trip a tus aplicaciones! Tocá <strong>Compartir</strong> y luego{" "}
                <strong>“Agregar a inicio”</strong>.
              </>
            ) : deferredPrompt ? (
              <>¿Querés instalar la app en tu dispositivo?</>
            ) : (
              <>La instalación no está disponible en este momento.</>
            )}
          </span>
          <div style={styles.buttonRow}>
            {!isIOS && deferredPrompt && (
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={handleInstallClick}
              >
                Instalar
              </button>
            )}
            <button className="btn btn-light btn-sm" onClick={handleClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  bannerWrapper: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#222",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    maxWidth: 360,
    width: "90%",
    fontFamily: "'Arial', sans-serif",
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    flexShrink: 0,
    borderRadius: 8,
    marginRight: 12,
  },
  textColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 1.3,
  },
  buttonRow: {
    display: "flex",
    gap: "8px",
  },
};

export default InstallModal;
