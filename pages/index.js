/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import useTrackLocation from "@/hooks/user-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "@/contex/store-context";

export async function getStaticProps(){
  // const CoffeeStores = await fetch('/../data/coffee-stores.json');
  const CoffeeStores = await fetchCoffeeStores();
  return {
    props: {
      CoffeeStores,
    }
  }
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();

  // const [ coffeeStores, setCoffeeStores ] = useState([]);
  const [ coffeeStoreError, setCoffeeStoreError ] = useState(null);
  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;

  useEffect(()=>{
    async function setCoffeeStoresByLocation() {
      if(latLong){
        try{
          const response = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`);
          const coffeeStores = await response.json();
          // console.log("Fetched coffee stores", coffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores }
          });
          setCoffeeStoreError("");
        }
        catch(error){
          // Set the Error
          console.log(error);
          setCoffeeStoreError(error.message);
        }
      }
    }
    setCoffeeStoresByLocation();
  },[latLong])

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };
  return (
    <>
      <Head>
        <title>Brew Finder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "Find nearby brew"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoreError && <p>Something went wrong: {coffeeStoreError}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" alt="" width={700} height={400} />
        </div>
        {coffeeStores.length > 0 ? (
        <div className={styles.sectionWrapper}>
          <>
            <h2 className={styles.heading2}>Stores near you</h2>
            <div className={styles.cardLayout}>
            {
              coffeeStores.map((coffee)=>{
                return <Card 
                  href={`coffee-store/${coffee.id}`}
                  title={coffee.name}
                  imgURL={coffee.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                  className={styles.card}
                  key={coffee.id}
                />
              })
            }
            </div>
          </>
        </div>
        ):
        props.CoffeeStores.length > 0 && (
        <div className={styles.sectionWrapper}>
          <>
            <h2 className={styles.heading2}>Static Stores</h2>
            <div className={styles.cardLayout}>
            {
              props.CoffeeStores.map((coffee)=>{
                return <Card 
                  href={`coffee-store/${coffee.id}`}
                  title={coffee.name}
                  imgURL={coffee.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                  className={styles.card}
                  key={coffee.id}
                />
              })
            }
            </div>
          </>
        </div>
        )}
      </main>
    </>
  );
}
