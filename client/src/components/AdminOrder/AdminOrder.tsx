import type { FC } from "react";
import type { Order } from "../../types/product";
import s from "./AdminOrder.module.css";
import { shortString } from "../../helpers/shortString";
import { toDate } from "../../helpers/toDate";

const AdminOrder: FC<Order> = ({ id, items, total, createdAt }) => {
  const created = toDate(createdAt);

  return (
    <>
      {items.map((i) => (
        <div className={s.orderCard} key={id}>
          <h2 className={s.id}>Order #{shortString(id)}</h2>
          <h2 className={s.orderName}>{i.name}</h2>
          <img src={i.photoUrl} width="50" />
          <h4 className={s.qty}>Quantity: {i.quantity}</h4>
          <p className={s.specs}>Specs: {i.specs}</p>
          <p className={s.opis}>Opis: {i.opis}</p>

          <div className={s.orderFooter}>
            <h3 className={s.orderTotal}>{total}$</h3>
            <h3 className={s.createdAt}>{created.toLocaleString()}</h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdminOrder;
