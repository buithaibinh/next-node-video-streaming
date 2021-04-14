import Head from 'next/head';
import styles from './index.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
