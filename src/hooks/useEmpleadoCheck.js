import { useAuth } from "../context/AuthContext";

export const useEmpleadoCheck = () => {
  const { usuario } = useAuth();

  const empleadoEmails = ["faculez1@gmail.com", "faculez2@gmail.com"];
  const adminEmails = ["faculez07@gmail.com", "tripdrusgtore@gmail.com","rodolfo@gmail.com"];

  const isAuthenticated = !!usuario;
  const loading = usuario === null;

  const isEmpleado =
    isAuthenticated &&
    (empleadoEmails.includes(usuario.email) || adminEmails.includes(usuario.email));

  return { isEmpleado, isAuthenticated, loading };
};
