import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CoffeeStoreData from "../../data/coffee-stores.json";

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
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }, { params: { id: "300" } }],
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  // console.log(router);
  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href="/">Back to Home</Link>
      <Link href="/coffee-store/dynamic">Go to Dynamic page</Link>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
    </div>
  );
};

export default CoffeeStore;