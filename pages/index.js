import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps(){
  const CoffeeStores = await fetch('../data/coffee-stores.json');
  return {
    props: {
      CoffeeStores,
    }
  }
}

export default function Home({ CoffeeStores }) {
  const handleOnBannerBtnClick = () => {
    console.log("hi banner btn");
  };
  return (
    <>
      <Head>
        <title>Coffee Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="Visit Nearby Shops"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" alt="" width={700} height={400} />
        </div>
        <div className={styles.cardLayout}>
        {
          CoffeeStores.map((coffee)=>{
            return <Card 
              href={`coffee-store/${coffee.id}`}
              title={coffee.name}
              imgURL={coffee.imgUrl}
              className={styles.card}
              key={coffee.id}
            />
          })
        }
        </div>
      </main>
    </>
  );
}
