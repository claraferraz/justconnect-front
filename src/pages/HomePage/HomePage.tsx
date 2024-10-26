import { Link } from "@chakra-ui/react";

export function HomePage() {
  return (
    <>
      <h1>HomePage</h1>
      <p>Bem-vindo à HomePage! Este é o conteúdo principal.</p>
      <button><Link href="/login" >Entrar</Link></button>
    </>
  );
}
