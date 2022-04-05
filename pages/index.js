import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [session, loadingSession] = useSession();
  console.log(session);

  if (loadingSession) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Technical Share | FCamara</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session && (
        <>
          <h1>Teste Google Auth com o Next.js</h1>
          <button className={styles.primaryButton} onClick={() => signIn()}>
            Entrar
          </button>
        </>
      )}

      {session && (
        <>
          <h1>Teste Google Auth com o Next.js bem sucedido ✅ </h1>
          <h4>Você entrou no sistema: {session.user.name}</h4>
          <div className={styles.boxCenter}>
            <h4>E-mail: {session.user.email}</h4>
            <br />
            {session.user.image && (
              <span>
                <img src={session.user.image} alt={session.user.name} />
              </span>
            )}
          </div>
          <br />
          <Link href="/homescreen">Perfil</Link>
          <br />
          <button className={styles.primaryButton} onClick={() => signOut()}>
            Sair
          </button>
        </>
      )}
    </div>
  );
}
