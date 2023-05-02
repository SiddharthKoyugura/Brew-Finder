import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CoffeeStoreData from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from '../../styles/coffee-store.module.css';
import Image from "next/image";
import cls from 'classnames';

export async function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: CoffeeStoreData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const paths = CoffeeStoreData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      }
    }
  })
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  // console.log(router);


  if(router.isFallback){
    return <div>Loading....</div>
  }
  const { address, name, neighbourhood, imgUrl } = props.coffeeStore;
  function handleUpvoteButton(){
    console.log("clicked");
  }
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={300}
            height={360}
            className={styles.storeImg} 
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/places.svg' height={24} width={24} alt=""/>
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/nearMe.svg' height={24} width={24} alt=""/>
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/star.svg' height={24} width={24} alt=""/>
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up Vote</button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;