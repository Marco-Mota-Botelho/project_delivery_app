export default function CardOrder() {
  return (
    <div>
      <section>
        <h2>
          Pedidos
          <h1 data-testid="customer_orders__element-order-id-<id>"> Id</h1>
        </h2>
      </section>
      <section>
        <h1 data-testid="customer_orders__element-delivery-status-<id>"> Status </h1>
      </section>
      <section>
        <h1 data-testid="customer_orders__element-order-date-<id>">Date</h1>
      </section>
      <section>
        <h1 data-testid="customer_orders__element-card-price-<id>">Price</h1>
      </section>
    </div>
  );
}
