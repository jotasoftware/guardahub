import { useLocation } from "react-router-dom";
import { useColecao } from "../context/ColecaoContext";

const LABELS = {
  suascolecoes: "Suas Coleções",
  colecoes: "Coleções",
};

const isUUID = (value) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export const useBreadcrumb = () => {
  const { pathname } = useLocation();
  const { colecoes, colecaoCompleta } = useColecao();

  const mapIds = Object.fromEntries(
    (colecoes || []).map((c) => [c.id, c.titulo])
  );

  if (pathname === "/") {
    return [{ name: "Home", path: "/" }];
  }

  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const key = decodeURIComponent(segment);

    const isLast = index === segments.length - 1;

    return {
      name:
        LABELS[key] ??
        (isUUID(key) && colecaoCompleta?.titulo && isLast
          ? colecaoCompleta.titulo
          : mapIds[key]) ??
        key
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),

      path: "/" + segments.slice(0, index + 1).join("/"),
    };
  });
};