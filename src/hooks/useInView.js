import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Hook para detectar si un elemento está en la vista (solo la primera vez).
 * @param {IntersectionObserverInit} options Opciones para IntersectionObserver
 * @returns {[React.RefObject, boolean]} Ref para asignar al elemento y estado si está en vista
 */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Callback para el observer
  const handleIntersection = useCallback(
    (entries, observer) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsInView(true);
        if (ref.current) {
          observer.unobserve(ref.current); // Deja de observar al activarse la primera vez
        }
      }
    },
    [] // No depende de nada externo
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, options, handleIntersection]);

  return [ref, isInView];
};

export default useInView;
