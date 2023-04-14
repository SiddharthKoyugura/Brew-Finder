import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";
import cls from 'classnames';

const Card = (props) => {
  return (
    <Link href={props.href} className={styles.cardLink}>
      <div className={cls('glass', styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{props.title}</h2>
        </div>
        <div className={styles.cardHeaderWrapper}>
          <Image
            className={styles.cardImage}
            src={props.imgURL}
            width={260}
            height={160}
            alt=""
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
