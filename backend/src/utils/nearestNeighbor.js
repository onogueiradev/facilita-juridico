function nearestNeighbor(customers) {
  const customersCopy = [...customers];
  const visitedCustomers = [];
  visitedCustomers.push({ id: 0, coordenada_x: 0, coordenada_y: 0 });

  while (customersCopy.length > 0) {
    let nearestCustomerIndex = 0;
    let nearestCustomerDistance = Number.MAX_SAFE_INTEGER;
    visitedCustomers.forEach((visitedCustomer) => {
      customersCopy.forEach((customer, customerIndex) => {
        const distance = Math.sqrt(
          Math.pow(visitedCustomer.coordenada_x - customer.coordenada_x, 2) +
            Math.pow(visitedCustomer.coordenada_y - customer.coordenada_y, 2)
        );

        if (distance < nearestCustomerDistance) {
          nearestCustomerIndex = customerIndex;
          nearestCustomerDistance = distance;
        }
      });
    });

    visitedCustomers.push(customersCopy[nearestCustomerIndex]);
    customersCopy.splice(nearestCustomerIndex, 1);
  }

  return visitedCustomers
    .map((customer) => ({
      id: customer.id,
      name: customer.nome,
    }))
    .filter((customer) => customer.id !== 0);
}

module.exports = nearestNeighbor;
