import { getSession } from 'next-auth/client';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

export default function Homescreen({ user }) {
  return (
    <div className={styles.container}>
      <h1>Perfil</h1>
      <p>
        Nome completo: <b>{user.name}</b>
      </p>
      <p>
        E-mail: <b>{user.email}</b>
      </p>
      <span>
        <img src={user.image} alt={user.name} />
      </span>
      <Link href="/">Voltar</Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return {};
  }
  return {
    props: {
      user: session.user,
    },
  };
}
