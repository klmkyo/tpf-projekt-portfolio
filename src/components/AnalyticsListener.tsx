import Hotjar from "@hotjar/browser";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { analyticsConfig } from "../config/env";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    _uxa?: unknown[];
  }
}

export default function AnalyticsListener() {
  const location = useLocation();
  const initialized = useRef(false);
  const hasSeenInitialRoute = useRef(false);
  const lastTrackedPage = useRef<string | null>(null);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    if (analyticsConfig.gaMeasurementId && !window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", analyticsConfig.gaMeasurementId, { send_page_view: false });
    }

    if (analyticsConfig.hotjarSiteId) {
      Hotjar.init(Number(analyticsConfig.hotjarSiteId), 6);
    }

    initialized.current = true;
  }, []);

  useEffect(() => {
    const page = location.pathname + location.search;

    if (lastTrackedPage.current === page) {
      return;
    }

    lastTrackedPage.current = page;

    if (analyticsConfig.gaMeasurementId && window.gtag) {
      window.gtag("event", "page_view", {
        page_location: window.location.href,
        page_path: page,
        page_title: document.title,
      });
    }

    if (analyticsConfig.hotjarSiteId) {
      Hotjar.stateChange(page);
    }

    if (analyticsConfig.contentsquareTagId) {
      if (hasSeenInitialRoute.current) {
        window._uxa = window._uxa || [];
        window._uxa.push(["trackPageview", page]);
      } else {
        hasSeenInitialRoute.current = true;
      }
    }
  }, [location.pathname, location.search]);

  return null;
}
