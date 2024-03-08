function nearestNeighbor(customers) {
  const customersCopy = [...customers];
  const visitedCustomers = [{ id: 0, coordenada_x: 0, coordenada_y: 0 }];

  while (customersCopy.length > 0) {
    let nearestCustomerIndex = 0;
    let nearestCustomerDistance = Number.MAX_SAFE_INTEGER;
    const lastVisitedCustomer = visitedCustomers[visitedCustomers.length - 1];

    customersCopy.forEach((customer, customerIndex) => {
      const distance = Math.sqrt(
        Math.pow(lastVisitedCustomer.coordenada_x - customer.coordenada_x, 2) +
          Math.pow(lastVisitedCustomer.coordenada_y - customer.coordenada_y, 2)
      );

      if (distance < nearestCustomerDistance) {
        nearestCustomerIndex = customerIndex;
        nearestCustomerDistance = distance;
      }
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
